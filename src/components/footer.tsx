import Link from "next/link"
import { Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              {/* Minimal logo (SVG) */}
              <svg
                aria-label="Talentum"
                className="h-6 w-6 sm:h-7 sm:w-7 text-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3.5" y="4" width="17" height="16" rx="5" />
                <path d="M7 9h8" />
                <path d="M7 14.5v0" />
                <path d="M10.25 13.25v2.5" />
                <path d="M13 12.75v3" />
                <path d="M15.75 13.25v2.5" />
              </svg>
            </div>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-foreground/70 max-w-sm">
              Gere currículos modernos com IA, prontos para sistemas ATS e focados em resultados.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:justify-self-center">
            <div>
              <h4 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">Produto</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-foreground/70">
                <li><Link href="/criar" className="hover:text-foreground transition-colors">Gerar Currículo</Link></li>
                <li><Link href="#como-funciona" className="hover:text-foreground transition-colors">Como Funciona</Link></li>
                <li><Link href="#sugestoes" className="hover:text-foreground transition-colors">Sugestões</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">Empresa</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-foreground/70">
                <li><Link href="#sobre" className="hover:text-foreground transition-colors">Sobre</Link></li>
              </ul>
            </div>
          </div>

          <div className="md:justify-self-end">
            <p className="text-sm font-semibold">Redes sociais</p>
            <div className="mt-2 flex gap-3 text-foreground/70">
              <a href="https://www.linkedin.com/in/derick-mackenzie-0a829b380/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/derick.mackenzie" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-xs text-foreground/60 flex flex-col sm:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} Talentum. Todos os direitos reservados.</p>
          <p className="mt-2 sm:mt-0">Feito com Next.js, Tailwind, shadcn/ui e Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}
