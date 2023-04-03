import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const networkSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://sandbox.bigid.tools/api/v1/ds-connections
     * PATTERN: Fetch Entities
     */
    id: 'fetch-networks',
    name: 'Fetch Networks',
    entities: [
      {
        resourceName: 'Network',
        _type: 'cisco_umbrella_network',
        _class: ['Network'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
