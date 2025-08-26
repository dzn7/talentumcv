"use client"
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"

const templates = [
  { name: "Moderno", accent: "from-emerald-500 to-teal-500" },
  { name: "Minimalista", accent: "from-teal-500 to-emerald-700" },
  { name: "Elegante", accent: "from-emerald-400 to-emerald-700" },
]

export function Demo() {
  return (
    <section id="demonstracao" className="scroll-mt-24 border-t bg-gradient-to-b from-background/60 to-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Prévia de Templates
          </h2>
          <p className="mt-3 text-foreground/80">
            Explore diferentes estilos. Escolha o que melhor representa você.
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-5xl">
          <Carousel opts={{ loop: true }} className="px-12">
            <CarouselContent>
              {templates.map((t) => (
                <CarouselItem key={t.name} className="md:basis-1/2 lg:basis-1/3">
                  <TemplateCard name={t.name} accent={t.accent} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

function TemplateCard({ name, accent }: { name: string; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group relative overflow-hidden rounded-xl border bg-card/70 p-4 shadow-lg backdrop-blur">
        <div className={`absolute inset-x-6 -top-16 h-40 rounded-full bg-gradient-to-r ${accent} opacity-30 blur-3xl`} />
        <div className="relative aspect-[3/4] rounded-lg border bg-background">
          {/* Header */}
          <div className="flex items-center gap-3 p-4">
            <div className={`h-10 w-10 rounded-md bg-gradient-to-br ${accent}`} />
            <div className="space-y-2">
              <div className="h-3 w-32 rounded bg-foreground/15" />
              <div className="h-2 w-24 rounded bg-foreground/10" />
            </div>
          </div>
          {/* Body lines */}
          <div className="space-y-2 px-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-2 rounded bg-foreground/10 w-[70%]" />
            ))}
          </div>
          {/* Sidebar */}
          <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-foreground/10 to-transparent" />
        </div>
        <div className="relative mt-4 flex items-center justify-between">
          <p className="text-sm font-medium">{name}</p>
          <span className="text-xs text-foreground/60">Compatível com ATS</span>
        </div>
      </Card>
    </motion.div>
  )
}
