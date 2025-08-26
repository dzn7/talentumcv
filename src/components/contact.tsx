"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function Contact() {
  return (
    <section id="contato" className="scroll-mt-24 border-t bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Fale com a gente
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-3 text-foreground/80"
          >
            Dúvidas, sugestões ou parcerias? Envie uma mensagem.
          </motion.p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Nome</label>
                <Input placeholder="Seu nome" required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">E-mail</label>
                <Input type="email" placeholder="voce@email.com" required />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Mensagem</label>
              <Textarea placeholder="Como podemos ajudar?" rows={5} required />
            </div>
            <Button type="submit" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500">
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
