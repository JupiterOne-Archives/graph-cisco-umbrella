import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Relationships, Steps } from '../constants';
import {
  createAccountUserRelationship,
  createUserEntity,
  createUserRoleRelationship,
} from './converter';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { createRoleKey } from '../role/converter';

export async function fetchUsers({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateUsers(async (user) => {
    const userEntity = await jobState.addEntity(createUserEntity(user));

    await jobState.addRelationship(
      createAccountUserRelationship(accountEntity, userEntity),
    );

    const roleEntity = await jobState.findEntity(createRoleKey(user.roleId));
    if (roleEntity) {
      await jobState.addRelationship(
        createUserRoleRelationship(userEntity, roleEntity),
      );
    }
  });
}

export const userSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.USER,
    name: 'Fetch Users',
    entities: [Entities.USER],
    relationships: [
      Relationships.ACCOUNT_HAS_USER,
      Relationships.USER_ASSIGNED_ROLE,
    ],
    dependsOn: [Steps.ACCOUNT, Steps.ROLE],
    executionHandler: fetchUsers,
  },
];
