import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createPolicyEntity } from './converter';

export async function fetchPolicies({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  await apiClient.iteratePolicies(async (policy) => {
    await jobState.addEntity(createPolicyEntity(policy));
  });
}

export const policySteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.POLICY,
    name: 'Fetch Policies',
    entities: [Entities.POLICY],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchPolicies,
  },
];
