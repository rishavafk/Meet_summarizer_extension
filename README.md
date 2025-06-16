# TLDR Final Server

This project is the backend server for the TLDR application. It provides APIs for transcribing meeting audio, summarizing transcripts, and sending WhatsApp notifications. The server integrates with Google Speech-to-Text, Gemini (Google Generative AI), and Twilio.

## Features

- **Transcribe Audio:** Converts audio files (from Google Cloud Storage) to text using Google Speech-to-Text.
- **Summarize Transcripts:** Uses Gemini AI to generate concise meeting summaries, including deadlines and action items.
- **Send WhatsApp Notifications:** Sends messages via WhatsApp using Twilio.

## Prerequisites

- Node.js (v18 or later recommended)
- Google Cloud account with Speech-to-Text enabled
- Gemini API key
- Twilio account for WhatsApp messaging

## Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/rishavafk/Meet_Summarizer_Extension
   cd Meet_Summarizer_Extension/server
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `server` directory with the following content:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   GOOGLE_APPLICATION_CREDENTIALS=./gcloud-key.json
   GCS_BUCKET_NAME=your_gcs_bucket_name
   GCS_AUDIO_PATH=audiofiles/output.wav
   ```

   - Place your `gcloud-key.json` file in the `server` directory.
   - **Do not commit** your `.env` or `gcloud-key.json` files (they are in `.gitignore`).

4. **Run the server**
   ```sh
   npm start
   ```

## Project Structure

```
server/
│
├── utils/
│   ├── gemini.js           # Summarization logic
│   ├── send-whatsapp.js    # WhatsApp notification logic
│   └── speechtotext.js     # Speech-to-text logic
│
├── gcloud-key.json         # Google Cloud credentials (ignored by git)
├── .env                    # Environment variables (ignored by git)
├── .gitignore
├── package.json
└── server.js               # Main server entry point
```

## Security

- All sensitive keys and credentials are loaded from environment variables.
- `.gitignore` ensures secrets are not tracked by git.

## License

MIT
