import { StepEntityMetadata } from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
};

export const Entities: Record<'ACCOUNT', StepEntityMetadata> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'cisco_umbrella_account',
    _class: ['Account'],
    schema: {
      properties: {
        mfaEnabled: { type: 'boolean' },
        manager: { type: 'string' },
      },
      // Commenting out until we know if these values are available.
      // required: ['mfaEnabled', 'manager'],
    },
  },
};

/*
export const Relationships: Record<
  'ACCOUNT_HAS_USER',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_USER: {
    _type: 'acme_account_has_user',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
};
*/
