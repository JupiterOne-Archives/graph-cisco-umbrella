import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const deviceSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://<baseurl>/deployments/v2/networkdevices
     * PATTERN: Fetch Entities
     */
    id: 'fetch-devices',
    name: 'Fetch Devices',
    entities: [
      {
        resourceName: 'Network Device',
        _type: 'cisco_umbrella_network_device',
        _class: ['Device'],
      },
    ],
    relationships: [
      {
        _class: RelationshipClass.HAS,
        _type: 'cisco_umbrella_account_has_network_device',
        sourceType: 'cisco_umbrella_account',
        targetType: 'cisco_umbrella_network_device',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
