"use client"

import { cn } from "@/lib/utils"

type LiquidBlobProps = {
  className?: string
  from?: string
  to?: string
  opacity?: string
}

// Simple reusable liquid/organic SVG blob with gradient fill
export function LiquidBlob({ className, from = "from-emerald-500", to = "to-teal-500", opacity = "opacity-30" }: LiquidBlobProps) {
  return (
    <div className={cn("pointer-events-none select-none", className)}>
      <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className={cn("h-full w-full", opacity)} aria-hidden>
        <defs>
          <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" className={cn(from)} />
            <stop offset="100%" className={cn(to)} />
          </linearGradient>
          <filter id="blur">
            <feGaussianBlur stdDeviation="20" />
          </filter>
        </defs>
        <g filter="url(#blur)">
          <path fill="url(#lg)" d="M438.7,343.8Q399,437.6,300.4,454.1Q201.8,470.7,135.2,385.3Q68.5,299.9,116.1,212.4Q163.7,125,261.1,96.6Q358.5,68.2,425.8,147.1Q493.1,226.1,438.7,343.8Z"/>
        </g>
      </svg>
    </div>
  )
}
