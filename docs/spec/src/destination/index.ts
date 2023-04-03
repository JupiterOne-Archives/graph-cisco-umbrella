import { StepSpec } from '@jupiterone/integration-sdk-core';
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
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
