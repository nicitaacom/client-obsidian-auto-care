"use server"

import { createClient } from "@supabase/supabase-js"
import moment from "moment-timezone"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

function validatePhoneInput(message: string, selectedDate: string | null, at: string, phone?: string): string | null {
  if (!message) return "Message is required"
  if (!selectedDate) return "You need to select a date"
  if (!phone) return "Business phone number is required for notification"
  if (!/^[+0-9\s]{7,17}$/.test(phone)) return "Invalid phone number format"
  if (!at) return "Time is required"
  return null
}

function buildCronSchedule(date: moment.Moment): string {
  return `${date.minute()} ${date.hour()} ${date.date()} ${date.month() + 1} ${date.day()}`
}

export async function scheduleSMSNtfcnAction(
  message: string,
  selectedDate: string | null,
  appointment_at: string, // ISO timestamptz
  organizatorPhone?: string,
  appointmentId?: string,
): Promise<void | string> {
  // 1. Validate inputs
  const validationError = validatePhoneInput(message, selectedDate, appointment_at, organizatorPhone)
  if (validationError) return validationError

  const date = Array.isArray(selectedDate) ? selectedDate[0] : selectedDate
  if (!date) return "Missing date for scheduling"

  // 2. Parse and validate scheduling time
  const bookingDate = moment(date).format("YYYY-MM-DD")
  const baseTime = moment.tz(`${bookingDate} ${appointment_at}`, "Europe/Moscow").seconds(0).milliseconds(0)

  if (baseTime.isBefore(moment())) return "Scheduling time is in the past"

  // 3. Insert SMS notification
  const scheduledFor = process.env.NODE_ENV === "development" ? moment() : baseTime.clone().subtract(30, "minutes")
  const notificationId = crypto.randomUUID()
  const { error: insertError } = await supabase.from("sms_notifications").insert({
    id: notificationId,
    appointment_id: appointmentId,
    phone: organizatorPhone,
    message,
    scheduled_for: scheduledFor.toISOString(),
  })

  if (insertError) {
    console.error("Error inserting SMS notification:", insertError)
    return `Error scheduling: ${insertError.message}`
  }

  // 4. Create pg_cron schedule
  const cronJobName = `sms_notification_${notificationId}`
  const cronSchedule = buildCronSchedule(scheduledFor)

  const edgeFunctionUrl = "https://mdltdmheelhfcvbglhxr.supabase.co/functions/v1/sms-reminder"

  const query = `
    SELECT cron.schedule(
      '${cronJobName}',
      '${cronSchedule}',
      $$SELECT net.http_post(
        url := '${edgeFunctionUrl}',
        headers := '{"Authorization": "Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}", "Content-Type": "application/json"}',
        body := '{"notificationId": "${notificationId}"}'
      )$$
    );
  `

  const { error: cronError } = await supabase.rpc("execute_any_sql", { query })
  if (cronError) {
    console.error("Error scheduling SMS cron job:", cronError)
    return `Error scheduling cron: ${cronError.message}`
  }
}
