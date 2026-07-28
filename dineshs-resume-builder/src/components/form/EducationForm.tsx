import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import FieldHint from "@/components/form/FieldHint";
import BoldableInput from "@/components/form/BoldableInput";

export default function EducationForm() {
  const { resumeData, addEducation, removeEducation, setResumeData } = useResumeStore();

  const updateEducation = (id: string, field: string, value: string) => {
    const updated = resumeData.education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setResumeData({ ...resumeData, education: updated });
  };

  return (
    <div className="space-y-3">
      <FieldHint>List your most recent or highest degree first. Only include GPA if it's 3.5+ or the employer explicitly asks for it.</FieldHint>
      {resumeData.education.map((edu) => (
        <div key={edu.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end border rounded-lg p-3 bg-gray-50/50">
          <div className="col-span-1 sm:col-span-4 space-y-1">
            <Label className="text-xs">Institution</Label>
            <BoldableInput value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} className="h-8 text-sm" />
          </div>
          <div className="col-span-1 sm:col-span-3 space-y-1">
            <Label className="text-xs">Degree</Label>
            <BoldableInput value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} className="h-8 text-sm" />
          </div>
          <div className="col-span-1 sm:col-span-2 space-y-1">
            <Label className="text-xs">Year</Label>
            <Input value={edu.year} onChange={(e) => updateEducation(edu.id, "year", e.target.value)} className="h-8 text-sm" />
          </div>
          <div className="col-span-1 sm:col-span-2 space-y-1">
            <Label className="text-xs">CGPA / Score</Label>
            <Input value={edu.score} onChange={(e) => updateEducation(edu.id, "score", e.target.value)} placeholder="3.9 GPA" className="h-8 text-sm" />
          </div>
          <div className="col-span-1 flex sm:justify-end">
            <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)} className="text-red-400 hover:text-red-600 h-8 w-8 p-0">
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={() => addEducation({ id: crypto.randomUUID(), institution: "", degree: "", year: "", score: "" })} className="w-full text-sm">
        <Plus size={14} className="mr-1" /> Add Education
      </Button>
    </div>
  );
}
