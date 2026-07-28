import { useResumeStore } from "@/store/resumeStore";
import { Label } from "@/components/ui/label";
import FieldHint from "@/components/form/FieldHint";
import BoldableTextarea from "@/components/form/BoldableTextarea";

export default function SummaryForm() {
  const { resumeData, updateSummary } = useResumeStore();

  return (
    <div className="space-y-2">
      <Label htmlFor="summary">Professional Summary</Label>
      <BoldableTextarea
        id="summary"
        value={resumeData.summary}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="Write a brief overview of your professional background and key strengths..."
        className="min-h-[120px] p-3"
      />
      <FieldHint>Recruiters skim this in ~6 seconds — lead with your strongest achievement, not generic traits, and weave in 2-3 keywords from the job description for ATS matching.</FieldHint>
    </div>
  );
}
