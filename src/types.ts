export interface SessionTokenResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
}

export interface VirtualAppliance {
  originId: number;
  name: string;
  siteId: number;
  isUpgradable: boolean;
  state: {
    connectedToConnector: string;
    hasLocalDomainConfigured: string;
    queryFailureRateAcceptable: string;
    receivedInternalDNSQueries: string;
    redundantWithinSite: string;
    syncing: string;
  };
  health: string;
  type: string;
  settings: {
    internalIPs: [string];
    externalIP: string;
    hostType: string;
    uptime: number;
    isDnscryptEnabled: true;
    version: string;
    upgradeError: string;
    domains: [string];
    lastSyncTime: string;
  };
  createdAt: string;
  modifiedAt: string;
  stateUpdatedAt: string;
}

export interface Site {
  originId: number;
  name: string;
  siteId: number;
  isDefault: boolean;
  modifiedAt: string;
  createdAt: string;
}

export interface NetworkTunnel {
  id: number;
  uri: string;
  name: string;
  siteOriginId: number;
  client: {
    deviceType: string;
    authentication: {
      type: string;
      parameters: {
        id: string;
        modifiedAt: string;
      };
    };
  };
  transport: { protocol: string };
  serviceType: string;
  networkCIDRs: [string];
  meta: {};
  createdAt: string;
  modifiedAt: string;
}

export interface Network {
  originId: number;
  name: string;
  ipAddress: string;
  prefixLength: number;
  isDynamic: boolean;
  isVerified: boolean;
  status: string;
  createdAt: string;
}

export interface InternalNetwork {
  originId: number;
  name: string;
  ipAddress: string;
  prefixLength: number;
  siteName: string;
  siteId: number;
  networkName: string;
  networkId: number;
  tunnelName: string;
  tunnelId: number;
  createdAt: string;
  modifiedAt: string;
}

export interface Policy {
  policyId: number;
  organizationId: number;
  name: string;
  priority: number;
  createdAt: string;
  isDefault: boolean;
}

export interface Domain {
  id: number;
  domain: string;
  description: string;
  includeAllVAs: boolean;
  includeAllMobileDevices: boolean;
  createdAt: string;
  modifiedAt: string;
}

export interface DestinationListResponse {
  status: {
    code: number;
    text: string;
  };
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: [DestinationList];
}

export interface DestinationList {
  id: number;
  organizationId: number;
  access: string;
  isGlobal: boolean;
  name: string;
  thirdpartyCategoryId: number;
  createdAt: number;
  modifiedAt: number;
  isMspDefault: boolean;
  markedForDeletion: boolean;
  bundleTypeId: number;
  meta: {
    destinationCount: number;
    domainCount: number;
    urlCount: number;
    ipv4Count: number;
  };
}
export interface Destination {
  id: string;
  destination: string;
  type: string;
  comment: string;
  createdAt: string;
}

export interface UmbrellaMetaResponse<T> {
  status: {
    code: number;
    text: string;
  };
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: [T];
}
