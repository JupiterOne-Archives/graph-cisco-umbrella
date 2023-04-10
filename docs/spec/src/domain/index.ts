import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
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
    relationships: [
      {
        _class: RelationshipClass.HAS,
        _type: 'cisco_umbrella_account_has_domain',
        sourceType: 'cisco_umbrella_account',
        targetType: 'cisco_umbrella_domain',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
