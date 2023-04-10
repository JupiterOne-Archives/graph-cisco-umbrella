import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const userSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://<baseurl>/admin/v2/users
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
      {
        _class: RelationshipClass.ASSIGNED,
        _type: 'cisco_umbrella_user_assigned_role',
        sourceType: 'cisco_umbrella_user',
        targetType: 'cisco_umbrella_role',
      },
    ],
    dependsOn: ['fetch-account', 'fetch-roles'],
    implemented: true,
  },
];
