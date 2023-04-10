import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createRoleEntity } from './converter';

export async function fetchRoles({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  await apiClient.iterateRoles(async (user) => {
    await jobState.addEntity(createRoleEntity(user));
  });
}

export const roleSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ROLE,
    name: 'Fetch Roles',
    entities: [Entities.ROLE],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchRoles,
  },
];
