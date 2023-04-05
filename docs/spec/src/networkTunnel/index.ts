import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const networkTunnelSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://sandbox.bigid.tools/api/v1/ds-connections
     * PATTERN: Fetch Entities
     */
    id: 'fetch-network-tunnels',
    name: 'Fetch Network Tunnels',
    entities: [
      {
        resourceName: 'Network Tunnel',
        _type: 'cisco_umbrella_network_tunnel',
        _class: ['NetworkEndpoint'],
      },
    ],
    relationships: [
      {
        _class: RelationshipClass.HAS,
        _type: 'cisco_umbrella_site_has_network_tunnel',
        sourceType: 'cisco_umbrella_site',
        targetType: 'cisco_umbrella_network_tunnel',
      },
    ],
    dependsOn: ['fetch-sites'],
    implemented: true,
  },
];
