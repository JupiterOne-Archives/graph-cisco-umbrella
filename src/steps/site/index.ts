import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { Entities, Relationships, Steps } from '../constants';
import { createSiteEntity, createAccountSiteRelationship } from './converter';

export async function fetchSites({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateSites(async (site) => {
    const siteEntity = await jobState.addEntity(createSiteEntity(site));

    await jobState.addRelationship(
      createAccountSiteRelationship(accountEntity, siteEntity),
    );
  });
}

export const siteSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.SITE,
    name: 'Fetch Sites',
    entities: [Entities.SITE],
    relationships: [Relationships.ACCOUNT_HAS_SITE],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchSites,
  },
];
