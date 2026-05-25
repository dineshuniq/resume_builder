import type { ResumeData } from "@/types/resume";

export default function Template23({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-gray-100 p-[10mm] font-sans text-gray-800">
      {/* Header */}
      <div className="bg-white p-5 mb-3 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName}</h1>
        <p className="text-sm text-gray-500">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-400">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="columns-2 gap-3">
        {summary && (
          <div className="bg-white p-5 mb-3 shadow-sm break-inside-avoid">
            <h2 className="text-sm font-bold text-gray-800 mb-2">Summary</h2>
            <p className="text-xs leading-relaxed text-gray-600">{summary}</p>
          </div>
        )}

        {experience.map((exp) => (
          <div key={exp.id} className="bg-white p-5 mb-3 shadow-sm break-inside-avoid">
            <h3 className="font-bold text-gray-800 text-sm mb-1">{exp.role}</h3>
            <p className="text-xs text-gray-500 mb-2">{exp.company} | {exp.from} - {exp.to}</p>
            {exp.projects.map((project) => (
              <div key={project.id} className="mb-2">
                <p className="text-xs font-semibold text-gray-700">{project.title}</p>
                <ul className="text-xs text-gray-500 space-y-0.5">
                  {project.bullets.slice(0, 2).map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        {skills.length > 0 && (
          <div className="bg-indigo-600 p-5 mb-3 shadow-sm break-inside-avoid text-white">
            <h2 className="text-sm font-bold mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs bg-white/20 px-2 py-1">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="bg-white p-5 mb-3 shadow-sm break-inside-avoid">
            <h2 className="text-sm font-bold text-gray-800 mb-2">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-xs font-semibold">{edu.degree}</p>
                <p className="text-xs text-gray-500">{edu.institution}, {edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div className="bg-pink-500 p-5 mb-3 shadow-sm break-inside-avoid text-white">
            <h2 className="text-sm font-bold mb-2">Languages</h2>
            {languages.map((lang) => (
              <p key={lang.id} className="text-xs mb-1">{lang.name}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
