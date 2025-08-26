"use client"

import { motion } from "framer-motion"
import { Briefcase, Palette, Download } from "lucide-react"

const steps = [
  {
    icon: Briefcase,
    title: "Informe sua experiência",
    desc: "Conte-nos sobre suas experiências, habilidades e objetivos.",
  },
  {
    icon: Palette,
    title: "Escolha um estilo",
    desc: "Selecione entre modelos modernos e profissionais.",
  },
  {
    icon: Download,
    title: "Baixe seu currículo",
    desc: "Exportação rápida em PDF e Word, pronto para enviar.",
  },
]

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-24 border-t bg-gradient-to-b from-background via-background to-background/60"
    >
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Como Funciona
          </h2>
          <p className="mt-3 text-foreground/80">
            Três passos simples para um currículo impecável.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-xl border bg-card/60 p-6 backdrop-blur-md shadow-sm"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-foreground/70">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
