import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const domainSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://sandbox.bigid.tools/api/v1/ds-connections
     * PATTERN: Fetch Entities
     */
    id: 'fetch-domains',
    name: 'Fetch Domains',
    entities: [
      {
        resourceName: 'Domain',
        _type: 'cisco_umbrella_domain',
        _class: ['Domain'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
