import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createNetworkEntity } from './converter';

export async function fetchNetworkTunnels({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  await apiClient.iterateNetworks(async (network) => {
    await jobState.addEntity(createNetworkEntity(network));
  });
}

export const networkSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.NETWORK,
    name: 'Fetch Networks',
    entities: [Entities.NETWORK],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchNetworkTunnels,
  },
];
