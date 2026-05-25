import { useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

export default function ExperienceForm() {
  const { resumeData, addExperience, removeExperience, updateExperience, addProject, removeProject, updateProject } = useResumeStore();
  const [expandedExp, setExpandedExp] = useState<string | null>(null);
  const toggleExperience = (id: string) => setExpandedExp((current) => (current === id ? null : id));

  return (
    <div className="space-y-4">
      {resumeData.experience.map((exp) => (
        <div key={exp.id} className="border rounded-lg p-3 sm:p-4 bg-gray-50/50">
          <div className="flex items-start gap-2 mb-3">
            <button
              type="button"
              onClick={() => toggleExperience(exp.id)}
              className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-md bg-white px-3 py-2 text-left transition-colors hover:bg-gray-100"
            >
              <span className="text-gray-400">
                {expandedExp === exp.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
              <span className="min-w-0 truncate font-medium text-sm">{exp.role || "Untitled role"} at {exp.company || "Company"}</span>
            </button>
            <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)} className="text-red-400 hover:text-red-600 h-6 w-6 p-0">
              <Trash2 size={14} />
            </Button>
          </div>

          {expandedExp === exp.id && (
            <div className="space-y-3 pl-0 sm:pl-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Role</Label>
                  <Input value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} className="h-8 text-sm" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Company</Label>
                  <Input value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} className="h-8 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Location</Label>
                  <Input value={exp.location} onChange={(e) => updateExperience(exp.id, "location", e.target.value)} className="h-8 text-sm" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">From</Label>
                  <Input value={exp.from} onChange={(e) => updateExperience(exp.id, "from", e.target.value)} className="h-8 text-sm" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">To</Label>
                  <Input value={exp.to} onChange={(e) => updateExperience(exp.id, "to", e.target.value)} className="h-8 text-sm" disabled={exp.current} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox checked={exp.current} onCheckedChange={(checked) => updateExperience(exp.id, "current", checked === true)} />
                <Label className="text-xs">Current Position</Label>
              </div>

              {/* Projects */}
              <div className="space-y-2 pt-2 border-t">
                <p className="text-xs font-semibold text-gray-500">Projects</p>
                {exp.projects.map((project) => (
                  <div key={project.id} className="space-y-2 bg-white p-3 rounded">
                    <div className="flex justify-between">
                      <Input value={project.title} onChange={(e) => updateProject(exp.id, project.id, "title", e.target.value)} className="h-7 text-sm" placeholder="Project title" />
                      <Button variant="ghost" size="sm" onClick={() => removeProject(exp.id, project.id)} className="text-red-400 hover:text-red-600 h-6 w-6 p-0">
                        <Trash2 size={12} />
                      </Button>
                    </div>
                    <textarea
                      value={project.bullets.join("\n")}
                      onChange={(e) => updateProject(exp.id, project.id, "bullets", e.target.value.split("\n").filter(Boolean))}
                      placeholder="Bullet points (one per line)"
                      className="w-full min-h-[60px] p-2 text-xs rounded-md border border-input bg-background resize-y"
                    />
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addProject(exp.id, { id: crypto.randomUUID(), title: "", bullets: [""] })} className="text-xs">
                  <Plus size={12} className="mr-1" /> Add Project
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
      <Button variant="outline" onClick={() => addExperience({ id: crypto.randomUUID(), company: "", location: "", role: "", from: "", to: "", current: false, projects: [] })} className="w-full text-sm">
        <Plus size={14} className="mr-1" /> Add Experience
      </Button>
    </div>
  );
}
