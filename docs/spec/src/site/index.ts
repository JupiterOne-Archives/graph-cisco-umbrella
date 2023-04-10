import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const siteSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://sandbox.bigid.tools/api/v1/ds-connections
     * PATTERN: Fetch Entities
     */
    id: 'fetch-sites',
    name: 'Fetch Sites',
    entities: [
      {
        resourceName: 'Site',
        _type: 'cisco_umbrella_site',
        _class: ['Site'],
      },
    ],
    relationships: [],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
