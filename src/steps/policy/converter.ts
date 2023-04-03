import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { Policy } from '../../types';

import { Entities } from '../constants';

export function createPolicyKey(id: number) {
  return `${Entities.POLICY._type}:${id}`;
}

export function createPolicyEntity(policy: Policy): Entity {
  return createIntegrationEntity({
    entityData: {
      source: policy,
      assign: {
        _key: createPolicyKey(policy.policyId),
        _type: Entities.POLICY._type,
        _class: Entities.POLICY._class,
        policyId: policy.policyId,
        name: policy.name,
        title: policy.name,
        summary: policy.name,
        content: '',
        type: '',
        displayName: policy.name,
        createdOn: parseTimePropertyValue(policy.createdAt),
        isDefault: policy.isDefault,
        organizationId: policy.organizationId,
        priority: policy.priority,
      },
    },
  });
}
