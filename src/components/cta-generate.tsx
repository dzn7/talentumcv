"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CtaGenerate() {
  return (
    <section id="gerar" className="relative overflow-hidden">
      {/* Minimal neutral background, aligned with hero */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 opacity-[0.25]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0)",
          backgroundSize: "20px 20px"
        }} />
        <div className="absolute top-0 left-0 right-0 mx-auto h-px w-[92%] bg-foreground/10" />
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border bg-card p-8 text-center shadow-sm">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-2xl md:text-3xl font-bold tracking-tight"
          >
            Crie seu currículo agora
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-2 text-foreground/80"
          >
            Comece gratuitamente e gere um currículo profissional em poucos minutos.
          </motion.p>
          <div className="mt-6 flex justify-center">
            <Link href="/criar">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                Criar Currículo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
