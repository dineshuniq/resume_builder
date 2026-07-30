import { useResumeStore } from "@/store/resumeStore";
import { Label } from "@/components/ui/label";
import FieldHint from "@/components/form/FieldHint";
import BoldableInput from "@/components/form/BoldableInput";

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resumeData;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 @sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <BoldableInput
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <BoldableInput
            id="title"
            value={personalInfo.title}
            onChange={(e) => updatePersonalInfo("title", e.target.value)}
            placeholder="Software Engineer"
          />
          <FieldHint>Mirror the exact job title from the posting — ATS software keyword-matches this field first.</FieldHint>
        </div>
      </div>
      <div className="grid grid-cols-1 @sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <BoldableInput
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo("email", e.target.value)}
            placeholder="john@example.com"
          />
          <FieldHint>Use a professional format (firstname.lastname@...) — recruiters judge credibility here.</FieldHint>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <BoldableInput
            id="phone"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo("phone", e.target.value)}
            placeholder="+1 234 567 890"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 @sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <BoldableInput
            id="location"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo("location", e.target.value)}
            placeholder="New York, NY"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <BoldableInput
            id="linkedin"
            value={personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
          <FieldHint>An outdated or missing LinkedIn is a common red flag recruiters check for first.</FieldHint>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="website">Website / Portfolio</Label>
        <BoldableInput
          id="website"
          value={personalInfo.website}
          onChange={(e) => updatePersonalInfo("website", e.target.value)}
          placeholder="johndoe.com"
        />
        <FieldHint>Optional, but a live portfolio link builds credibility for technical and creative roles.</FieldHint>
      </div>
    </div>
  );
}
