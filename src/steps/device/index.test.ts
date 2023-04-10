import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

// We currently have to skip this until we get devices added to a test environment
test('fetch-devices', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-devices',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.DEVICE);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});
