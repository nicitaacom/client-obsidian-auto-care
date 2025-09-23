import { businessInfo } from "@/consts/businessInfo"
import CalendarContainer from "@/widgets/Calendar/CalendarContainer"
import Link from "next/link"

export default function Booking() {
  return (
    <div className="min-h-screen bg-background p-3">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link
            className="flex items-center gap-2 text-subTitle hover:text-title transition-colors duration-200 group"
            href="/">
            <svg
              className="group-hover:-translate-x-0.5 transition-transform duration-200"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"></path>
            </svg>
            <span className="text-sm">Back to home</span>
          </Link>

          <h1 className="text-title text-lg font-medium">Book Appointment</h1>
        </div>

        {/* Calendar */}
        <div className="bg-foreground rounded-lg border border-border-color overflow-hidden">
          <CalendarContainer
            businessHours={businessInfo.businessHours}
            maxBookingDaysInAdvance={28}
            businessOwnerPhone={businessInfo.phone}
            defaultTimezone={businessInfo.timezone}
          />
        </div>
      </div>
    </div>
  )
}
