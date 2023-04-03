import { accountSteps } from './account';
import { destinationSteps } from './destination';
import { domainSteps } from './domain';
import { networkSteps } from './network';
import { networkTunnelSteps } from './networkTunnel';
import { policySteps } from './policy';
import { siteSteps } from './site';
import { virtualApplianceSteps } from './virtualAppliance';

const integrationSteps = [
  ...accountSteps,
  ...destinationSteps,
  ...domainSteps,
  ...networkSteps,
  ...networkTunnelSteps,
  ...policySteps,
  ...siteSteps,
  ...virtualApplianceSteps,
];

export { integrationSteps };
