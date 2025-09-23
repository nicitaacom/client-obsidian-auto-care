"use server"

import { createClient } from "@supabase/supabase-js"
import moment from "moment-timezone"

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function scheduleSMSNtfcnAction(
  message: string,
  selectedDate: string | null,
  at: string,
  channel: string,
  sendNotificationTo?: string,
  appointmentId?: string,
): Promise<void | string> {
  // 1. Validate inputs
  if (!selectedDate) return "You need to select a date"
  if (!sendNotificationTo) return "Business phone number is required for notification"
  if (!/^[+0-9\s]{7,17}$/.test(sendNotificationTo)) return "Invalid phone number format"

  const date = Array.isArray(selectedDate) ? selectedDate[0] : selectedDate
  if (!date) return "Missing date for scheduling"

  // 2. Parse and validate scheduling time
  const bookingDate = moment(date).format("YYYY-MM-DD")
  const baseTime = moment.tz(`${bookingDate} ${at}`, "Europe/Moscow").seconds(0).milliseconds(0)
  if (baseTime.isBefore(moment())) return "Scheduling time is in the past"

  // 3. Insert SMS notification
  const scheduledFor = baseTime.clone().subtract(30, "minutes")
  const notificationId = crypto.randomUUID()
  const { error: insertError } = await supabase.from("sms_notifications").insert({
    id: notificationId,
    appointment_id: appointmentId,
    phone: sendNotificationTo,
    message,
    scheduled_for: scheduledFor.toISOString(),
  })

  if (insertError)
    return console.error("Error inserting notification:", insertError), `Error scheduling: ${insertError.message}`

  // 4. Create pg_cron schedule
  const cronJobName = `sms_notification_${notificationId}`
  const minute = scheduledFor.minute()
  const hour = scheduledFor.hour()
  const day = scheduledFor.date()
  const month = scheduledFor.month() + 1 // pg_cron months are 1-based
  const dayOfWeek = scheduledFor.day() // 0 (Sunday) to 6 (Saturday)
  const cronSchedule = `${minute} ${hour} ${day} ${month} ${dayOfWeek}`
  const edgeFunctionUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/index`
  const query = `
    SELECT cron.schedule(
      '${cronJobName}',
      '${cronSchedule}',
      $$SELECT net.http_post(
        url := '${edgeFunctionUrl}',
        headers := '{"Authorization": "Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}", "Content-Type": "application/json"}',
        body := '{"notificationId": "${notificationId}"}'
      )$$
    );
  `

  const { error: cronError } = await supabase.rpc("execute_any_sql", { query })
  if (cronError) {
    console.error("Error scheduling cron job:", cronError)
    return `Error scheduling cron: ${cronError.message}`
  }
}
