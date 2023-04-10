import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createApplicationCategoryEntity } from './converter';

export async function fetchApplicationCategories({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  await apiClient.iterateApplicationCategories(async (applicationCategory) => {
    await jobState.addEntity(
      createApplicationCategoryEntity(applicationCategory),
    );
  });
}

export const applicationCategorySteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.APPLICATION_CATEGORY,
    name: 'Fetch Application Categories',
    entities: [Entities.APPLICATION_CATEGORY],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchApplicationCategories,
  },
];
