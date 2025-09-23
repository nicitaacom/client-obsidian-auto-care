import { useAppointmentStore } from "../useAppointmentStore"
import { convertCurrentToTargetTimezone } from "../utils/convertCurrentToTargetTimezone"
import { formatedDateTimeFn } from "../utils/formatedDateTimeFn"
import { scheduleSMSNtfcnAction } from "../actions/scheduleSMSNtfcnAction"
import { IDBAppointment } from "../types/IDBAppointment"
import { updateDBAppointmentsAction } from "../actions/updateAppointmentsAction"
import { deleteSMSNtfcnAction } from "../actions/deleteSMSNtfcnAction"
import { sendImmediateSMSAction } from "../actions/sendImmediateSMSAction"

export async function rescheduleAppointmentFn(id: string, sendNotificationTo?: string) {
  const { firstName, phone, email, appointmentNote } = useAppointmentStore.getState()
  const { inputNotificationTo, channel, userId, selectedDate, selectedTime, selectedTimezone, setError } =
    useAppointmentStore.getState()

  const atMSK = convertCurrentToTargetTimezone(selectedTime, selectedTimezone, "Europe/Moscow")

  let message = formatedDateTimeFn(false)
  inputNotificationTo.length > 3
    ? (message += `Send notification to ${sendNotificationTo}: ${inputNotificationTo}\n`)
    : null
  appointmentNote.length > 3 ? (message += `Appointment note: ${appointmentNote}\n`) : null

  try {
    if (!sendNotificationTo) throw Error("Add a business phone number - so SMS about rebooking will be send")
    // 1. Notify about rebooking with immediate SMS
    const rebookMsg = message
    const notifyResp = await sendImmediateSMSAction(sendNotificationTo, rebookMsg)
    if (typeof notifyResp === "string" && notifyResp.includes("Failed")) throw Error(notifyResp)

    // 2. Remove old SMS notifications
    const deleteResp = await deleteSMSNtfcnAction(id)
    if (typeof deleteResp === "string" && deleteResp.includes("Error")) throw Error(deleteResp)

    // 3. Insert new SMS notification
    const scheduleResp = await scheduleSMSNtfcnAction(message, selectedDate, atMSK, channel, sendNotificationTo, id)
    if (typeof scheduleResp === "string") throw Error(scheduleResp)

    if (!selectedDate) throw Error("It's no selected date")
    if (!selectedTime) throw Error("It's no selected time")

    const appointmentObj: Omit<IDBAppointment, "id" | "created_at"> = {
      date: selectedDate,
      time: selectedTime,
      user_id: userId,
      channel,
      notification_to: inputNotificationTo,
      timezone: selectedTimezone,
      first_name: firstName,
      phone: phone,
      email: email,
      note: appointmentNote,
    }
    // do it in server action because seems like it lacks some RLS (seems like under the hood it select it first then delete then insert)
    // but it's not select RLS that's why it fails
    const updateDBResp = await updateDBAppointmentsAction(id, appointmentObj)
    if (updateDBResp.error) throw Error(updateDBResp.error.message)
    console.log(66, "appointmentObj - ", appointmentObj)
    return appointmentObj
  } catch (error) {
    error instanceof Error ? setError(`Error rescheduling: ${error.message}`) : setError("Error rescheduling")
  }
}
