import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

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
      {resumeData.education.map((edu) => (
        <div key={edu.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end border rounded-lg p-3 bg-gray-50/50">
          <div className="col-span-1 sm:col-span-5 space-y-1">
            <Label className="text-xs">Institution</Label>
            <Input value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} className="h-8 text-sm" />
          </div>
          <div className="col-span-1 sm:col-span-4 space-y-1">
            <Label className="text-xs">Degree</Label>
            <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} className="h-8 text-sm" />
          </div>
          <div className="col-span-1 sm:col-span-2 space-y-1">
            <Label className="text-xs">Year</Label>
            <Input value={edu.year} onChange={(e) => updateEducation(edu.id, "year", e.target.value)} className="h-8 text-sm" />
          </div>
          <div className="col-span-1">
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
