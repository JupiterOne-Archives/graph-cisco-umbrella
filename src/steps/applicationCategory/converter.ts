import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { ApplicationCategory } from '../../types';

import { Entities } from '../constants';

export function createApplicationCategoryKey(name: string) {
  return `${Entities.APPLICATION_CATEGORY._type}:${name}`;
}

export function createApplicationCategoryEntity(
  category: ApplicationCategory,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: category,
      assign: {
        _key: createApplicationCategoryKey(category.name),
        _type: Entities.APPLICATION_CATEGORY._type,
        _class: Entities.APPLICATION_CATEGORY._class,
        name: category.name,
        displayName: category.name,
      },
    },
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
