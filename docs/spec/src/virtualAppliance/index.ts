import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const virtualApplianceSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://sandbox.bigid.tools/api/v1/ds-connections
     * PATTERN: Fetch Entities
     */
    id: 'fetch-virtual-appliances',
    name: 'Fetch Virtual Appliances',
    entities: [
      {
        resourceName: 'Virtual Appliance',
        _type: 'cisco_umbrella_virtual_appliance',
        _class: ['Gateway'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
