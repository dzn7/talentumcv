"use client"

import { motion } from "framer-motion"

export function About() {
  return (
    <section id="sobre" className="scroll-mt-24 border-t bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Sobre mim
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-4 text-foreground/80 leading-relaxed"
          >
            Criado por um único desenvolvedor: <strong>Derick Mackenzei Abreu Castelo Branco</strong>.
            Atualmente curso <strong>Ciência da Computação</strong> na <strong>UNINASSAU</strong>, em Teresina, Piauí. A Talentum nasceu
            da vontade de facilitar a criação de currículos profissionais, focando no que é essencial: clareza,
            objetividade e um visual minimalista que destaca resultados. Eu projetei e desenvolvi a plataforma do zero,
            unindo <em>design system</em> enxuto, responsividade e integração com IA para acelerar a escrita de resumos,
            bullets de experiência e habilidades relevantes.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-4 text-foreground/70"
          >
            Minha missão é entregar uma experiência simples, rápida e com aparência profissional — inspirada em
            interfaces minimalistas como a Lume.
          </motion.p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="https://www.linkedin.com/in/derick-mackenzie-0a829b380/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center justify-center rounded-md border p-2 text-foreground/80 hover:text-foreground"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4"><path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v1.98h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.5c0-1.55-.03-3.55-2.17-3.55-2.18 0-2.51 1.7-2.51 3.44V23h-4V8.5z"/></svg>
            </a>
            <a
              href="https://instagram.com/derick.mackenzie"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center justify-center rounded-md border p-2 text-foreground/80 hover:text-foreground"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4"><path fill="currentColor" d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.51 5.51 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zm5.75-3.5a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 17.75 6z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
