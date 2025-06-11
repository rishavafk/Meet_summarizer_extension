import speech from '@google-cloud/speech';

process.env.GOOGLE_APPLICATION_CREDENTIALS = './gcloud-key.json';

const client = new speech.SpeechClient();

const audio = {
  uri: 'gs://whitechocolate/audiofiles/output.wav', 
};

const config = {
  encoding: 'LINEAR16',
  sampleRateHertz: 16000,
  languageCode: 'en-US',
};

const request = {
  config,
  audio,
};

export async function transcribeLongAudio() {
  try {
    console.log(' Transcribing from GCS...');
    const [operation] = await client.longRunningRecognize(request);
    const [response] = await operation.promise();

    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    console.log(`\n Transcription:\n${transcription}`);
    return transcription;
  } catch (err) {
    console.error(' ERROR:', err.message);
  }
}

// transcribeLongAudio();
