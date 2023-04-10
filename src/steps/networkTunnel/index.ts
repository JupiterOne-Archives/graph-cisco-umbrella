import {
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Site } from '../../types';
import { Entities, Relationships, Steps } from '../constants';
import {
  createNetworkTunnelEntity,
  createSiteTunnelRelationship,
} from './converter';

export async function fetchNetworkTunnels({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const siteLookup: { [key: number]: string } = {};
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  await jobState.iterateEntities({ _type: Entities.SITE._type }, (site) => {
    const siteRawData = getRawData<Site>(site);
    siteLookup[siteRawData.originId] = site._key;
  });

  await apiClient.iterateNetworkTunnels(async (tunnel) => {
    const tunnelEntity = await jobState.addEntity(
      createNetworkTunnelEntity(tunnel),
    );

    const siteEntity = await jobState.findEntity(
      siteLookup[tunnel.siteOriginId],
    );

    if (siteEntity) {
      await jobState.addRelationship(
        createSiteTunnelRelationship(siteEntity, tunnelEntity),
      );
    }
  });
}

export const networkTunnelSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.NETWORK_TUNNEL,
    name: 'Fetch Network Tunnels',
    entities: [Entities.NETWORK_TUNNEL],
    relationships: [Relationships.SITE_HAS_NETWORK_TUNNEL],
    dependsOn: [Steps.SITE],
    executionHandler: fetchNetworkTunnels,
  },
];
