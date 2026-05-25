import { useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function CertificationsForm() {
  const { resumeData, addCertification, removeCertification, setResumeData } = useResumeStore();
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [year, setYear] = useState("");

  const updateCert = (id: string, field: string, value: string) => {
    const updated = resumeData.certifications.map((c) =>
      c.id === id ? { ...c, [field]: value } : c
    );
    setResumeData({ ...resumeData, certifications: updated });
  };

  const handleAdd = () => {
    if (name.trim()) {
      addCertification({ id: crypto.randomUUID(), name: name.trim(), organization: org, year });
      setName(""); setOrg(""); setYear("");
    }
  };

  return (
    <div className="space-y-3">
      {resumeData.certifications.map((cert) => (
        <div key={cert.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end border rounded-lg p-3 bg-gray-50/50">
          <div className="col-span-1 sm:col-span-5 space-y-1">
            <Label className="text-xs">Certification</Label>
            <Input value={cert.name} onChange={(e) => updateCert(cert.id, "name", e.target.value)} className="h-8 text-sm" />
          </div>
          <div className="col-span-1 sm:col-span-4 space-y-1">
            <Label className="text-xs">Organization</Label>
            <Input value={cert.organization} onChange={(e) => updateCert(cert.id, "organization", e.target.value)} className="h-8 text-sm" />
          </div>
          <div className="col-span-1 sm:col-span-2 space-y-1">
            <Label className="text-xs">Year</Label>
            <Input value={cert.year} onChange={(e) => updateCert(cert.id, "year", e.target.value)} className="h-8 text-sm" />
          </div>
          <div className="col-span-1">
            <Button variant="ghost" size="sm" onClick={() => removeCertification(cert.id)} className="text-red-400 hover:text-red-600 h-8 w-8 p-0">
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      ))}

      <div className="border rounded-lg p-3 bg-gray-50/50">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
          <div className="col-span-1 sm:col-span-5">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Certification name" className="h-8 text-sm" />
          </div>
          <div className="col-span-1 sm:col-span-4">
            <Input value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Issuing org" className="h-8 text-sm" />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <Input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" className="h-8 text-sm" />
          </div>
          <div className="col-span-1">
            <Button variant="outline" size="sm" onClick={handleAdd} className="h-8 w-8 p-0">
              <Plus size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
