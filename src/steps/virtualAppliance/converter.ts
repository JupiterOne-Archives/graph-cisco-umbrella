import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { VirtualAppliance } from '../../types';

import { Entities } from '../constants';

export function createVirtualApplianceKey(name: string) {
  return `${Entities.VIRTUAL_APPLIANCE._type}:${name}`;
}

export function createVirtualApplianceEntity(
  appliance: VirtualAppliance,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: appliance,
      assign: {
        _key: createVirtualApplianceKey(appliance.name),
        _type: Entities.VIRTUAL_APPLIANCE._type,
        _class: Entities.VIRTUAL_APPLIANCE._class,
        name: appliance.name,
        displayName: appliance.name,
        createdOn: parseTimePropertyValue(appliance.createdAt),
        stateUpdatedOn: parseTimePropertyValue(appliance.stateUpdatedAt),
        originId: appliance.originId,
        type: appliance.type,
        internalIPs: appliance.settings.internalIPs,
        externalIP: appliance.settings.externalIP,
        uptime: appliance.settings.uptime,
        health: appliance.health,
        lastSyncOn: parseTimePropertyValue(appliance.settings.lastSyncTime),
        isUpgradeable: appliance.isUpgradable,
      },
    },
  });
}
