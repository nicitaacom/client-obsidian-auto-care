"use server"

import { Twilio } from "twilio"

export async function sendImmediateSMSAction(phone: string, message: string): Promise<void | string> {
  // 1. Get Twilio credentials
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_ACCOUNT_TOKEN
  const fromPhone = process.env.TWILIO_PHONE_NUMBER
  if (!accountSid || !authToken || !fromPhone) return "Missing Twilio credentials"

  // 2. Initialize Twilio client
  const client = new Twilio(accountSid, authToken)

  try {
    // 3. Send SMS
    await client.messages.create({ body: message, from: fromPhone, to: phone })
  } catch (error) {
    console.error("Twilio error:", error)
    return "Failed to send SMS"
  }
}
