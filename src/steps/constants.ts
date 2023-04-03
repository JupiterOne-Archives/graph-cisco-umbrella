import { StepEntityMetadata } from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
  DESTINATION: 'fetch-destinations',
  DESTINATION_LIST: 'fetch-destination-lists',
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
    _class: ['Network'],
    schema: {
      properties: {
        name: { type: 'string' },
        CIDR: { type: '[string]' },
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

/*
export const Relationships: Record<
  'ACCOUNT_HAS_USER',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_USER: {
    _type: 'acme_account_has_user',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
};
*/
