import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createNetworkTunnelEntity } from './converter';

export async function fetchNetworkTunnels({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  await apiClient.iterateNetworkTunnels(async (tunnel) => {
    await jobState.addEntity(createNetworkTunnelEntity(tunnel));
  });
}

export const networkTunnelSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.NETWORK_TUNNEL,
    name: 'Fetch Network Tunnels',
    entities: [Entities.NETWORK_TUNNEL],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchNetworkTunnels,
  },
];
