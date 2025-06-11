
import twilio from 'twilio';

import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const accountSid ='ACd890836a495013e328d55aaaba6a30c7';
const authToken = '2cfc714dba59d4796ad0d4427750574a';

const client = twilio(accountSid, authToken);


export async function sendWhatsapp(content) {
  try {
    const message = await client.messages.create({
      body: content,
      from: 'whatsapp:+14155238886',      // Twilio sandbox or verified sender
      to: 'whatsapp:+9779829275803'        // Recipient's WhatsApp number
    });

    console.log(` WhatsApp message sent! SID: ${message.sid}`);
  } catch (err) {
    console.error(' WhatsApp Error:', err);
    throw err;
  }
}
