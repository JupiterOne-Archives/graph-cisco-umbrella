import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { accountSpec } from './account';
import { virtualApplianceSpec } from './virtualAppliance';
import { destinationSpec } from './destination';
import { domainSpec } from './domain';
import { networkSpec } from './network';
import { networkTunnelSpec } from './networkTunnel';
import { policySpec } from './policy';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [
    ...accountSpec,
    ...destinationSpec,
    ...domainSpec,
    ...networkSpec,
    ...networkTunnelSpec,
    ...policySpec,
    ...virtualApplianceSpec,
  ],
};
