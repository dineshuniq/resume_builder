import type { ResumeData } from "@/types/resume";

export default function Template17({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[15mm] font-sans text-[#0066cc]" 
      style={{ backgroundImage: "linear-gradient(#e8f0f8 1px, transparent 1px), linear-gradient(90deg, #e8f0f8 1px, transparent 1px)", backgroundSize: "10mm 10mm" }}>
      {/* Blueprint Header */}
      <div className="border-2 border-[#0066cc] p-6 mb-8 relative">
        <div className="absolute -top-3 left-4 bg-white px-2 text-xs">RESUME_ID: {personalInfo.fullName.replace(/\s/g, '_').toUpperCase()}</div>
        <h1 className="text-4xl font-bold text-[#0066cc] mb-2 uppercase">{personalInfo.fullName}</h1>
        <p className="text-lg text-[#0066cc] font-medium">{personalInfo.title}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          {personalInfo.email && <div>EMAIL: {personalInfo.email}</div>}
          {personalInfo.phone && <div>PHONE: {personalInfo.phone}</div>}
          {personalInfo.location && <div>LOCATION: {personalInfo.location}</div>}
          {personalInfo.linkedin && <div>LINKEDIN: {personalInfo.linkedin}</div>}
        </div>
        <div className="absolute top-0 right-0 w-[20mm] h-[20mm] border-l-2 border-b-2 border-[#0066cc]"></div>
        <div className="absolute bottom-0 left-0 w-[20mm] h-[20mm] border-r-2 border-t-2 border-[#0066cc]"></div>
      </div>

      {summary && (
        <div className="mb-8 border border-[#0066cc] p-4">
          <div className="text-xs font-bold mb-2 border-b border-[#0066cc] pb-1">SECTION: PROFESSIONAL_SUMMARY</div>
          <p className="text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      <div className="flex gap-6">
        <div className="flex-1">
          {experience.length > 0 && (
            <div className="mb-8 border border-[#0066cc] p-4">
              <div className="text-xs font-bold mb-4 border-b border-[#0066cc] pb-1">SECTION: EXPERIENCE</div>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6 border-l-2 border-[#0066cc] pl-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold">{exp.role}</h3>
                    <span className="text-xs">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-sm mb-2">{exp.company} | {exp.location}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-3">
                      <p className="text-sm font-semibold">{project.title}</p>
                      <ul className="text-xs space-y-1">
                        {project.bullets.map((bullet, idx) => (
                          <li key={idx}>- {bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-[55mm]">
          {skills.length > 0 && (
            <div className="mb-6 border border-[#0066cc] p-4">
              <div className="text-xs font-bold mb-3 border-b border-[#0066cc] pb-1">SECTION: SKILLS</div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs border border-[#0066cc] px-2 py-1">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-6 border border-[#0066cc] p-4">
              <div className="text-xs font-bold mb-3 border-b border-[#0066cc] pb-1">SECTION: EDUCATION</div>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="text-xs font-bold">{edu.degree}</p>
                  <p className="text-xs">{edu.institution}</p>
                  <p className="text-xs">{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div className="border border-[#0066cc] p-4">
              <div className="text-xs font-bold mb-3 border-b border-[#0066cc] pb-1">SECTION: LANGUAGES</div>
              {languages.map((lang) => (
                <p key={lang.id} className="text-xs mb-1">{lang.name} [{lang.proficiency}]</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
