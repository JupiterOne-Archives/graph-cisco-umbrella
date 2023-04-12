import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Relationships, Steps } from '../constants';
import {
  createAccountDeviceRelationship,
  createDeviceEntity,
} from './converter';
import { ACCOUNT_ENTITY_KEY } from '../account';

export async function fetchDevices({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateDevices(async (device) => {
    const deviceEntity = await jobState.addEntity(createDeviceEntity(device));

    await jobState.addRelationship(
      createAccountDeviceRelationship(accountEntity, deviceEntity),
    );
  });
}

export const deviceSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.DEVICE,
    name: 'Fetch Devices',
    entities: [Entities.DEVICE],
    relationships: [Relationships.ACCOUNT_HAS_DEVICE],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchDevices,
  },
];
