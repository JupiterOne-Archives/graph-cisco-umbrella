import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { Application } from '../../types';

import { Entities } from '../constants';

export function createApplicationKey(id: string) {
  return `${Entities.APPLICATION._type}:${id}`;
}

export function createApplicationEntity(application: Application): Entity {
  return createIntegrationEntity({
    entityData: {
      source: application,
      assign: {
        _key: createApplicationKey(application.id),
        _type: Entities.APPLICATION._type,
        _class: Entities.APPLICATION._class,
        name: application.name,
        displayName: application.name,
        firstDetectedOn: parseTimePropertyValue(application.firstDetected),
        lastDetectedOn: parseTimePropertyValue(application.lastDetected),
        weightedRisk: application.weightedRisk,
        label: application.label,
      },
    },
  });
}

export function createApplicationCategoryRelationship(
  application: Entity,
  category: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: application,
    to: category,
  });
}

export function createAccountApplicationRelationship(
  account: Entity,
  application: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: account,
    to: application,
  });
}
