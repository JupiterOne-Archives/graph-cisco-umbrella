import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { getOrCreateAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Relationships, Steps } from '../constants';
import { createDomainKey } from '../domain/converter';
import { createSiteKey } from '../site/converter';
import {
  createSiteVirtualApplianceRelationship,
  createVirtualApplianceEntity,
} from './converter';

export async function fetchVirtualAppliances({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = getOrCreateAPIClient(instance.config, logger);

  await apiClient.iterateVirtualAppliances(async (appliance) => {
    const virtualApplianceEntity = await jobState.addEntity(
      createVirtualApplianceEntity(appliance),
    );

    const siteEntity = await jobState.findEntity(
      createSiteKey(appliance.siteId),
    );
    if (siteEntity) {
      await jobState.addRelationship(
        createSiteVirtualApplianceRelationship(
          siteEntity,
          virtualApplianceEntity,
        ),
      );
    }

    for (const domain of appliance.settings.domains) {
      const domainEntity = await jobState.findEntity(createDomainKey(domain));
      if (domainEntity) {
        await jobState.addRelationship(
          createSiteVirtualApplianceRelationship(
            virtualApplianceEntity,
            domainEntity,
          ),
        );
      }
    }
  });
}

export const virtualApplianceSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.VIRTUAL_APPLIANCE,
    name: 'Fetch Virtual Appliances',
    entities: [Entities.VIRTUAL_APPLIANCE],
    relationships: [
      Relationships.SITE_HAS_VIRTUAL_APPLIANCE,
      Relationships.VIRTUAL_APPLIANCE_USES_DOMAIN,
    ],
    dependsOn: [Steps.SITE],
    executionHandler: fetchVirtualAppliances,
  },
];
