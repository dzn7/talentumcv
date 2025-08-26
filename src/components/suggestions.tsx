"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function Suggestions() {
  return (
    <section id="sugestoes" className="scroll-mt-24 border-t bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              Sugestões e melhorias
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mt-3 text-foreground/80"
            >
              Tem alguma ideia para deixar a Talentum ainda melhor? Envie sua sugestão.
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            action="https://formspree.io/f/mrbknzrg"
            method="POST"
            className="mt-8 space-y-4 rounded-lg border bg-card p-4 md:p-6"
          >
            <input type="hidden" name="origin" value="talentum-suggestions" />
            <div className="grid gap-4 md:grid-cols-2">
              <Input name="name" placeholder="Seu nome" required />
              <Input name="email" type="email" placeholder="Seu e-mail" required />
            </div>
            <Input name="subject" placeholder="Assunto (opcional)" />
            <Textarea name="message" placeholder="Descreva sua ideia, problema ou melhoria desejada" rows={6} required />
            <div className="flex justify-end">
              <Button type="submit" className="bg-foreground text-background hover:bg-foreground/90">Enviar sugestão</Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
