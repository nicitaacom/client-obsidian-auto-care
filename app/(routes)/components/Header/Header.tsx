"use client"

import Image from "next/image"
import { twMerge } from "tailwind-merge"
import { useEffect, useState } from "react"

import { GoogleReviews } from "./GoogleReviews"
import { businessInfo } from "@/consts/businessInfo"
import { formatPhoneNumber } from "@/(routes)/utils/formatPhoneNumber"
import Link from "next/link"

interface SocialItemProps {
  className?: string
  iconSrc: string
  altText: string
  text: string
  href: string
}

function SocialItem({ className, iconSrc, altText, text, href }: SocialItemProps) {
  return (
    <Link
      className={twMerge("flex flex-col items-center gap-1 hover:text-brand transition-colors group", className)}
      href={href}
      target="_blank">
      <Image
        className="w-4 h-4 group-hover:scale-110 transition-transform"
        src={iconSrc}
        alt={altText}
        width={16}
        height={16}
      />
      <p className="text-xs text-subTitle group-hover:text-brand">{text}</p>
    </Link>
  )
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  // 1. Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark)

    setIsDark(shouldBeDark)
    document.documentElement.className = shouldBeDark ? "dark" : "light"
  }, [])

  // 2. Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.className = newTheme ? "dark" : "light"
    localStorage.setItem("theme", newTheme ? "dark" : "light")
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-foreground-accent hover:bg-brand/20 border border-border-color transition-all duration-200 group"
      aria-label="Toggle theme">
      {isDark ? (
        <svg
          className="w-4 h-4 text-title group-hover:text-brand transition-colors"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 text-title group-hover:text-brand transition-colors"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  )
}

export function Header() {
  return (
    <header className="bg-background border-b border-border-color flex flex-col desktop:flex-row justify-around items-center py-3 px-4 mobile:px-6 tablet:px-8 laptop:px-12 desktop:px-16">
      {/* LOGO */}
      <div className="w-[220px] hidden desktop:flex justify-center items-center gap-x-3">
        <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
          <span className="text-title-foreground font-bold text-sm">K</span>
        </div>
        <h1 className="text-lg font-bold text-title">{businessInfo.name}</h1>
      </div>

      <div className="w-full flex flex-col laptop:flex-row justify-around gap-y-3">
        {/* GOOGLE REVIEWS */}
        <GoogleReviews />

        <div className="flex flex-col gap-y-2 laptop:gap-y-0 gap-x-6 desktop:flex-row border-b border-border-color laptop:border-none pb-2 laptop:pb-0">
          {/* EMAIL */}
          <div className="flex justify-center items-center gap-x-2">
            <div className="w-5 h-5 bg-brand rounded-full flex items-center justify-center">
              <Image
                className="w-3 h-3 filter brightness-0 invert"
                src="/email.svg"
                alt="email"
                width={12}
                height={12}
              />
            </div>
            <p className="text-sm text-title">{businessInfo.email}</p>
          </div>
          {/* PHONE */}
          <div className="flex justify-center items-center gap-x-2">
            <div className="w-5 h-5 bg-brand rounded-full flex items-center justify-center">
              <Image
                className="w-3 h-3 filter brightness-0 invert"
                src="/phone.svg"
                alt="phone"
                width={12}
                height={12}
              />
            </div>
            <p className="text-sm text-title font-medium">{formatPhoneNumber(businessInfo.phone)}</p>
          </div>
        </div>

        <div className="flex flex-row justify-around items-center gap-x-6">
          <SocialItem
            iconSrc="/social-icons/instagram.png"
            altText="instagram"
            text="our work"
            href={businessInfo.instagramUrl}
          />
          <SocialItem
            className="hidden tablet:flex"
            iconSrc="/social-icons/facebook.png"
            altText="facebook"
            text="our blog"
            href={businessInfo.facebookUrl}
          />
          <SocialItem
            className="hidden tablet:flex"
            iconSrc="/social-icons/yell-pages.png"
            altText="yell-pages"
            text="our reviews"
            href={businessInfo.yellPagesUrl}
          />
          <SocialItem
            iconSrc="/social-icons/whatsapp.png"
            altText="whatsapp"
            text="2min response"
            href={`https://wa.me/${businessInfo.phone.replace(/[^0-9+]/g, "")}`}
          />

          {/* THEME TOGGLE */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
