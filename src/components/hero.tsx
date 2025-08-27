"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
// Hero with elegant green waves background

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Waves background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <svg className="absolute inset-x-0 top-0 h-[360px] w-full" viewBox="0 0 1440 360" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.18" />
            </linearGradient>
          </defs>
          <path d="M0 120 Q 240 60 480 120 T 960 120 T 1440 120 V 0 H 0 Z" fill="url(#waveGrad)" />
          <path d="M0 200 Q 240 140 480 200 T 960 200 T 1440 200 V 120 H 0 Z" fill="url(#waveGrad)" opacity="0.7" />
          <path d="M0 260 Q 240 210 480 260 T 960 260 T 1440 260 V 200 H 0 Z" fill="url(#waveGrad)" opacity="0.45" />
        </svg>
        <div className="absolute top-0 left-0 right-0 mx-auto h-px w-[92%] bg-foreground/10" />
      </div>

      <div className="container mx-auto px-4 pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28">
        <div className="grid items-center gap-8 lg:gap-12 md:grid-cols-2">
          {/* Copy */}
          <div className="relative order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-foreground/70">
                <FileText className="h-3.5 w-3.5" />
                Currículo inteligente com IA
              </span>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Seu currículo pronto em <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">minutos</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-[54ch] leading-relaxed">
                Estilizado, compatível com ATS e pronto para conquistar seu próximo emprego.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href="/criar">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                    Começar Agora
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Animated illustration */
          /* simplified accents; waves already provide context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative order-1 md:order-2"
          >
            <ResumeIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ResumeIllustration() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[480px] sm:max-w-[560px]">
      {/* card */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-xl border bg-card/60 p-5 shadow-xl backdrop-blur-lg"
      >
        {/* header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-12 w-12 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600" />
          <div className="space-y-2">
            <div className="h-3 w-40 rounded bg-foreground/15" />
            <div className="h-2.5 w-24 rounded bg-foreground/10" />
          </div>
        </div>

        {/* lines */}
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ width: `${60 + (i % 3) * 10}%`, opacity: 0 }}
              animate={{ width: `${70 + (i % 3) * 10}%`, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.05 }}
              className="h-2 rounded bg-foreground/10"
            />
          ))}
        </div>

        {/* badge */}
        <motion.div
          initial={{ x: 16, y: 10, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-foreground/70"
        >
          Compatível com ATS
        </motion.div>
      </motion.div>

      {/* no floating blobs; waves handle the atmosphere */}
    </div>
  )
}
