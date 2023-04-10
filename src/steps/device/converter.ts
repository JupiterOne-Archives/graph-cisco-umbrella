import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { Device } from '../../types';

import { Entities } from '../constants';

export function createDeviceKey(key: string) {
  return `${Entities.DEVICE._type}:${key}`;
}

export function createDeviceEntity(device: Device): Entity {
  return createIntegrationEntity({
    entityData: {
      source: device,
      assign: {
        _key: createDeviceKey(device.deviceKey),
        _type: Entities.DEVICE._type,
        _class: Entities.DEVICE._class,
        name: device.name,
        displayName: device.name,
        deviceId: device.deviceId,
        serial: device.serialNumber,
        createdOn: parseTimePropertyValue(device.createdAt),
        category: 'network',
        make: null,
        model: null,
      },
    },
  });
}

export function createAccountDeviceRelationship(
  account: Entity,
  device: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: account,
    to: device,
  });
}
