import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import {
  createDestinationListEntity,
  createDestinationEntity,
} from './converter';

export async function fetchDestinations({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  await apiClient.iterateDestinationLists(async (destinationList) => {
    await jobState.addEntity(createDestinationListEntity(destinationList));

    await apiClient.iterateDestinations(
      destinationList.id,
      async (destination) => {
        await jobState.addEntity(createDestinationEntity(destination));
      },
    );
  });
}

export const destinationSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.DESTINATION_LIST,
    name: 'Fetch Destinations',
    entities: [Entities.DESTINATION_LIST, Entities.DESTINATION],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchDestinations,
  },
];
