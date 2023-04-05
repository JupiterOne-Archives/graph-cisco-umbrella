import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { Entities, Relationships, Steps } from '../constants';
import {
  createDestinationListEntity,
  createDestinationEntity,
  createAccountDestinationListRelationship,
  createDestinationListDestinationRelationship,
} from './converter';

export async function fetchDestinations({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateDestinationLists(async (destinationList) => {
    const destinationListEntity = await jobState.addEntity(
      createDestinationListEntity(destinationList),
    );

    await jobState.addRelationship(
      createAccountDestinationListRelationship(
        accountEntity,
        destinationListEntity,
      ),
    );

    await apiClient.iterateDestinations(
      destinationList.id,
      async (destination) => {
        const destinationEntity = await jobState.addEntity(
          createDestinationEntity(destination),
        );
        await jobState.addRelationship(
          createDestinationListDestinationRelationship(
            destinationListEntity,
            destinationEntity,
          ),
        );
      },
    );
  });
}

export const destinationSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.DESTINATION_LIST,
    name: 'Fetch Destinations',
    entities: [Entities.DESTINATION_LIST, Entities.DESTINATION],
    relationships: [
      Relationships.ACCOUNT_HAS_DESTINATION_LIST,
      Relationships.DESTINATION_LIST_HAS_DESTINATION,
    ],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchDestinations,
  },
];
