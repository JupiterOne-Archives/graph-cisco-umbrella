import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const applicationSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://<baseurl>/reports/v2/appdiscovery/applications
     * PATTERN: Fetch Entities
     */
    id: 'fetch-applications',
    name: 'Fetch Applications',
    entities: [
      {
        resourceName: 'Application',
        _type: 'cisco_umbrella_application',
        _class: ['Application'],
      },
    ],
    relationships: [
      {
        _class: RelationshipClass.HAS,
        _type: 'cisco_umbrella_account_has_application',
        sourceType: 'cisco_umbrella_account',
        targetType: 'cisco_umbrella_application',
      },
      {
        _class: RelationshipClass.HAS,
        _type: 'cisco_umbrella_application_has_application_category',
        sourceType: 'cisco_umbrella_application',
        targetType: 'cisco_umbrella_application_category',
      },
    ],
    dependsOn: ['fetch-account', 'fetch-application-categories'],
    implemented: true,
  },
];
