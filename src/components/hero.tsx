"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
// Minimal hero without heavy decorative blobs

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Minimal, Lume-like neutral background with subtle dots */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        {/* Subtle top gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,185,129,0.06),transparent_35%)]" />
        {/* Softer dots */}
        <div className="absolute inset-0 opacity-[0.22]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.055) 1px, transparent 0)",
          backgroundSize: "22px 22px"
        }} />
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
                Seu currículo pronto em <span className="bg-gradient-to-r from-black to-neutral-700 bg-clip-text text-transparent">minutos</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-[54ch] leading-relaxed">
                Estilizado, compatível com ATS e pronto para conquistar seu próximo emprego.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href="/criar">
                  <Button size="lg" className="bg-gradient-to-r from-black to-neutral-800 text-white hover:from-neutral-900 hover:to-black shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                    Começar Agora
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Animated illustration */}
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

      {/* floating accents */}
      <motion.div
        className="absolute -top-6 -right-6 h-16 w-16 rounded-lg bg-gradient-to-br from-black to-neutral-700 opacity-50 blur"
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-gradient-to-br from-neutral-900 to-black opacity-40 blur"
        animate={{ y: [0, 12, 0], x: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </div>
  )
}
