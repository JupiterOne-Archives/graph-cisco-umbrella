import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { Network } from '../../types';

import { Entities } from '../constants';

export function createNetworkKey(name: string) {
  return `${Entities.NETWORK._type}:${name}`;
}

export function createNetworkEntity(network: Network): Entity {
  return createIntegrationEntity({
    entityData: {
      source: network,
      assign: {
        _key: createNetworkKey(network.name),
        _type: Entities.NETWORK._type,
        _class: Entities.NETWORK._class,
        name: network.name,
        displayName: network.name,
        createdOn: parseTimePropertyValue(network.createdAt),
        ipAddress: network.ipAddress,
        prefixLength: network.prefixLength,
        originId: network.originId,
        status: network.status,
      },
    },
  });
}
