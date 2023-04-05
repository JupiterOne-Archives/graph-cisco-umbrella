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
  });
}

export const networkSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.NETWORK,
    name: 'Fetch Networks',
    entities: [Entities.NETWORK],
    relationships: [Relationships.ACCOUNT_HAS_NETWORK],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchNetworks,
  },
];
