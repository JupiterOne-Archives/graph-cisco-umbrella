import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { Domain } from '../../types';

import { Entities } from '../constants';

export function createDomainKey(name: string) {
  return `${Entities.DOMAIN._type}:${name}`;
}

export function createDomainEntity(domain: Domain): Entity {
  return createIntegrationEntity({
    entityData: {
      source: domain,
      assign: {
        _key: createDomainKey(domain.domain),
        _type: Entities.DOMAIN._type,
        _class: Entities.DOMAIN._class,
        name: domain.domain,
        displayName: domain.domain,
        domainName: domain.domain,
        id: domain.id.toString(),
        description: domain.description,
        includeAllMobileDevices: domain.includeAllMobileDevices,
        includeAllVAs: domain.includeAllVAs,
        createdOn: parseTimePropertyValue(domain.createdAt),
        modifiedOn: parseTimePropertyValue(domain.modifiedAt),
      },
    },
  });
}
