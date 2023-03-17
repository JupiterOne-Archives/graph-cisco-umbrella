import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { Steps } from '../constants';

export const ACCOUNT_ENTITY_KEY = 'entity:account';

export async function fetchAccount({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {}

export const accountSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ACCOUNT,
    name: 'Fetch Account',
    entities: [],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchAccount,
  },
];
