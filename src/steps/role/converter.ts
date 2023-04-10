import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { Role } from '../../types';

import { Entities } from '../constants';

export function createRoleKey(id: number) {
  return `${Entities.ROLE._type}:${id}`;
}

export function createRoleEntity(role: Role): Entity {
  return createIntegrationEntity({
    entityData: {
      source: role,
      assign: {
        _key: createRoleKey(role.roleId),
        _type: Entities.ROLE._type,
        _class: Entities.ROLE._class,
        name: role.label,
        displayName: role.label,
      },
    },
  });
}
