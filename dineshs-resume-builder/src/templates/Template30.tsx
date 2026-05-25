import type { ResumeData } from "@/types/resume";

export default function Template30({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[15mm] font-sans text-gray-800">
      {/* Line Art - Thin elegant lines */}
      <div className="mb-8 border-b border-gray-300 pb-6">
        <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">{personalInfo.title}</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8 border-b border-gray-200 pb-6 text-sm text-gray-600">
        {personalInfo.email && <div className="border-r border-gray-200 pr-4">{personalInfo.email}</div>}
        {personalInfo.phone && <div className="border-r border-gray-200 pr-4">{personalInfo.phone}</div>}
        {personalInfo.location && <div className="border-r border-gray-200 pr-4">{personalInfo.location}</div>}
        {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
      </div>

      {summary && (
        <div className="mb-8 border-l border-gray-400 pl-6">
          <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
        </div>
      )}

      <div className="flex gap-10">
        <div className="flex-1">
          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-6 border-b border-gray-200 pb-2">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-800">{exp.role}</h3>
                    <span className="text-xs text-gray-400">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{exp.company} | {exp.location}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-3">
                      <p className="text-xs font-semibold text-gray-700 mb-1">{project.title}</p>
                      <ul className="text-xs text-gray-500 space-y-1">
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
        </div>

        <div className="w-[50mm] border-l border-gray-200 pl-6">
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-3 border-b border-gray-200 pb-2">Skills</h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-sm text-gray-600">{skill.name}</div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-3 border-b border-gray-200 pb-2">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="text-xs font-semibold text-gray-700">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.institution}</p>
                  <p className="text-xs text-gray-400">{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-3 border-b border-gray-200 pb-2">Languages</h2>
              {languages.map((lang) => (
                <p key={lang.id} className="text-xs text-gray-600 mb-1">{lang.name}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
