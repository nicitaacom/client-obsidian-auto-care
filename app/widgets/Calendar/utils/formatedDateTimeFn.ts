import moment from "moment-timezone"

export function formatedDateTimeFn(
  isBook: boolean,
  selectedDate: string,
  selectedTime: string,
  selectedTimezone: string,
) {
  return selectedDate && selectedTime
    ? `Appointment ${isBook ? "booked" : "rescheduled"} for ${moment(`${selectedDate} ${selectedTime}`).tz(selectedTimezone).format("DD MMM YYYY HH:mm")} ${selectedTimezone}\n`
    : "Invalid date/time"
}
