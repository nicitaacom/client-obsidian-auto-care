"use server"

import { businessInfo } from "@/consts/businessInfo"
import { Resend } from "resend"
import { Twilio } from "twilio"

export async function contactUsAction(firstName: string, phone: string, message: string): Promise<void | string> {
  // 1. Validate inputs
  if (!firstName || firstName.length < 2) return "Name must be at least 2 characters"
  if (!phone || !/^[+0-9\s]*$/.test(phone)) return "Invalid phone number"
  if (!message || message.length < 3) return "Message must be at least 3 characters"

  // 2. Get Twilio credentials from environment
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_ACCOUNT_TOKEN
  const fromPhone = process.env.TWILIO_PHONE_NUMBER
  if (!accountSid || !authToken || !fromPhone) return "Missing Twilio credentials"

  // 3. Initialize Twilio client
  const client = new Twilio(accountSid, authToken)
  const resend = new Resend(process.env.RESEND_SECRET)

  try {
    await resend.emails.send({
      from: businessInfo.email,
      to: businessInfo.email,
      subject: `New form submission`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Form Submission</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #000000; color: #ffffff;">
            <div style="max-width: 500px; margin: 0 auto; background-color: #000000;">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #7c3aed, #a855f7); padding: 16px 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 18px; font-weight: 600; color: #ffffff;">New Form Submission</h1>
              </div>
              
              <!-- Content -->
              <div style="padding: 20px; background-color: #000000;">
                
                <!-- Booking Details -->
                <div style="background-color: #111111; border-radius: 6px; padding: 16px; margin-bottom: 16px; border-left: 3px solid #7c3aed;">
                  <h2 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #a855f7; text-transform: uppercase; letter-spacing: 0.5px;">Contact Details</h2>
                  
                  <div style="margin-bottom: 8px;">
                    <span style="color: #888888; font-size: 13px;">Name:</span>
                    <span style="color: #ffffff; font-size: 14px; margin-left: 8px; font-weight: 500;">${firstName}</span>
                  </div>
                  
                  <div style="margin-bottom: 8px;">
                    <span style="color: #888888; font-size: 13px;">Phone:</span>
                    <span style="color: #ffffff; font-size: 14px; margin-left: 8px; font-weight: 500;">${phone}</span>
                  </div>
                </div>
                
                <!-- Message -->
                ${
                  message
                    ? `
                <div style="background-color: #111111; border-radius: 6px; padding: 16px; border-left: 3px solid #7c3aed;">
                  <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #a855f7; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
                  <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.4;">${message}</p>
                </div>
                `
                    : ""
                }
                
              </div>
              
              <!-- Footer -->
              <div style="padding: 16px 20px; text-align: center; border-top: 1px solid #333333;">
                <p style="margin: 0; color: #666666; font-size: 12px;">
                  This is an automated form submission notification
                </p>
              </div>
              
            </div>
          </body>
        </html>
      `,
    })
  } catch (error) {
    if (error instanceof Error) return error.message
  }
  try {
    // 4. Send SMS
    await client.messages.create({
      body: `${firstName} want ${message}`,
      from: fromPhone,
      to: phone,
    })
  } catch (error) {
    // 5. Handle errors
    console.error("Twilio error:", error)
    return "Failed to send SMS"
  }
}
