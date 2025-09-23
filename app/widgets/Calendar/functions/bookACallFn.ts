import moment from "moment-timezone"
import { createClient } from "@supabase/supabase-js"

import { useAppointmentStore } from "../useAppointmentStore"
import { convertCurrentToTargetTimezone } from "../utils/convertCurrentToTargetTimezone"
import { formatedDateTimeFn } from "../utils/formatedDateTimeFn"
import { scheduleSMSNtfcnAction } from "../actions/scheduleSMSNtfcnAction"
import { IDBAppointment } from "../types/IDBAppointment"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export async function bookACallFn(sendNotificationTo?: string) {
  const {
    // sendNotificationTo,
    inputNotificationTo,
    channel,
    userId,
    selectedDate,
    selectedTime,
    selectedTimezone,
  } = useAppointmentStore.getState()
  const { setNextStep, setError } = useAppointmentStore.getState()
  const { firstName, email, phone, appointmentNote } = useAppointmentStore.getState()

  // 1. Validate date is not in the past
  const selected = moment(selectedDate).startOf("day")
  const today = moment().startOf("day")
  if (selected.isBefore(today)) return setError("Cannot book appointments in the past")

  const atMSK = convertCurrentToTargetTimezone(selectedTime, selectedTimezone, "Europe/Moscow")

  let message = formatedDateTimeFn(true)
  inputNotificationTo.length > 3
    ? (message += `Send notification to ${sendNotificationTo}: ${inputNotificationTo}\n`)
    : null
  appointmentNote.length > 3 ? (message += `Appointment note: ${appointmentNote}\n`) : null
  message += `Where: ${channel === "google-meets" ? '<a href="https://meet.google.com/yiy-pbnd-ygo?pli=1">google-meets</a>' : channel}\n`

  try {
    const appointmentId = crypto.randomUUID()
    const response = await scheduleSMSNtfcnAction(
      message,
      selectedDate,
      atMSK,
      channel,
      sendNotificationTo,
      appointmentId,
    )
    if (typeof response === "string") throw Error(response)

    if (!selectedDate) throw Error("It's no selected date")
    if (!selectedTime) throw Error("It's no selected time")

    const appointmentObj: IDBAppointment = {
      id: appointmentId,
      created_at: moment().toISOString(),
      date: selectedDate,
      user_id: userId,
      time: selectedTime,
      timezone: selectedTimezone,
      first_name: firstName,
      email: email,
      phone: phone,
      note: appointmentNote,
      channel,
      notification_to: inputNotificationTo,
    }

    const { data, error } = await supabase.from("appointments").insert(appointmentObj)
    if (error) throw Error(error.message)
    setNextStep()

    return appointmentObj
  } catch (error) {
    error instanceof Error ? setError(`Error booking: ${error.message}`) : setError("Error booking")
  }
}
