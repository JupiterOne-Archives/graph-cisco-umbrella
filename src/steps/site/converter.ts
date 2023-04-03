import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { Site } from '../../types';

import { Entities } from '../constants';

export function createSiteKey(name: string) {
  return `${Entities.SITE._type}:${name}`;
}

export function createSiteEntity(site: Site): Entity {
  return createIntegrationEntity({
    entityData: {
      source: site,
      assign: {
        _key: createSiteKey(site.name),
        _type: Entities.SITE._type,
        _class: Entities.SITE._class,
        name: site.name,
        displayName: site.name,
        createdOn: parseTimePropertyValue(site.createdAt),
        lastModifiedOn: parseTimePropertyValue(site.modifiedAt),
        isDefault: site.isDefault,
        originId: site.originId,
      },
    },
  });
}
