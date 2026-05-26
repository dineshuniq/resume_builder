import { useEffect, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { useResumeStore } from "@/store/resumeStore";
import { getTemplateComponent, templateNames, templateCategories, totalTemplates } from "@/templates";
import type { ResumeData } from "@/types/resume";
import PersonalInfoForm from "@/components/form/PersonalInfoForm";
import SummaryForm from "@/components/form/SummaryForm";
import ExperienceForm from "@/components/form/ExperienceForm";
import EducationForm from "@/components/form/EducationForm";
import SkillsForm from "@/components/form/SkillsForm";
import LanguagesForm from "@/components/form/LanguagesForm";
import CertificationsForm from "@/components/form/CertificationsForm";
import PagedResumePreview from "@/components/resume/PagedResumePreview";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  Languages,
  Award,
  Download,
  Eye,
  Layout,
  Palette,
  Info,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

function FormSection({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={18} className="text-indigo-500" />
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="pl-0 sm:pl-6">{children}</div>
      <Separator className="mt-6" />
    </div>
  );
}

function getResumeBaseName(name: string) {
  const safeName = name.trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "_") || "candidate";
  return `resume_${safeName}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildWordDocument(data: ResumeData) {
  const personal = data.personalInfo;
  const contact = [personal.email, personal.phone, personal.location, personal.linkedin, personal.website]
    .filter(Boolean)
    .map(escapeHtml)
    .join(" | ");

  const sections = [
    `<h1>${escapeHtml(personal.fullName || "Resume")}</h1>`,
    personal.title ? `<h2>${escapeHtml(personal.title)}</h2>` : "",
    contact ? `<p class="contact">${contact}</p>` : "",
    data.summary ? `<h3>Professional Summary</h3><p>${escapeHtml(data.summary)}</p>` : "",
    data.experience.length
      ? `<h3>Experience</h3>${data.experience.map((exp) => `
          <div class="item">
            <h4>${escapeHtml(exp.role)} - ${escapeHtml(exp.company)}</h4>
            <p><strong>${escapeHtml(exp.from)} - ${escapeHtml(exp.current ? "Present" : exp.to)}</strong>${exp.location ? ` | ${escapeHtml(exp.location)}` : ""}</p>
            ${exp.projects.map((project) => `
              <p><strong>${escapeHtml(project.title)}</strong></p>
              <ul>${project.bullets.filter(Boolean).map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>
            `).join("")}
          </div>
        `).join("")}`
      : "",
    data.education.length
      ? `<h3>Education</h3>${data.education.map((edu) => `
          <div class="item">
            <h4>${escapeHtml(edu.degree)}</h4>
            <p>${escapeHtml(edu.institution)}${edu.year ? ` | ${escapeHtml(edu.year)}` : ""}${edu.score ? ` | ${escapeHtml(edu.score)}` : ""}</p>
          </div>
        `).join("")}`
      : "",
    data.skills.length
      ? `<h3>Skills</h3><p>${data.skills.map((skill) => escapeHtml(skill.name)).join(", ")}</p>`
      : "",
    data.languages.length
      ? `<h3>Languages</h3><p>${data.languages.map((language) => `${escapeHtml(language.name)} (${escapeHtml(language.proficiency)})`).join(", ")}</p>`
      : "",
    data.certifications.length
      ? `<h3>Certifications</h3><ul>${data.certifications.map((cert) => `<li>${escapeHtml(cert.name)} - ${escapeHtml(cert.organization)}${cert.year ? `, ${escapeHtml(cert.year)}` : ""}</li>`).join("")}</ul>`
      : "",
  ].join("");

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(getResumeBaseName(personal.fullName))}</title>
  <style>
    body { color: #111827; font-family: Arial, sans-serif; line-height: 1.45; margin: 36pt; }
    h1 { font-size: 24pt; margin: 0; }
    h2 { color: #4b5563; font-size: 13pt; font-weight: normal; margin: 4pt 0 8pt; }
    h3 { border-bottom: 1px solid #d1d5db; font-size: 12pt; margin: 18pt 0 8pt; padding-bottom: 3pt; text-transform: uppercase; }
    h4 { font-size: 11pt; margin: 8pt 0 2pt; }
    p { margin: 3pt 0; }
    ul { margin: 3pt 0 8pt 18pt; padding: 0; }
    .contact { color: #4b5563; }
    .item { margin-bottom: 10pt; }
  </style>
</head>
<body>${sections}</body>
</html>`;
}

function TemplateGallery({ onSelect, currentData }: { onSelect: () => void; currentData: ResumeData }) {
  const { selectedTemplate, setSelectedTemplate } = useResumeStore();
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");

  const filteredTemplates = activeCategory === "all"
    ? Object.keys(templateNames).map(Number)
    : templateCategories[activeCategory] || [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={activeCategory === "all" ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setActiveCategory("all")}
        >
          All ({Object.keys(templateNames).length})
        </Badge>
        {Object.entries(templateCategories).map(([cat, nums]) => (
          <Badge
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveCategory(cat)}
          >
            {cat} ({nums.length})
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto pr-2 sm:grid-cols-4">
        {filteredTemplates.map((num) => {
          const Template = getTemplateComponent(num);
          return (
            <button
              key={num}
              onClick={() => { setSelectedTemplate(num); onSelect(); }}
              className={`relative border-2 rounded-lg overflow-hidden transition-all hover:shadow-md ${
                selectedTemplate === num ? "border-indigo-500 ring-2 ring-indigo-100" : "border-gray-200"
              }`}
            >
              <div className="aspect-[210/297] bg-white overflow-hidden">
                <div style={{ transform: "scale(0.16)", transformOrigin: "top left", width: "625%", height: "625%" }}>
                  <Template data={currentData} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-white text-xs font-medium truncate">{num}. {templateNames[num]}</p>
              </div>
              {selectedTemplate === num && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const { resumeData, selectedTemplate, setSelectedTemplate, mobileTab, setMobileTab, resetToDefault } = useResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [isLayoutNoticeOpen, setIsLayoutNoticeOpen] = useState(true);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLayoutNoticeOpen(false), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  const handleDownloadPdf = async () => {
    const source = resumeRef.current;
    if (!source || isExportingPdf) return;

    setIsExportingPdf(true);
    source.classList.add("resume-pdf-capture");

    try {
      await document.fonts?.ready;
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const sheets = Array.from(source.querySelectorAll<HTMLElement>(".resume-page-sheet"));
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });

      for (const [index, sheet] of sheets.entries()) {
        const canvas = await html2canvas(sheet, {
          backgroundColor: null,
          scale: 2,
          useCORS: true,
          windowWidth: sheet.scrollWidth,
          windowHeight: sheet.scrollHeight,
        });

        if (index > 0) pdf.addPage("a4", "portrait");
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297, undefined, "FAST");
      }

      pdf.save(`${getResumeBaseName(resumeData.personalInfo.fullName)}.pdf`);
    } finally {
      source.classList.remove("resume-pdf-capture");
      setIsExportingPdf(false);
    }
  };

  const handleDownloadWord = () => {
    const html = buildWordDocument(resumeData);
    const blob = new Blob([html], { type: "application/msword;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${getResumeBaseName(resumeData.personalInfo.fullName)}.doc`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const Template = getTemplateComponent(selectedTemplate);

  const goToTemplate = (dir: number) => {
    const next = selectedTemplate + dir;
    if (next >= 1 && next <= totalTemplates) setSelectedTemplate(next);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Analytics />
      {/* Header */}
      <header className="bg-white border-b shadow-sm z-50 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Layout size={20} className="text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-gray-900 text-lg leading-tight">Dinesh's Resume Builder</h1>
              <p className="text-xs text-gray-500">{templateNames[selectedTemplate]}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Template Navigation */}
            <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Button variant="ghost" size="sm" onClick={() => goToTemplate(-1)} disabled={selectedTemplate <= 1} className="h-8 w-8 p-0">
                <ChevronLeft size={16} />
              </Button>
              <span className="text-xs font-medium px-2">{selectedTemplate}/{totalTemplates}</span>
              <Button variant="ghost" size="sm" onClick={() => goToTemplate(1)} disabled={selectedTemplate >= totalTemplates} className="h-8 w-8 p-0">
                <ChevronRight size={16} />
              </Button>
            </div>

            {/* Template Gallery */}
            <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Palette size={14} /> Templates
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Choose a Template ({Object.keys(templateNames).length} available)</DialogTitle>
                  <DialogDescription className="sr-only">
                    Select a resume template. The preview preserves A4 page boundaries and print pagination.
                  </DialogDescription>
                </DialogHeader>
                <TemplateGallery onSelect={() => setShowTemplateDialog(false)} currentData={resumeData} />
              </DialogContent>
            </Dialog>

            <div className="flex items-center gap-1">
              <Button onClick={handleDownloadPdf} disabled={isExportingPdf} size="sm" title="Download PDF" aria-label="Download PDF" className="gap-1 bg-indigo-600 px-2 hover:bg-indigo-700">
                <Download size={14} /> {isExportingPdf ? "..." : "PDF"}
              </Button>
              <Button onClick={handleDownloadWord} size="sm" variant="outline" title="Download Word" aria-label="Download Word" className="gap-1 px-2">
                <FileText size={14} /> DOC
              </Button>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-expanded={isLayoutNoticeOpen}
          onClick={() => setIsLayoutNoticeOpen((isOpen) => !isOpen)}
          className="w-full border-t bg-amber-50 px-4 py-2 text-left text-amber-950 transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-inset"
        >
          <div className="flex items-start gap-2 text-[11px] leading-relaxed md:text-xs">
            <Info size={15} className="mt-0.5 shrink-0 text-amber-600" />
            <p className={isLayoutNoticeOpen ? "" : "line-clamp-1"}>
              If the template looks messy or broken when you first add your info, don't worry - it isn't a glitch. Templates are built with strict spacing, so adding a long job title or an extra sentence can easily push things out of line or accidentally create an empty second page. It just takes a little experimenting to make it look right. Try shortening a few words, cutting down your bullet points, or adjusting the tool's margins to snap the design back into place.
            </p>
          </div>
        </button>

        <div className="md:hidden flex items-center justify-center gap-2 border-t bg-white px-3 py-2">
          <Button variant="outline" size="sm" onClick={() => goToTemplate(-1)} disabled={selectedTemplate <= 1} className="h-8 w-8 p-0">
            <ChevronLeft size={16} />
          </Button>
          <button
            type="button"
            onClick={() => setShowTemplateDialog(true)}
            className="min-w-0 flex-1 truncate rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
          >
            {selectedTemplate}/{totalTemplates} · {templateNames[selectedTemplate]}
          </button>
          <Button variant="outline" size="sm" onClick={() => goToTemplate(1)} disabled={selectedTemplate >= totalTemplates} className="h-8 w-8 p-0">
            <ChevronRight size={16} />
          </Button>
        </div>

        {/* Mobile Tabs */}
        <div className="md:hidden flex border-t">
          <button
            onClick={() => setMobileTab("form")}
            className={`flex-1 py-2 text-sm font-medium flex items-center justify-center gap-2 ${mobileTab === "form" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
          >
            <User size={14} /> Form
          </button>
          <button
            onClick={() => setMobileTab("preview")}
            className={`flex-1 py-2 text-sm font-medium flex items-center justify-center gap-2 ${mobileTab === "preview" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
          >
            <Eye size={14} /> Preview
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-0 flex-1 flex overflow-hidden">
        {/* Form Panel */}
        <div className={`${mobileTab === "form" ? "flex" : "hidden"} md:flex min-h-0 w-full md:w-[45%] lg:w-[40%] bg-white border-r flex-col`}>
          <ScrollArea className="min-h-0 flex-1">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Resume Information</h2>
                <Button variant="ghost" size="sm" onClick={resetToDefault} className="text-gray-400 hover:text-gray-600">
                  <RotateCcw size={14} />
                </Button>
              </div>

              <FormSection title="Personal Information" icon={User}>
                <PersonalInfoForm />
              </FormSection>

              <FormSection title="Professional Summary" icon={FileText}>
                <SummaryForm />
              </FormSection>

              <FormSection title="Experience" icon={Briefcase}>
                <ExperienceForm />
              </FormSection>

              <FormSection title="Education" icon={GraduationCap}>
                <EducationForm />
              </FormSection>

              <FormSection title="Skills" icon={Wrench}>
                <SkillsForm />
              </FormSection>

              <FormSection title="Languages" icon={Languages}>
                <LanguagesForm />
              </FormSection>

              <FormSection title="Certifications" icon={Award}>
                <CertificationsForm />
              </FormSection>
            </div>
          </ScrollArea>
        </div>

        {/* Preview Panel */}
        <div className={`${mobileTab === "preview" ? "flex" : "hidden"} md:flex flex-1 bg-gray-200 p-3 md:p-4 lg:p-6 overflow-auto`}>
          <PagedResumePreview Template={Template} data={resumeData} printRef={resumeRef} />
        </div>
      </div>
    </div>
  );
}
