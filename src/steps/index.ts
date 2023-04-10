import { accountSteps } from './account';
import { applicationCategorySteps } from './applicationCategory';
import { applicationSteps } from './application';
import { destinationSteps } from './destination';
import { domainSteps } from './domain';
import { networkSteps } from './network';
import { networkTunnelSteps } from './networkTunnel';
import { policySteps } from './policy';
import { siteSteps } from './site';
import { virtualApplianceSteps } from './virtualAppliance';
import { userSteps } from './user';
import { roleSteps } from './role';
import { deviceSteps } from './device';

const integrationSteps = [
  ...accountSteps,
  ...applicationCategorySteps,
  ...applicationSteps,
  ...destinationSteps,
  ...deviceSteps,
  ...domainSteps,
  ...networkSteps,
  ...networkTunnelSteps,
  ...policySteps,
  ...roleSteps,
  ...siteSteps,
  ...userSteps,
  ...virtualApplianceSteps,
];

export { integrationSteps };
