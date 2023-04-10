import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { Site } from '../../types';

import { Entities } from '../constants';

export function createSiteKey(id: number) {
  return `${Entities.SITE._type}:${id}`;
}

export function createSiteEntity(site: Site): Entity {
  return createIntegrationEntity({
    entityData: {
      source: site,
      assign: {
        _key: createSiteKey(site.siteId),
        _type: Entities.SITE._type,
        _class: Entities.SITE._class,
        name: site.name,
        displayName: site.name,
        createdOn: parseTimePropertyValue(site.createdAt),
        lastModifiedOn: parseTimePropertyValue(site.modifiedAt),
        default: site.isDefault,
        originId: site.originId,
      },
    },
  });
}

export function createAccountSiteRelationship(
  account: Entity,
  site: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: account,
    to: site,
  });
}
