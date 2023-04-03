import { StepSpec } from '@jupiterone/integration-sdk-core';
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
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
