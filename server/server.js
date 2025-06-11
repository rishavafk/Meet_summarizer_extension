// server.js
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { processAndUpload } from './utils/upload.js';
import { transcribeLongAudio } from './utils/speechtotext.js';
import { summarize } from './utils/gemini.js';
import { sendEmail } from './utils/send-email.js';
import { sendWhatsapp } from './utils/send-whatsapp.js';


const app=express();

app.use(cors());
app.use(express.json());


const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null,'latest.webm');
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  console.log('Received:', req.file.filename);
  res.send('File uploaded successfully.');
});



app.get('/test', async (req, res) => {
  const context = {};

  try {
    console.log('Step 1: Converting & Uploading...');
    await processAndUpload();

    console.log('Step 2: Transcribing...');
    context.transcript = await transcribeLongAudio();

    console.log('Step 3: Summarizing with Gemini...');
    context.summary = await summarize(context.transcript);

    console.log('Step 4: Sending Email...');
    await sendEmail(context.summary);

    console.log('Step 5: Sending WhatsApp...');
    await sendWhatsapp(context.summary);

    console.log('All steps completed!');
    res.json({ success: true, summary: context.summary });

  } catch (err) {
    console.error('Error in pipeline:', err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
