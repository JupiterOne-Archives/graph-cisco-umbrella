import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Relationships, Steps } from '../constants';
import {
  createAccountApplicationRelationship,
  createApplicationCategoryRelationship,
  createApplicationEntity,
} from './converter';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { createApplicationCategoryKey } from '../applicationCategory/converter';

export async function fetchApplications({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateApplications(async (application) => {
    const applicationEntity = await jobState.addEntity(
      createApplicationEntity(application),
    );

    await jobState.addRelationship(
      createAccountApplicationRelationship(accountEntity, applicationEntity),
    );

    const categoryEntity = await jobState.findEntity(
      createApplicationCategoryKey(application.category),
    );
    if (categoryEntity) {
      await jobState.addRelationship(
        createApplicationCategoryRelationship(
          applicationEntity,
          categoryEntity,
        ),
      );
    }
  });
}

export const applicationSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.APPLICATION,
    name: 'Fetch Applications',
    entities: [Entities.APPLICATION],
    relationships: [
      Relationships.ACCOUNT_HAS_APPLICATION,
      Relationships.APPLICATION_HAS_CATEGORY,
    ],
    dependsOn: [Steps.ACCOUNT, Steps.APPLICATION_CATEGORY],
    executionHandler: fetchApplications,
  },
];
