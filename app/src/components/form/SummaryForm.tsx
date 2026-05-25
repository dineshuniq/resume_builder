import { useResumeStore } from "@/store/resumeStore";
import { Label } from "@/components/ui/label";

export default function SummaryForm() {
  const { resumeData, updateSummary } = useResumeStore();

  return (
    <div className="space-y-2">
      <Label htmlFor="summary">Professional Summary</Label>
      <textarea
        id="summary"
        value={resumeData.summary}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="Write a brief overview of your professional background and key strengths..."
        className="w-full min-h-[120px] p-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
      />
    </div>
  );
}
