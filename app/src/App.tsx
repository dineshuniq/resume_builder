import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
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

      <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
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
              <div className="aspect-[210/297] bg-white overflow-hidden" style={{ transform: "scale(0.22)", transformOrigin: "top left", width: "454%", height: "454%" }}>
                <Template data={currentData} />
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

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume`,
    pageStyle: `
      @page {
        size: 210mm 297mm;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `,
  });

  const Template = getTemplateComponent(selectedTemplate);

  const goToTemplate = (dir: number) => {
    const next = selectedTemplate + dir;
    if (next >= 1 && next <= totalTemplates) setSelectedTemplate(next);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm z-50 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Layout size={20} className="text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-gray-900 text-lg leading-tight">Resume Builder</h1>
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

            {/* Export PDF */}
            <Button onClick={handlePrint} size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700">
              <Download size={14} /> Export PDF
            </Button>
          </div>
        </div>

        <div className="border-t bg-amber-50 px-4 py-2 text-amber-950">
          <div className="flex items-start gap-2 text-[11px] leading-relaxed md:text-xs">
            <Info size={15} className="mt-0.5 shrink-0 text-amber-600" />
            <p>
              If the template looks messy or broken when you first add your info, don't worry - it isn't a glitch. Templates are built with strict spacing, so adding a long job title or an extra sentence can easily push things out of line or accidentally create an empty second page. It just takes a little experimenting to make it look right. Try shortening a few words, cutting down your bullet points, or adjusting the tool's margins to snap the design back into place.
            </p>
          </div>
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
        <div className={`${mobileTab === "preview" ? "flex" : "hidden"} md:flex flex-1 bg-gray-200 p-4 md:p-8 overflow-auto`}>
          <PagedResumePreview Template={Template} data={resumeData} printRef={resumeRef} />
        </div>
      </div>
    </div>
  );
}
