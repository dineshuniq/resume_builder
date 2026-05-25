import type { ResumeData } from "@/types/resume";

export default function Template32({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c"];

  return (
    <div className="w-[210mm] min-h-[297mm] font-sans text-gray-800">
      {/* Horizontal Bands */}
      <div className="bg-[#e74c3c] p-[15mm] text-white">
        <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
        <p className="text-sm mt-1">{personalInfo.title}</p>
        <div className="flex gap-4 mt-3 text-xs opacity-80">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
        </div>
      </div>

      {summary && (
        <div className="bg-white p-[15mm]">
          <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
        </div>
      )}

      {experience.map((exp, idx) => (
        <div key={exp.id} className="p-[15mm]" style={{ backgroundColor: colors[idx % colors.length], color: "white" }}>
          <div className="flex justify-between items-baseline mb-2">
            <h3 className="font-bold text-lg">{exp.role}</h3>
            <span className="text-xs opacity-80">{exp.from} - {exp.to}</span>
          </div>
          <p className="text-sm mb-3 opacity-90">{exp.company} | {exp.location}</p>
          {exp.projects.map((project) => (
            <div key={project.id} className="mb-2">
              <p className="text-sm font-semibold mb-1">{project.title}</p>
              <ul className="text-xs space-y-1 opacity-80">
                {project.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}

      <div className="grid grid-cols-3">
        {skills.length > 0 && (
          <div className="bg-gray-100 p-[10mm]">
            <h2 className="text-sm font-bold mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs bg-white px-2 py-1 shadow-sm">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="bg-gray-200 p-[10mm]">
            <h2 className="text-sm font-bold mb-3">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-xs font-semibold">{edu.degree}</p>
                <p className="text-xs text-gray-600">{edu.institution}, {edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div className="bg-gray-100 p-[10mm]">
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
