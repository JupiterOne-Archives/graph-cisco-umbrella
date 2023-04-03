import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createSiteEntity } from './converter';

export async function fetchSites({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  await apiClient.iterateSites(async (site) => {
    await jobState.addEntity(createSiteEntity(site));
  });
}

export const siteSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.SITE,
    name: 'Fetch Sites',
    entities: [Entities.SITE],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchSites,
  },
];
