import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const policySpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://sandbox.bigid.tools/api/v1/ds-connections
     * PATTERN: Fetch Entities
     */
    id: 'fetch-policies',
    name: 'Fetch Policies',
    entities: [
      {
        resourceName: 'Policy',
        _type: 'cisco_umbrella_policy',
        _class: ['Policy'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
