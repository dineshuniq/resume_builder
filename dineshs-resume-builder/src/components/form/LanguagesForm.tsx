import { useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LanguagesForm() {
  const { resumeData, addLanguage, removeLanguage } = useResumeStore();
  const [newLang, setNewLang] = useState("");
  const [newProf, setNewProf] = useState("Fluent");

  const handleAdd = () => {
    if (newLang.trim()) {
      addLanguage({ id: crypto.randomUUID(), name: newLang.trim(), proficiency: newProf });
      setNewLang("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input value={newLang} onChange={(e) => setNewLang(e.target.value)} placeholder="Language..." className="h-8 text-sm" onKeyDown={(e) => e.key === "Enter" && handleAdd()} />
        <Select value={newProf} onValueChange={setNewProf}>
          <SelectTrigger className="h-8 text-sm w-full sm:w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Native">Native</SelectItem>
            <SelectItem value="Fluent">Fluent</SelectItem>
            <SelectItem value="Conversational">Conversational</SelectItem>
            <SelectItem value="Basic">Basic</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={handleAdd} className="h-8 px-3 self-start sm:self-auto">
          <Plus size={14} />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {resumeData.languages.map((lang) => (
          <span key={lang.id} className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs">
            {lang.name} ({lang.proficiency})
            <button onClick={() => removeLanguage(lang.id)} className="text-green-400 hover:text-green-600 ml-1">
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
