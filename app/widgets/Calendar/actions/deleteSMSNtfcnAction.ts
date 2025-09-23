"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export async function deleteSMSNtfcnAction(appointmentId: string): Promise<string> {
  // 1. Delete notifications by appointment_id
  const { error } = await supabase.from("sms_notifications").delete().eq("appointment_id", appointmentId)
  return error
    ? (console.error("Error deleting notifications:", error), `Error deleting: ${error.message}`)
    : "Notifications deleted successfully"
}
