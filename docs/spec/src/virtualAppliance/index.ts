import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
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
    relationships: [
      {
        _class: RelationshipClass.HAS,
        _type: 'cisco_umbrella_site_has_virtual_appliance',
        sourceType: 'cisco_umbrella_site',
        targetType: 'cisco_umbrella_virtual_appliance',
      },
      {
        _class: RelationshipClass.USES,
        _type: 'cisco_umbrella_virtual_appliance_uses_domain',
        sourceType: 'cisco_umbrella_virtual_appliance',
        targetType: 'cisco_umbrella_domain',
      },
    ],
    dependsOn: ['fetch-sites', 'fetch-domains'],
    implemented: true,
  },
];
