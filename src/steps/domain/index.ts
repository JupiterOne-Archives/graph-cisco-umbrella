import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createDomainEntity } from './converter';

export async function fetchDomains({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  await apiClient.iterateDomains(async (domain) => {
    await jobState.addEntity(createDomainEntity(domain));
  });
}

export const domainSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.DOMAIN,
    name: 'Fetch Domains',
    entities: [Entities.DOMAIN],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchDomains,
  },
];
