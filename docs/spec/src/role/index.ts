import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const roleSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://<baseurl>/admin/v2/roles
     * PATTERN: Fetch Entities
     */
    id: 'fetch-roles',
    name: 'Fetch Roles',
    entities: [
      {
        resourceName: 'System Role',
        _type: 'cisco_umbrella_role',
        _class: ['AccessRole'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
