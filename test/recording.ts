import {
  setupRecording,
  Recording,
  SetupRecordingInput,
  mutations,
} from '@jupiterone/integration-sdk-testing';

export { Recording };

export function setupProjectRecording(
  input: Omit<SetupRecordingInput, 'mutateEntry'>,
): Recording {
  return setupRecording({
    ...input,
    redactedRequestHeaders: ['Authorization'],
    redactedResponseHeaders: ['set-cookie'],
    mutateEntry: (entry) => {
      redact(entry);
    },
  });
}

function getRedactedOAuthResponse() {
  return {
    access_token: '[REDACTED]',
    expires_in: 9999,
    token_type: 'Bearer',
  };
}

function redact(entry): void {
  if (entry.request.postData) {
    entry.request.postData.text = '[REDACTED]';
  }

  if (!entry.response.content.text) {
    return;
  }

  //let's unzip the entry so we can modify it
  mutations.unzipGzippedRecordingEntry(entry);

  //we can just get rid of all response content if this was the token call
  const requestUrl = entry.request.url;
  if (requestUrl.match(/auth\/v2\/token/)) {
    entry.response.content.text = JSON.stringify(getRedactedOAuthResponse());
    return;
  }
}
