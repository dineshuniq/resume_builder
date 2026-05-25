import type { ResumeData } from "@/types/resume";

export default function Template24({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[20mm] font-sans text-gray-800">
      {/* Wabi-Sabi: Minimal, lots of whitespace, single accent */}
      <div className="max-w-[140mm] mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-4 tracking-[0.2em]">{personalInfo.fullName}</h1>
          <div className="w-[20mm] h-[1px] bg-indigo-900 mx-auto mb-4"></div>
          <p className="text-sm text-gray-500">{personalInfo.title}</p>
        </div>

        <div className="mb-12 text-center space-y-1 text-sm text-gray-400">
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.location && <p>{personalInfo.location}</p>}
        </div>

        {summary && (
          <div className="mb-16 text-center">
            <p className="text-sm leading-loose text-gray-600 max-w-[120mm] mx-auto">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xs font-light uppercase tracking-[0.5em] text-gray-400 mb-8 text-center">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-8 text-center">
                <p className="text-sm text-gray-400 mb-1">{exp.from} - {exp.to}</p>
                <h3 className="text-base font-medium text-gray-800 mb-1">{exp.role}</h3>
                <p className="text-sm text-gray-500 mb-3">{exp.company}</p>
                {exp.projects.map((project) => (
                  <div key={project.id} className="mb-3 max-w-[120mm] mx-auto">
                    <p className="text-sm font-medium text-gray-700 mb-2">{project.title}</p>
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

        <div className="grid grid-cols-3 gap-8 text-center">
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-light uppercase tracking-[0.3em] text-gray-400 mb-4">Skills</h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <p key={skill.id} className="text-sm text-gray-600">{skill.name}</p>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-light uppercase tracking-[0.3em] text-gray-400 mb-4">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="text-sm text-gray-600">{edu.degree}</p>
                  <p className="text-xs text-gray-400">{edu.institution}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-xs font-light uppercase tracking-[0.3em] text-gray-400 mb-4">Languages</h2>
              {languages.map((lang) => (
                <p key={lang.id} className="text-sm text-gray-600">{lang.name}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
