import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Relationships, Steps } from '../constants';
import {
  createAccountDomainRelationship,
  createDomainEntity,
} from './converter';
import { ACCOUNT_ENTITY_KEY } from '../account';

export async function fetchDomains({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateDomains(async (domain) => {
    const domainEntity = await jobState.addEntity(createDomainEntity(domain));

    await jobState.addRelationship(
      createAccountDomainRelationship(accountEntity, domainEntity),
    );
  });
}

export const domainSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.DOMAIN,
    name: 'Fetch Domains',
    entities: [Entities.DOMAIN],
    relationships: [Relationships.ACCOUNT_HAS_DOMAIN],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchDomains,
  },
];
