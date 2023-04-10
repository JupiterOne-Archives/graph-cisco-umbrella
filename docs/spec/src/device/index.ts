import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const deviceSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://<baseurl>/deployments/v2/networkdevices
     * PATTERN: Fetch Entities
     */
    id: 'fetch-users',
    name: 'Fetch Users',
    entities: [
      {
        resourceName: 'System User',
        _type: 'cisco_umbrella_user',
        _class: ['User'],
      },
    ],
    relationships: [
      {
        _class: RelationshipClass.HAS,
        _type: 'cisco_umbrella_account_has_user',
        sourceType: 'cisco_umbrella_account',
        targetType: 'cisco_umbrella_user',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
