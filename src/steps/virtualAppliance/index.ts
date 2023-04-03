import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createVirtualApplianceEntity } from './converter';

export async function fetchVirtualAppliances({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  await apiClient.iterateVirtualAppliances(async (appliance) => {
    await jobState.addEntity(createVirtualApplianceEntity(appliance));
  });
}

export const virtualApplianceSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.VIRTUAL_APPLIANCE,
    name: 'Fetch Virtual Appliances',
    entities: [Entities.VIRTUAL_APPLIANCE],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchVirtualAppliances,
  },
];
