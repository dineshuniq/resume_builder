import { useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export default function SkillsForm() {
  const { resumeData, addSkill, removeSkill } = useResumeStore();
  const [newSkill, setNewSkill] = useState("");
  const [newCategory, setNewCategory] = useState("General");

  const handleAdd = () => {
    if (newSkill.trim()) {
      addSkill({ id: crypto.randomUUID(), name: newSkill.trim(), category: newCategory });
      setNewSkill("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add a skill..." className="h-8 text-sm" onKeyDown={(e) => e.key === "Enter" && handleAdd()} />
        <Input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Category" className="h-8 text-sm w-full sm:w-[120px]" />
        <Button variant="outline" size="sm" onClick={handleAdd} className="h-8 px-3 self-start sm:self-auto">
          <Plus size={14} />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {resumeData.skills.map((skill) => (
          <span key={skill.id} className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs">
            {skill.name}
            <button onClick={() => removeSkill(skill.id)} className="text-indigo-400 hover:text-indigo-600 ml-1">
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
