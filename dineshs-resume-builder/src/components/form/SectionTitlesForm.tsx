import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSectionTitles } from "@/lib/sectionTitles";
import { useResumeStore } from "@/store/resumeStore";
import type { SectionTitles } from "@/types/resume";

const fields: Array<{ key: keyof SectionTitles; label: string }> = [
  { key: "contact", label: "Contact" },
  { key: "summary", label: "Summary / Profile" },
  { key: "experience", label: "Experience" },
  { key: "education", label: "Education" },
  { key: "skills", label: "Skills" },
  { key: "languages", label: "Languages" },
  { key: "certifications", label: "Certifications" },
  { key: "projects", label: "Projects" },
];

export default function SectionTitlesForm() {
  const { resumeData, updateSectionTitle } = useResumeStore();
  const titles = getSectionTitles(resumeData);

  return (
    <div className="grid grid-cols-1 gap-3 @sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.key} className="space-y-1">
          <Label className="text-xs">{field.label}</Label>
          <Input
            value={titles[field.key]}
            onChange={(event) => updateSectionTitle(field.key, event.target.value)}
            className="h-8 text-sm"
          />
        </div>
      ))}
    </div>
  );
}
