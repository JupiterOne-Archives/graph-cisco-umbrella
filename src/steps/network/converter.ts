import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { InternalNetwork } from '../../types';

import { Entities } from '../constants';

export function createNetworkKey(name: string) {
  return `${Entities.NETWORK._type}:${name}`;
}

export function createNetworkEntity(network: InternalNetwork): Entity {
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
        CIDR: null,
        public: true, // TODO
        internal: true, // TODO
        ipAddress: network.ipAddress,
        prefixLength: network.prefixLength,
        originId: network.originId,
      },
    },
  });
}

export function createAccountNetworkRelationship(
  account: Entity,
  network: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: account,
    to: network,
  });
}

export function createTunnelNetworkRelationship(
  tunnel: Entity,
  network: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.CONNECTS,
    from: tunnel,
    to: network,
  });
}

export function createSiteTunnelRelationship(
  site: Entity,
  tunnel: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: site,
    to: tunnel,
  });
}
