import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
  APPLICATION: 'fetch-applications',
  APPLICATION_CATEGORY: 'fetch-application-categories',
  DESTINATION: 'fetch-destinations',
  DEVICE: 'fetch-devices',
  DOMAIN: 'fetch-domains',
  NETWORK: 'fetch-networks',
  NETWORK_TUNNEL: 'fetch-network-tunnels',
  POLICY: 'fetch-policies',
  ROLE: 'fetch-roles',
  SITE: 'fetch-sites',
  USER: 'fetch-users',
  VIRTUAL_APPLIANCE: 'fetch-virtual-appliances',
};

export const Entities: Record<
  | 'ACCOUNT'
  | 'APPLICATION'
  | 'APPLICATION_CATEGORY'
  | 'DESTINATION'
  | 'DESTINATION_LIST'
  | 'DEVICE'
  | 'DOMAIN'
  | 'NETWORK'
  | 'NETWORK_TUNNEL'
  | 'POLICY'
  | 'ROLE'
  | 'SITE'
  | 'USER'
  | 'VIRTUAL_APPLIANCE',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'cisco_umbrella_account',
    _class: ['Account'],
  },
  APPLICATION: {
    resourceName: 'Application',
    _type: 'cisco_umbrella_application',
    _class: ['Application'],
  },
  APPLICATION_CATEGORY: {
    resourceName: 'Application Category',
    _type: 'cisco_umbrella_application_category',
    _class: ['Group'],
  },
  DESTINATION: {
    resourceName: 'Destination',
    _type: 'cisco_umbrella_destination',
    _class: ['Record'],
  },
  DESTINATION_LIST: {
    resourceName: 'Destination List',
    _type: 'cisco_umbrella_destination_list',
    _class: ['Record'],
  },
  DEVICE: {
    resourceName: 'Network Device',
    _type: 'cisco_umbrella_device',
    _class: ['Device'],
  },
  DOMAIN: {
    resourceName: 'Domain',
    _type: 'cisco_umbrella_domain',
    _class: ['Domain'],
  },
  NETWORK: {
    resourceName: 'Network',
    _type: 'cisco_umbrella_network',
    _class: ['Network'],
  },
  NETWORK_TUNNEL: {
    resourceName: 'Network Tunnel',
    _type: 'cisco_umbrella_network_tunnel',
    _class: ['NetworkEndpoint'],
  },
  POLICY: {
    resourceName: 'Policy',
    _type: 'cisco_umbrella_policy',
    _class: ['Policy'],
  },
  ROLE: {
    resourceName: 'System Role',
    _type: 'cisco_umbrella_role',
    _class: ['AccessRole'],
  },
  SITE: {
    resourceName: 'Site',
    _type: 'cisco_umbrella_site',
    _class: ['Site'],
  },
  USER: {
    resourceName: 'System User',
    _type: 'cisco_umbrella_user',
    _class: ['User'],
  },
  VIRTUAL_APPLIANCE: {
    resourceName: 'Virtual Appliance',
    _type: 'cisco_umbrella_virtual_appliance',
    _class: ['Gateway'],
  },
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_SITE'
  | 'ACCOUNT_HAS_APPLICATION'
  | 'ACCOUNT_HAS_DEVICE'
  | 'ACCOUNT_HAS_USER'
  | 'SITE_HAS_VIRTUAL_APPLIANCE'
  | 'ACCOUNT_HAS_NETWORK'
  | 'SITE_HAS_NETWORK_TUNNEL'
  | 'ACCOUNT_HAS_POLICY'
  | 'ACCOUNT_HAS_DESTINATION_LIST'
  | 'DESTINATION_LIST_HAS_DESTINATION'
  | 'VIRTUAL_APPLIANCE_USES_DOMAIN'
  | 'ACCOUNT_HAS_DOMAIN'
  | 'USER_ASSIGNED_ROLE',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_SITE: {
    _type: 'cisco_umbrella_account_has_site',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.SITE._type,
  },
  ACCOUNT_HAS_APPLICATION: {
    _type: 'cisco_umbrella_account_has_application',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.APPLICATION._type,
  },
  ACCOUNT_HAS_DEVICE: {
    _type: 'cisco_umbrella_account_has_device',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.DEVICE._type,
  },
  ACCOUNT_HAS_USER: {
    _type: 'cisco_umbrella_account_has_user',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  SITE_HAS_VIRTUAL_APPLIANCE: {
    _type: 'cisco_umbrella_site_has_virtual_appliance',
    sourceType: Entities.SITE._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.VIRTUAL_APPLIANCE._type,
  },
  SITE_HAS_NETWORK_TUNNEL: {
    _type: 'cisco_umbrella_site_has_network_tunnel',
    sourceType: Entities.SITE._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.NETWORK_TUNNEL._type,
  },
  ACCOUNT_HAS_NETWORK: {
    _type: 'cisco_umbrella_account_has_network',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.NETWORK._type,
  },
  ACCOUNT_HAS_POLICY: {
    _type: 'cisco_umbrella_account_has_policy',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.POLICY._type,
  },
  ACCOUNT_HAS_DESTINATION_LIST: {
    _type: 'cisco_umbrella_account_has_destination_list',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.DESTINATION_LIST._type,
  },
  DESTINATION_LIST_HAS_DESTINATION: {
    _type: 'cisco_umbrella_destination_list_has_destination',
    sourceType: Entities.DESTINATION_LIST._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.DESTINATION._type,
  },
  VIRTUAL_APPLIANCE_USES_DOMAIN: {
    _type: 'cisco_umbrella_virtual_appliance_uses_domain',
    sourceType: Entities.VIRTUAL_APPLIANCE._type,
    _class: RelationshipClass.USES,
    targetType: Entities.DOMAIN._type,
  },
  ACCOUNT_HAS_DOMAIN: {
    _type: 'cisco_umbrella_account_has_domain',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.DOMAIN._type,
  },
  USER_ASSIGNED_ROLE: {
    _type: 'cisco_umbrella_user_assigned_role',
    sourceType: Entities.USER._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.ROLE._type,
  },
};
