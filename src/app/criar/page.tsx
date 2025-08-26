"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card } from "@/components/ui/card"
import { Sparkles, Download, FileText, FileDown, Wand2, Plus, Trash2 } from "lucide-react"
import { exportPreviewToPDF, exportDataToDocx } from "@/lib/export"

// Template configs: layout, typography and badge style
const TEMPLATES = [
  { id: "talentum", name: "Talentum", accent: "from-emerald-600 to-teal-600", layout: "one", headerClass: "font-sans", badgeClass: "rounded border px-2 py-1 text-xs" },
  { id: "minimal", name: "Minimal (2 col)", accent: "from-emerald-500 to-emerald-700", layout: "two", headerClass: "font-sans tracking-tight", badgeClass: "rounded-full border px-3 py-1 text-xs" },
  { id: "elegant", name: "Elegant (serif)", accent: "from-teal-500 to-emerald-700", layout: "one", headerClass: "font-serif", badgeClass: "rounded px-2 py-1 text-xs" },
  { id: "business", name: "Business (2 col)", accent: "from-emerald-600 to-emerald-800", layout: "two", headerClass: "font-sans", badgeClass: "rounded bg-emerald-50 text-emerald-800 px-2 py-1 text-[11px]" },
  { id: "modern", name: "Modern", accent: "from-emerald-400 to-teal-600", layout: "one", headerClass: "font-sans", badgeClass: "rounded-md border px-2 py-1 text-[11px]" },
] as const

type ExperienceItem = { role: string; company: string; period: string; description: string; bullets: string[] }

type EducationItem = { degree: string; institution: string; period: string; description?: string }

type ResumeData = {
  template: string
  name: string
  title: string
  area?: string
  roleTarget?: string
  location?: string
  email?: string
  phone?: string
  website?: string
  summary?: string
  skills: string[]
  experience: ExperienceItem[]
  education: EducationItem[]
}

export default function CreateResumePage() {
  const [data, setData] = useState<ResumeData>({
    template: TEMPLATES[0].id,
    name: "",
    title: "",
    area: "",
    roleTarget: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    summary: "",
    skills: [],
    experience: [
      { role: "", company: "", period: "", description: "", bullets: [] },
    ],
    education: [
      { degree: "", institution: "", period: "", description: "" },
    ],
  })

  const [newSkill, setNewSkill] = useState("")
  const [loadingAI, setLoadingAI] = useState(false)
  const [loadingAIKey, setLoadingAIKey] = useState<string | null>(null)
  const [aiError, setAiError] = useState<string | null>(null)
  const previewRef = useRef<HTMLDivElement | null>(null)

  const template = TEMPLATES.find(t => t.id === data.template) || TEMPLATES[0]

  async function handleAI(field: "summary" | "experience" | "skills", opts?: { index?: number }) {
    try {
      setAiError(null)
      setLoadingAI(true)
      setLoadingAIKey(field === "experience" && typeof opts?.index === "number" ? `exp-${opts.index}` : field)
      const prompt = buildPrompt(data, field, opts)
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error || `Falha na IA (${res.status})`)
      }
      const json = await res.json()
      const text = extractTextFromHF(json)
      if (field === "summary") {
        setData(prev => ({ ...prev, summary: text }))
      } else if (field === "experience") {
        // Try to add bullets to first experience
        setData(prev => {
          const idx = typeof opts?.index === "number" ? opts.index : 0
          const exp = [...prev.experience]
          exp[idx] = { ...exp[idx], bullets: text.split(/\n|•|-/).map(s => s.trim()).filter(Boolean).slice(0, 6) }
          return { ...prev, experience: exp }
        })
      } else if (field === "skills") {
        // Expect comma-separated skills
        const list = text
          .replace(/Skills?:/i, "")
          .split(/,|\n|•|;/)
          .map(s => s.trim())
          .filter((s, i, arr) => s && arr.indexOf(s) === i)
          .slice(0, 20)
        setData(prev => ({ ...prev, skills: list.length ? list : prev.skills }))
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erro inesperado"
      setAiError(msg)
    } finally {
      setLoadingAI(false)
      setLoadingAIKey(null)
    }
  }

  function extractTextFromHF(resp: unknown): string {
    // Hugging Face text generation often returns an array of { generated_text }
    if (Array.isArray(resp) && (resp as Array<{ generated_text?: string }>)[0]?.generated_text) {
      return String((resp as Array<{ generated_text?: string }>)[0]?.generated_text)
    }
    if (Array.isArray(resp) && resp[0]?.generated_text) return String(resp[0].generated_text)
    if (typeof resp === "string") return resp
    // Fallback
    return "Profissional com experiência, focado em resultados e melhoria contínua."
  }

  function buildPrompt(d: ResumeData, section: string, opts?: { index?: number }) {
    const areaTxt = d.area ? `Área: ${d.area}. ` : ""
    const funcaoTxt = d.roleTarget ? `Função alvo: ${d.roleTarget}. ` : ""
    const base = `${areaTxt}${funcaoTxt}Sou ${d.name || "[seu nome]"}, cargo atual/alvo ${d.title || "[seu cargo]"}. Local ${d.location}. Habilidades: ${(d.skills||[]).join(", ")}.`
    if (section === "summary") {
      return base + "\nEscreva um resumo profissional objetivo (3-4 linhas), estilo LinkedIn, com métricas quando possível. Adapte o tom para a área e função alvo."
    }
    if (section === "experience") {
      const idx = typeof opts?.index === "number" ? opts.index : 0
      const ex = d.experience?.[idx]
      return base + `\nEscreva bullets de impacto (máx 6) para a experiência: ${ex?.role || "[cargo]"} na ${ex?.company || "[empresa]"}. Foque em resultados relevantes para ${d.area || "a área"}.`
    }
    // skills
    return base + `\nSugira até 15 habilidades específicas e relevantes para ${d.area || "a área"} e função ${d.roleTarget || d.title || "alvo"}, separadas por vírgula.`
  }

  function addSkill() {
    if (!newSkill.trim()) return
    setData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }))
    setNewSkill("")
  }

  function removeSkill(i: number) {
    setData(prev => ({ ...prev, skills: prev.skills.filter((_, idx) => idx !== i) }))
  }

  function updateExperience(i: number, patch: Partial<ExperienceItem>) {
    setData(prev => {
      const arr = [...prev.experience]
      arr[i] = { ...arr[i], ...patch }
      return { ...prev, experience: arr }
    })
  }

  function addExperience() {
    setData(prev => ({ ...prev, experience: [...prev.experience, { role: "", company: "", period: "", description: "", bullets: [] }] }))
  }

  function removeExperience(i: number) {
    setData(prev => ({ ...prev, experience: prev.experience.filter((_, idx) => idx !== i) }))
  }

  function updateEducation(i: number, patch: Partial<EducationItem>) {
    setData(prev => {
      const arr = [...prev.education]
      arr[i] = { ...arr[i], ...patch }
      return { ...prev, education: arr }
    })
  }

  function addEducation() {
    setData(prev => ({ ...prev, education: [...prev.education, { degree: "", institution: "", period: "", description: "" }] }))
  }

  function removeEducation(i: number) {
    setData(prev => ({ ...prev, education: prev.education.filter((_, idx) => idx !== i) }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8 text-center sm:text-left"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2">Criar Currículo</h1>
          <p className="text-sm sm:text-base text-foreground/70">Preencha suas informações e gere um currículo profissional</p>
        </motion.div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => previewRef.current && exportPreviewToPDF(previewRef.current)}>
            <Download className="mr-2 h-4 w-4" /> PDF
          </Button>
          <Button variant="outline" onClick={() => exportDataToDocx(data)}>
            <FileDown className="mr-2 h-4 w-4" /> DOCX
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_0.9fr]">
          {/* Left: form */}
          <Card className="p-5">
            <Tabs defaultValue="perfil">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
                <TabsList>
                  <TabsTrigger value="perfil">Perfil</TabsTrigger>
                  <TabsTrigger value="experiencia">Experiência</TabsTrigger>
                  <TabsTrigger value="formacao">Formação</TabsTrigger>
                  <TabsTrigger value="habilidades">Habilidades</TabsTrigger>
                  <TabsTrigger value="template">Template</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleAI("summary")} disabled={loadingAI}>
                    <span className="text-xs sm:text-sm">{loadingAI ? "Gerando..." : "Resumo IA"}</span>
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleAI("experience")} disabled={loadingAI}>
                    <Sparkles className="mr-2 h-4 w-4" /> Bullets IA
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleAI("skills")} disabled={loadingAI}>
                    <Sparkles className="mr-2 h-4 w-4" /> Skills IA
                  </Button>
                </div>
              </div>
            </Tabs>
          </Card>
          
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-4">
              <h2 className="text-lg sm:text-xl font-semibold">Visualização</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" size="sm" onClick={() => previewRef.current && exportPreviewToPDF(previewRef.current)} className="w-full sm:w-auto">
                  <FileText className="mr-1 sm:mr-2 h-3.5 w-3.5" /> <span className="text-xs sm:text-sm">PDF</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => exportDataToDocx(data)} className="w-full sm:w-auto">
                  <FileDown className="mr-1 sm:mr-2 h-3.5 w-3.5" /> <span className="text-xs sm:text-sm">DOCX</span>
                </Button>
              </div>
            </div>

            <motion.div ref={previewRef} layout data-pdf-preview="1" className="mx-auto w-full max-w-[800px] rounded-lg border bg-white p-4 sm:p-6 lg:p-8 shadow-sm overflow-auto">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className={`text-2xl font-bold tracking-tight ${template.headerClass}`}>{data.name || "Seu Nome"}</h2>
                  <p className={`text-sm text-neutral-600 ${template.headerClass}`}>{data.title || "Seu título profissional"}</p>
                </div>
                <div className={`h-1.5 w-40 rounded bg-gradient-to-r ${template.accent}`} />
              </div>

              <Separator className="my-4" />

              {template.layout === "two" ? (
                <div className="mt-2 grid gap-6 md:grid-cols-[0.35fr_1fr]">
                  <div>
                    <div className="space-y-4">
                      {/* Contacts left */}
                      <div>
                        <h3 className="text-sm font-semibold tracking-tight">Contato</h3>
                        <div className="mt-1 flex flex-col gap-1 text-xs text-neutral-700">
                          {data.location && <span>{data.location}</span>}
                          {data.email && <span>{data.email}</span>}
                          {data.phone && <span>{data.phone}</span>}
                          {data.website && <span>{data.website}</span>}
                        </div>
                      </div>
                      {/* Skills left */}
                      {data.skills.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold tracking-tight">Habilidades</h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {data.skills.map((s, i) => (
                              <span key={i} className={`${template.badgeClass} text-neutral-800`}>{s}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {/* Summary right */}
                    {data.summary && (
                      <div className="mt-2">
                        <h3 className="text-sm font-semibold tracking-tight">Resumo</h3>
                        <p className="mt-1 text-sm text-neutral-800 leading-relaxed">{data.summary}</p>
                      </div>
                    )}
                    {/* Experience right */}
                    {data.experience.some(e => e.role || e.company || e.description || (e.bullets && e.bullets.length)) && (
                      <div className="mt-6">
                        <h3 className="text-sm font-semibold tracking-tight">Experiência</h3>
                        <div className="mt-2 space-y-4">
                          {data.experience.map((exp, i) => (
                            <div key={i}>
                              {(exp.role || exp.company) && (
                                <p className="text-sm font-medium text-neutral-900">{exp.role}{exp.company ? ` — ${exp.company}` : ""}</p>
                              )}
                              {exp.period && <p className="text-xs text-neutral-600">{exp.period}</p>}
                              {exp.description && <p className="mt-1 text-sm text-neutral-800">{exp.description}</p>}
                              {exp.bullets?.length ? (
                                <ul className="mt-1 list-disc pl-5 text-sm text-neutral-800">
                                  {exp.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                                </ul>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Education right */}
                    {data.education.some(e => e.degree || e.institution) && (
                      <div className="mt-6">
                        <h3 className="text-sm font-semibold tracking-tight">Formação</h3>
                        <div className="mt-2 space-y-3">
                          {data.education.map((ed, i) => (
                            <div key={i}>
                              {(ed.degree || ed.institution) && (
                                <p className="text-sm font-medium text-neutral-900">{ed.degree}{ed.institution ? ` — ${ed.institution}` : ""}</p>
                              )}
                              {ed.period && <p className="text-xs text-neutral-600">{ed.period}</p>}
                              {ed.description && <p className="mt-1 text-sm text-neutral-800">{ed.description}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {/* Contacts */}
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-neutral-700">
                    {data.location && <span>{data.location}</span>}
                    {data.email && <span>{data.email}</span>}
                    {data.phone && <span>{data.phone}</span>}
                    {data.website && <span>{data.website}</span>}
                  </div>
                  {/* Summary */}
                  {data.summary && (
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold tracking-tight">Resumo</h3>
                      <p className="mt-1 text-sm text-neutral-800 leading-relaxed">{data.summary}</p>
                    </div>
                  )}
                  {/* Experience */}
                  {data.experience.some(e => e.role || e.company || e.description || (e.bullets && e.bullets.length)) && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold tracking-tight">Experiência</h3>
                      <div className="mt-2 space-y-4">
                        {data.experience.map((exp, i) => (
                          <div key={i}>
                            {(exp.role || exp.company) && (
                              <p className="text-sm font-medium text-neutral-900">{exp.role}{exp.company ? ` — ${exp.company}` : ""}</p>
                            )}
                            {exp.period && <p className="text-xs text-neutral-600">{exp.period}</p>}
                            {exp.description && <p className="mt-1 text-sm text-neutral-800">{exp.description}</p>}
                            {exp.bullets?.length ? (
                              <ul className="mt-1 list-disc pl-5 text-sm text-neutral-800">
                                {exp.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                              </ul>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Education */}
                  {data.education.some(e => e.degree || e.institution) && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold tracking-tight">Formação</h3>
                      <div className="mt-2 space-y-3">
                        {data.education.map((ed, i) => (
                          <div key={i}>
                            {(ed.degree || ed.institution) && (
                              <p className="text-sm font-medium text-neutral-900">{ed.degree}{ed.institution ? ` — ${ed.institution}` : ""}</p>
                            )}
                            {ed.period && <p className="text-xs text-neutral-600">{ed.period}</p>}
                            {ed.description && <p className="mt-1 text-sm text-neutral-800">{ed.description}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Skills */}
                  {data.skills.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold tracking-tight">Habilidades</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {data.skills.map((s, i) => (
                          <span key={i} className={`${template.badgeClass} text-neutral-800`}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Footer accent */}
              <div className="mt-8">
                <div className={`h-1 w-24 rounded bg-gradient-to-r ${template.accent}`} />
              </div>
            </motion.div>
          </Card>
        </div>
      </div>
    </div>
  )
}
