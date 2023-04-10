import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

// We currently have to skip this until we get applications added to a test environment
test.skip('fetch-applications', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-applications',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.APPLICATION);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});
