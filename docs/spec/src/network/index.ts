import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
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
    relationships: [
      {
        _class: RelationshipClass.HAS,
        _type: 'cisco_umbrella_account_has_network',
        sourceType: 'cisco_umbrella_account',
        targetType: 'cisco_umbrella_network',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
