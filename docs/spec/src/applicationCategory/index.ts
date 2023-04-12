import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const applicationCategorySpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://<baseurl>/reports/v2/appdiscovery/applicationcategories
     * PATTERN: Fetch Entities
     */
    id: 'fetch-application-categories',
    name: 'Fetch Applications',
    entities: [
      {
        resourceName: 'Application Category',
        _type: 'cisco_umbrella_application_category',
        _class: ['Group'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
