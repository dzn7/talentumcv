import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx"

type ExperienceItem = { role: string; company: string; period: string; description?: string; bullets?: string[] }
type EducationItem = { degree: string; institution: string; period: string; description?: string }
export type ResumeDocData = {
  name?: string
  title?: string
  summary?: string
  experience?: ExperienceItem[]
  education?: EducationItem[]
  skills?: string[]
}

export async function exportPreviewToPDF(previewEl: HTMLElement, filename = "talentum-curriculo.pdf") {
  if (!previewEl) return
  const canvas = await html2canvas(previewEl, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,
    allowTaint: false,
    logging: false,
    windowWidth: previewEl.scrollWidth,
    foreignObjectRendering: true,
    // Override CSS vars in the cloned DOM to avoid lab/oklch during parsing
    onclone: (clonedDoc) => {
      try {
        const target = clonedDoc.querySelector('[data-pdf-preview="1"]') as HTMLElement | null
        if (target) {
          target.classList.add("pdf-snapshot")
          // Ensure inline fallbacks at the container level too
          target.style.background = "#ffffff"
          target.style.backgroundColor = "#ffffff"
          target.style.color = "#111111"
        }
        const style = clonedDoc.createElement("style")
        style.textContent = `
          :root, html, body {
            --background: #ffffff !important;
            --foreground: #111111 !important;
            --card: #ffffff !important;
            --card-foreground: #111111 !important;
            --popover: #ffffff !important;
            --popover-foreground: #111111 !important;
            --primary: #111111 !important;
            --primary-foreground: #f9fafb !important;
            --secondary: #f3f4f6 !important;
            --secondary-foreground: #111111 !important;
            --muted: #f3f4f6 !important;
            --muted-foreground: #6b7280 !important;
            --accent: #f3f4f6 !important;
            --accent-foreground: #111111 !important;
            --destructive: #ef4444 !important;
            --border: #e5e7eb !important;
            --input: #e5e7eb !important;
            --ring: #9ca3af !important;
          }
          .pdf-snapshot, .pdf-snapshot *,
          .pdf-snapshot *::before, .pdf-snapshot *::after,
          .pdf-snapshot::before, .pdf-snapshot::after {
            /* Replace CSS variables that may resolve to oklch/lab with hex/rgb fallbacks */
            --background: #ffffff !important;
            --foreground: #111111 !important;
            --card: #ffffff !important;
            --card-foreground: #111111 !important;
            --popover: #ffffff !important;
            --popover-foreground: #111111 !important;
            --primary: #111111 !important;
            --primary-foreground: #f9fafb !important;
            --secondary: #f3f4f6 !important;
            --secondary-foreground: #111111 !important;
            --muted: #f3f4f6 !important;
            --muted-foreground: #6b7280 !important;
            --accent: #f3f4f6 !important;
            --accent-foreground: #111111 !important;
            --destructive: #ef4444 !important;
            --border: #e5e7eb !important;
            --input: #e5e7eb !important;
            --ring: #9ca3af !important;
            /* Hard neutralization to avoid parsing unsupported color() in computed styles */
            background: #ffffff !important;
            background-color: #ffffff !important;
            background-image: none !important;
            box-shadow: none !important;
            outline: none !important;
          }
        `
        clonedDoc.head.appendChild(style)
      } catch {}
    }
  })
  const imgData = canvas.toDataURL("image/png")
  const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" })

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  const imgWidth = pageWidth
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  let position = 0
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)

  // Handle multi-page if needed
  let heightLeft = imgHeight - pageHeight
  while (heightLeft > 0) {
    position = heightLeft - imgHeight
    pdf.addPage()
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }

  pdf.save(filename)
}

export async function exportDataToDocx(data: ResumeDocData, filename = "talentum-curriculo.docx") {
  // Basic DOCX structure from data
  const {
    name,
    title,
    summary,
    experience = [],
    education = [],
    skills = [],
  } = data || {}

  const children: Paragraph[] = []

  children.push(
    new Paragraph({
      text: name || "",
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      text: title || "",
      heading: HeadingLevel.HEADING_3,
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({ text: " " })
  )

  if (summary) {
    children.push(new Paragraph({
      children: [new TextRun({ text: "Resumo", bold: true })],
    }))
    children.push(new Paragraph(summary))
    children.push(new Paragraph({ text: " " }))
  }

  if (experience?.length) {
    children.push(new Paragraph({ children: [new TextRun({ text: "Experiência", bold: true })] }))
    experience.forEach((exp: ExperienceItem) => {
      children.push(new Paragraph({ children: [new TextRun({ text: `${exp.role || ""} — ${exp.company || ""}`, bold: true })] }))
      if (exp.period) children.push(new Paragraph({ text: exp.period }))
      if (exp.description) children.push(new Paragraph({ text: exp.description }))
      if (exp.bullets?.length) {
        exp.bullets.forEach((b: string) => children.push(new Paragraph({ text: `• ${b}` })))
      }
      children.push(new Paragraph({ text: " " }))
    })
  }

  if (education?.length) {
    children.push(new Paragraph({ children: [new TextRun({ text: "Formação", bold: true })] }))
    education.forEach((ed: EducationItem) => {
      children.push(new Paragraph({ children: [new TextRun({ text: `${ed.degree || ""} — ${ed.institution || ""}`, bold: true })] }))
      if (ed.period) children.push(new Paragraph({ text: ed.period }))
      if (ed.description) children.push(new Paragraph({ text: ed.description }))
      children.push(new Paragraph({ text: " " }))
    })
  }

  if (skills?.length) {
    children.push(new Paragraph({ children: [new TextRun({ text: "Habilidades", bold: true })] }))
    children.push(new Paragraph(skills.join(", ")))
  }

  const doc = new Document({ sections: [{ children }] })
  const blob = await Packer.toBlob(doc)
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}
