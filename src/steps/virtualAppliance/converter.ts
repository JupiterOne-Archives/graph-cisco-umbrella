import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
  Relationship,
  RelationshipClass,
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
        category: ['application'],
        function: ['remote-access-gateway'],
        public: true, // TODO adam-in-ict is there a better option for these three hardcoded?
        privateIpAddress: appliance.settings.internalIPs,
        publicIpAddress: appliance.settings.externalIP,
        uptime: appliance.settings.uptime,
        health: appliance.health,
        lastSyncOn: parseTimePropertyValue(appliance.settings.lastSyncTime),
        upgradeable: appliance.isUpgradable,
      },
    },
  });
}

export function createSiteVirtualApplianceRelationship(
  site: Entity,
  virtualAppliance: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: site,
    to: virtualAppliance,
  });
}

export function createVirtualApplianceDomainRelationship(
  virtualAppliance: Entity,
  domain: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.USES,
    from: virtualAppliance,
    to: domain,
  });
}
