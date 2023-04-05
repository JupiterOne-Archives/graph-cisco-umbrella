import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
  DESTINATION: 'fetch-destinations',
  DOMAIN: 'fetch-domains',
  NETWORK: 'fetch-networks',
  NETWORK_TUNNEL: 'fetch-network-tunnels',
  POLICY: 'fetch-policies',
  SITE: 'fetch-sites',
  VIRTUAL_APPLIANCE: 'fetch-virtual-appliances',
};

export const Entities: Record<
  | 'ACCOUNT'
  | 'DESTINATION'
  | 'DESTINATION_LIST'
  | 'DOMAIN'
  | 'NETWORK'
  | 'NETWORK_TUNNEL'
  | 'POLICY'
  | 'SITE'
  | 'VIRTUAL_APPLIANCE',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'cisco_umbrella_account',
    _class: ['Account'],
    schema: {
      properties: {
        mfaEnabled: { type: 'boolean' },
        manager: { type: 'string' },
      },
    },
  },
  DESTINATION: {
    resourceName: 'Destination',
    _type: 'cisco_umbrella_destination',
    _class: ['Record'],
    schema: {
      properties: {},
    },
  },
  DESTINATION_LIST: {
    resourceName: 'Destination List',
    _type: 'cisco_umbrella_destination_list',
    _class: ['Record'],
    schema: {
      properties: {},
    },
  },
  DOMAIN: {
    resourceName: 'Domain',
    _type: 'cisco_umbrella_domain',
    _class: ['Domain'],
    schema: {
      properties: {
        displayName: { type: 'string' },
      },
    },
  },
  NETWORK: {
    resourceName: 'Network',
    _type: 'cisco_umbrella_network',
    _class: ['Network'],
    schema: {
      properties: {
        name: { type: 'string' },
      },
    },
  },
  NETWORK_TUNNEL: {
    resourceName: 'Network Tunnel',
    _type: 'cisco_umbrella_network_tunnel',
    _class: ['NetworkEndpoint'],
    schema: {
      properties: {
        name: { type: 'string' },
      },
    },
  },
  POLICY: {
    resourceName: 'Policy',
    _type: 'cisco_umbrella_policy',
    _class: ['Policy'],
    schema: {
      properties: {
        name: { type: 'string' },
      },
    },
  },
  SITE: {
    resourceName: 'Site',
    _type: 'cisco_umbrella_site',
    _class: ['Site'],
    schema: {
      properties: {
        name: { type: 'string' },
      },
    },
  },
  VIRTUAL_APPLIANCE: {
    resourceName: 'Virtual Appliance',
    _type: 'cisco_umbrella_virtual_appliance',
    _class: ['Gateway'],
    schema: {
      properties: {
        name: { type: 'string' },
      },
    },
  },
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_SITE'
  | 'SITE_HAS_VIRTUAL_APPLIANCE'
  | 'ACCOUNT_HAS_NETWORK'
  | 'SITE_HAS_NETWORK_TUNNEL'
  | 'ACCOUNT_HAS_POLICY'
  | 'ACCOUNT_HAS_DESTINATION_LIST'
  | 'DESTINATION_LIST_HAS_DESTINATION'
  | 'VIRTUAL_APPLIANCE_USES_DOMAIN'
  | 'ACCOUNT_HAS_DOMAIN',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_SITE: {
    _type: 'cisco_umbrella_account_has_site',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.SITE._type,
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
};
