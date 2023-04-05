import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { Entities, Relationships, Steps } from '../constants';
import { createNetworkTunnelKey } from '../networkTunnel/converter';
import { createSiteKey } from '../site/converter';
import {
  createNetworkEntity,
  createAccountNetworkRelationship,
  createSiteTunnelRelationship,
  createTunnelNetworkRelationship,
} from './converter';

export async function fetchNetworks({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateNetworks(async (network) => {
    const networkEntity = await jobState.addEntity(
      createNetworkEntity(network),
    );

    await jobState.addRelationship(
      createAccountNetworkRelationship(accountEntity, networkEntity),
    );

    const siteEntity = await jobState.findEntity(createSiteKey(network.siteId));
    const tunnelEntity = await jobState.findEntity(
      createNetworkTunnelKey(network.tunnelId),
    );
    if (siteEntity && tunnelEntity) {
      await jobState.addRelationship(
        createSiteTunnelRelationship(siteEntity, tunnelEntity),
      );
    }
    if (tunnelEntity) {
      await jobState.addRelationship(
        createTunnelNetworkRelationship(tunnelEntity, networkEntity),
      );
    }
  });
}

export const networkSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.NETWORK,
    name: 'Fetch Networks',
    entities: [Entities.NETWORK],
    relationships: [
      Relationships.ACCOUNT_HAS_NETWORK,
      Relationships.NETWORK_TUNNEL_CONNECTS_NETWORK,
      Relationships.SITE_HAS_NETWORK_TUNNEL,
    ],
    dependsOn: [Steps.ACCOUNT, Steps.NETWORK_TUNNEL, Steps.SITE],
    executionHandler: fetchNetworks,
  },
];
