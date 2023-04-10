import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { Entities, Relationships, Steps } from '../constants';
import { createAccountSiteRelationship } from '../site/converter';
import { createPolicyEntity } from './converter';

export async function fetchPolicies({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iteratePolicies(async (policy) => {
    const policyEntity = await jobState.addEntity(createPolicyEntity(policy));

    await jobState.addRelationship(
      createAccountSiteRelationship(accountEntity, policyEntity),
    );
  });
}

export const policySteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.POLICY,
    name: 'Fetch Policies',
    entities: [Entities.POLICY],
    relationships: [Relationships.ACCOUNT_HAS_POLICY],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchPolicies,
  },
];
