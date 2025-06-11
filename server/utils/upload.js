import { Storage } from '@google-cloud/storage';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import fs from 'fs';

process.env.GOOGLE_APPLICATION_CREDENTIALS = './gcloud-key.json'; 

ffmpeg.setFfmpegPath(ffmpegPath); 

const storage = new Storage();
const bucketName = 'whitechocolate';

const webmFilePath = 'uploads/latest.webm';
const wavFilePath = 'uploads/first.wav';
const gcsDestination = 'audiofiles/output.wav'; 

async function convertWebmToWav(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat('wav')
      .audioCodec('pcm_s16le')
      .audioChannels(1) 
      .audioFrequency(16000)
      .on('end', () => {
        console.log(' Conversion to WAV completed.');
        resolve();
      })
      .on('error', (err) => {
        reject(` Error converting file: ${err.message}`);
      })
      .save(outputPath);
  });
}

async function uploadFile(filePath, destination) {
  try {
    await storage.bucket(bucketName).upload(filePath, { destination });
    console.log(` File uploaded to gs://${bucketName}/${destination}`);
  } catch (err) {
    console.error(' Upload failed:', err.message);
  }
}

export async function processAndUpload() {
  try {
    await convertWebmToWav(webmFilePath, wavFilePath);
    await uploadFile(wavFilePath, gcsDestination);
    fs.unlinkSync(wavFilePath); 
  } catch (err) {
    console.error(err);
  }
}

// processAndUpload();
