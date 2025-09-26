import { useAppointmentStore } from "../useAppointmentStore"
import { convertCurrentToTargetTimezone } from "../utils/convertCurrentToTargetTimezone"
import { formatedDateTimeFn } from "../utils/formatedDateTimeFn"
import { deleteSMSNtfcnAction } from "../actions/deleteSMSNtfcnAction"
import { sendImmediateSMSAction } from "../actions/sendImmediateSMSAction"
import { sendEmailAction } from "../actions/sendEmailAction"
import { deleteEmailNtfcnAction } from "../actions/deleteEmailNtfcnAction"
import { deleteDBAppointmentAction } from "../actions/deleteDBAppointmentAction"

export async function cancelAppointmentFn(id: string, timezone: string, organizatorPhone?: string) {
  const { setError } = useAppointmentStore.getState()
  const { selectedDate, selectedTime, selectedTimezone } = useAppointmentStore.getState()
  const { firstName, phone, vehicle, email, appointmentNote } = useAppointmentStore.getState()

  const atTimezone = convertCurrentToTargetTimezone(selectedTime, selectedTimezone, timezone)

  try {
    if (!selectedDate) throw Error("It's no selected date")
    if (!selectedTime) throw Error("It's no selected time")
    if (!organizatorPhone)
      throw Error("Add a business (organizator) phone number - so SMS about rebooking will be sent")

    let message = formatedDateTimeFn("❌ canceled", selectedDate, selectedTime, selectedTimezone)
    message += `First name: ${firstName}\n`
    message += `Vehicle: ${vehicle}\n`
    message += `Phone: ${phone}\n`
    message += email?.length && email.length > 4 ? `Email: ${email}\n` : ""
    message += appointmentNote.length > 3 ? `Appointment note: ${appointmentNote}\n` : ""

    const subject = `Appointment ❌ canceled with ${firstName} at ${selectedDate}`

    // 1. Delete appointment
    const deleteApptResp = await deleteDBAppointmentAction(id)
    if (typeof deleteApptResp === "string") throw Error(deleteApptResp)

    // 2. Notify about cancellation with insta email
    const sendEmailResp = await sendEmailAction(message, subject, selectedDate, atTimezone, email)
    if (typeof sendEmailResp === "string") throw Error(sendEmailResp)
    // 2.2 Notify about cancellation with insta SMS
    const notifyResp = await sendImmediateSMSAction(organizatorPhone, message)
    if (typeof notifyResp === "string" && notifyResp.includes("Failed")) throw Error(notifyResp)

    // 3. Remove old SMS notification
    const deleteSMSNtfcnResp = await deleteSMSNtfcnAction(id)
    if (typeof deleteSMSNtfcnResp === "string" && deleteSMSNtfcnResp.includes("Error")) throw Error(deleteSMSNtfcnResp)
    // 3.1 Remove old Email notification
    const deleteResp = await deleteEmailNtfcnAction(id)
    if (typeof deleteResp === "string" && deleteResp.includes("Error")) throw Error(deleteResp)

    return { ok: true }
  } catch (error) {
    error instanceof Error ? setError(`Error rescheduling: ${error.message}`) : setError("Error rescheduling")
  }
}
