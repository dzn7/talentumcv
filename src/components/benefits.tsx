"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ShieldCheck, Sparkles, FileDown, Wand2 } from "lucide-react"

const benefits = [
  {
    icon: ShieldCheck,
    title: "Compatível com ATS",
    desc: "Formatos e estrutura otimizados para sistemas de rastreamento de candidatos.",
  },
  {
    icon: Sparkles,
    title: "Design Profissional",
    desc: "Templates criados para destacar suas conquistas com clareza e elegância.",
  },
  {
    icon: FileDown,
    title: "Exportação PDF/Word",
    desc: "Baixe seu currículo nos formatos mais utilizados pelo mercado.",
  },
  {
    icon: Wand2,
    title: "IA que melhora seu texto",
    desc: "Sugestões inteligentes para aprimorar descrições e resultados.",
  },
]

export function Benefits() {
  return (
    <section id="beneficios" className="scroll-mt-24 border-t bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Benefícios
          </h2>
          <p className="mt-3 text-foreground/80">
            Recursos pensados para aumentar suas chances de aprovação.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Card className="h-full rounded-xl border bg-card/70 p-6 shadow-sm backdrop-blur">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold">{b.title}</h3>
                <p className="mt-1 text-sm text-foreground/70">{b.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
