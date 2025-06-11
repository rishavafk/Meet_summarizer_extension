// gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';

import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI('AIzaSyAQG0ORw_CTq7_TxejUq557TlVUt2GgXms');


export async function summarize(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are an AI assistant tasked with summarizing meeting transcripts. Please read the following transcript and provide a concise summary (around 250 words) of the key discussion points. In your summary, explicitly identify and list any mentioned deadlines and any tasks or action items that were assigned or discussed as needing to be done.also format it in proper paragraphs so it looks good.

--- TRANSCRIPT START ---
${text}
--- TRANSCRIPT END ---

Summary:
Deadlines:
To-Do List:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();

    console.log("Gemini Response:\n", output);
    return output;
  } catch (error) {
    console.error("Error in summarize:", error);
    throw error; 
  }
}

