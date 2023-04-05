import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const destinationSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://sandbox.bigid.tools/api/v1/ds-connections
     * PATTERN: Fetch Entities
     */
    id: 'fetch-destinations',
    name: 'Fetch Destinations',
    entities: [
      {
        resourceName: 'Destination List',
        _type: 'cisco_umbrella_destination_list',
        _class: ['Record'],
      },
      {
        resourceName: 'Destination',
        _type: 'cisco_umbrella_destination',
        _class: ['Record'],
      },
    ],
    relationships: [
      {
        _class: RelationshipClass.HAS,
        _type: 'cisco_umbrella_account_has_destination_list',
        sourceType: 'cisco_umbrella_account',
        targetType: 'cisco_umbrella_destination_list',
      },
      {
        _class: RelationshipClass.HAS,
        _type: 'cisco_umbrella_destination_list_has_destination',
        sourceType: 'cisco_umbrella_destination_list',
        targetType: 'cisco_umbrella_destination',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
