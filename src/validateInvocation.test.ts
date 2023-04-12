import {
  createMockExecutionContext,
  Recording,
} from '@jupiterone/integration-sdk-testing';
import { integrationConfig } from '../test/config';
import { setupProjectRecording } from '../test/recording';
import { IntegrationConfig, validateInvocation } from './config';

describe('#validateInvocation', () => {
  let recording: Recording;

  afterEach(async () => {
    if (recording) {
      await recording.stop();
    }
  });

  test('requires valid config', async () => {
    const executionContext = createMockExecutionContext<IntegrationConfig>({
      instanceConfig: {} as IntegrationConfig,
    });

    await expect(validateInvocation(executionContext)).rejects.toThrow(
      'Config requires all of {clientId, clientSecret}',
    );
  });

  describe('fails validating invocation', () => {
    describe('invalid user credentials', () => {
      test('should throw if clientId is invalid', async () => {
        recording = setupProjectRecording({
          directory: __dirname,
          name: 'client-id-auth-error',
          options: {
            recordFailedRequests: true,
          },
        });

        const executionContext = createMockExecutionContext({
          instanceConfig: {
            clientId: 'INVALID',
            clientSecret: integrationConfig.clientSecret,
          },
        });

        await expect(validateInvocation(executionContext)).rejects.toThrow(
          'Provider authentication failed at https://api.umbrella.com/auth/v2/token: 401 Unauthorized',
        );
      });

      test('should throw if clientSecret is invalid', async () => {
        recording = setupProjectRecording({
          directory: __dirname,
          name: 'client-secret-auth-error',
          options: {
            recordFailedRequests: true,
          },
        });

        const executionContext = createMockExecutionContext({
          instanceConfig: {
            clientId: integrationConfig.clientSecret,
            clientSecret: 'INVALID',
          },
        });

        await expect(validateInvocation(executionContext)).rejects.toThrow(
          'Provider authentication failed at https://api.umbrella.com/auth/v2/token: 401 Unauthorized',
        );
      });
    });
  });

  /**
   * Test a successful authorization
   */
  test('successfully validates invocation', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'validate-invocation',
    });

    // Pass integrationConfig to authenticate with real credentials
    const executionContext = createMockExecutionContext({
      instanceConfig: integrationConfig,
    });

    // successful validateInvocation doesn't throw errors and will be undefined
    await expect(validateInvocation(executionContext)).resolves.toBeUndefined();
  });
});
