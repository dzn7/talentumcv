"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const links = [
    { href: "#inicio", label: "Início" },
    { href: "#como-funciona", label: "Como Funciona" },
    { href: "/criar", label: "Gerar Currículo" },
    { href: "#sugestoes", label: "Sugestões" },
    { href: "#sobre", label: "Sobre" },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
        <Link href="#inicio" className="flex items-center gap-2" aria-label="Talentum - Início">
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
        </Link>

        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {links.map((l) => (
                <NavigationMenuItem key={l.href}>
                  <Link
                    href={l.href}
                    className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="hidden md:block">
          <Link href="/criar">
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              Criar Currículo
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" aria-label="Menu">
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-3">
                {links.map((l) => (
                  <Link key={l.href} href={l.href} className="text-base">
                    {l.label}
                  </Link>
                ))}
                <Link href="/criar">
                  <Button className="mt-2 w-full bg-foreground text-background hover:bg-foreground/90">
                    Criar Currículo
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
