import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { Destination, DestinationList } from '../../types';

import { Entities } from '../constants';

export function createDestinationListKey(id: number) {
  return `${Entities.DESTINATION_LIST._type}:${id}`;
}

export function createDestinationKey(id: string) {
  return `${Entities.DESTINATION._type}:${id}`;
}

export function createDestinationListEntity(
  destinationList: DestinationList,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: destinationList,
      assign: {
        _key: createDestinationListKey(destinationList.id),
        _type: Entities.DESTINATION_LIST._type,
        _class: Entities.DESTINATION_LIST._class,
        name: destinationList.name,
        displayName: destinationList.name,
        access: destinationList.access,
        global: destinationList.isGlobal,
        createdOn: parseTimePropertyValue(destinationList.createdAt, 'sec'),
        modifiedOn: parseTimePropertyValue(destinationList.modifiedAt, 'sec'),
        mspDefault: destinationList.isMspDefault,
        markedForDeletion: destinationList.markedForDeletion,
        organizationId: destinationList.organizationId,
        thirdPartyCategoryId: destinationList.thirdpartyCategoryId,
      },
    },
  });
}

export function createDestinationEntity(destination: Destination): Entity {
  return createIntegrationEntity({
    entityData: {
      source: destination,
      assign: {
        _key: createDestinationKey(destination.id),
        _type: Entities.DESTINATION._type,
        _class: Entities.DESTINATION._class,
        name: destination.id,
        displayName: destination.id,
        type: destination.type,
        destination: destination.destination,
        createdOn: parseTimePropertyValue(destination.createdAt),
        comment: destination.comment,
      },
    },
  });
}

export function createAccountDestinationListRelationship(
  account: Entity,
  destination: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: account,
    to: destination,
  });
}

export function createDestinationListDestinationRelationship(
  destination: Entity,
  destinationList: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: destination,
    to: destinationList,
  });
}
