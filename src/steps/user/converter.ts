import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { User } from '../../types';

import { Entities } from '../constants';

export function createUserKey(id: number) {
  return `${Entities.USER._type}:${id}`;
}

export function createUserEntity(user: User): Entity {
  return createIntegrationEntity({
    entityData: {
      source: user,
      assign: {
        _key: createUserKey(user.id),
        _type: Entities.USER._type,
        _class: Entities.USER._class,
        id: user.id.toString(),
        name: `${user.firstname} ${user.lastname}`,
        displayName: `${user.firstname} ${user.lastname}`,
        firstName: user.firstname,
        lastName: user.lastname,
        lastLoginOn: parseTimePropertyValue(user.lastLoginTime),
        email: user.email,
        active: user.status == 'Active',
        mfaEnabled: user.twoFactorEnable,
      },
    },
  });
}

export function createUserRoleRelationship(
  user: Entity,
  role: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.ASSIGNED,
    from: user,
    to: role,
  });
}

export function createAccountUserRelationship(
  account: Entity,
  user: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: account,
    to: user,
  });
}
