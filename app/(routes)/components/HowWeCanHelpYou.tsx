import { consts } from "@/consts/consts"
import Image from "next/image"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

interface SocialItemProps {
  className?: string
  imgSrc: string
  altText: string
  text: string
}

function OurService({ className, imgSrc, altText, text }: SocialItemProps) {
  return (
    <li
      className={twMerge(
        "group bg-foreground-accent hover:bg-red-900/20 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]",
        className,
      )}>
      <div className="relative overflow-hidden">
        <Image
          src={imgSrc}
          alt={altText}
          width={720}
          height={480}
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-3">
        <p className="text-title text-sm font-semibold uppercase tracking-wide">{text}</p>
      </div>
    </li>
  )
}

export function HowWeCanHelpYou() {
  return (
    <div className="w-full desktop:max-w-[50vw] bg-foreground rounded-xl border border-red-900/20 flex flex-col gap-y-4 p-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-red-600 rounded-full" />
        <h2 className="text-2xl font-bold text-title">How we can help you?</h2>
      </div>
      <ul className="grid grid-cols-2 laptop:grid-cols-3 gap-3">
        {consts.ourServices.map(service => (
          <OurService
            key={service.serviceName}
            imgSrc={service.imgUrl}
            altText={service.serviceName}
            text={service.serviceName}
          />
        ))}
      </ul>

      {/* Divider */}
      <div className="flex items-center gap-1">
        <div className="flex-1 h-px bg-border-color" />
        <p className="text-subTitle text-xs px-1">or</p>
        <div className="flex-1 h-px bg-border-color" />
      </div>

      {/* Alternative Action Button */}
      <Link
        className="group w-full bg-foreground-accent hover:bg-brand/20 rounded-lg
       overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-border-color p-3"
        href="/booking">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h3 className="text-title text-lg font-medium">Book an appointment</h3>
            <p className="text-subTitle text-xs">Skip the form and schedule directly</p>
          </div>
          <div className="text-brand group-hover:translate-x-1 transition-transform duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  )
}
