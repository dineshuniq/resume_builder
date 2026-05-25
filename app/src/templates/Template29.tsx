import type { ResumeData } from "@/types/resume";

export default function Template29({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] font-sans text-white">
      {/* Color Block - Each section different color */}
      <div className="bg-[#ff6b6b] p-[15mm]">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
        <p className="text-lg">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm opacity-80">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {summary && (
        <div className="bg-[#4ecdc4] p-[15mm]">
          <p className="text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="bg-[#45b7d1] p-[15mm]">
          <h2 className="text-lg font-bold mb-6">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold">{exp.role}</h3>
                <span className="text-xs opacity-70">{exp.from} - {exp.to}</span>
              </div>
              <p className="text-sm mb-2 opacity-80">{exp.company} | {exp.location}</p>
              {exp.projects.map((project) => (
                <div key={project.id} className="mb-2">
                  <p className="text-sm font-semibold mb-1">{project.title}</p>
                  <ul className="text-xs space-y-1 opacity-80">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3">
        {skills.length > 0 && (
          <div className="bg-[#96ceb4] p-[10mm]">
            <h2 className="text-sm font-bold mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs bg-white/20 px-2 py-1">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="bg-[#ffeaa7] p-[10mm] text-gray-800">
            <h2 className="text-sm font-bold mb-3">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-xs font-semibold">{edu.degree}</p>
                <p className="text-xs opacity-70">{edu.institution}, {edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div className="bg-[#dfe6e9] p-[10mm] text-gray-800">
            <h2 className="text-sm font-bold mb-3">Languages</h2>
            {languages.map((lang) => (
              <p key={lang.id} className="text-xs mb-1">{lang.name}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
