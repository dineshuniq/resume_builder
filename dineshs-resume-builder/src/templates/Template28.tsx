import type { ResumeData } from "@/types/resume";

export default function Template28({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[15mm] font-sans text-gray-900">
      {/* Typography Hero - Extreme hierarchy */}
      <div className="mb-12">
        <h1 className="text-7xl font-black tracking-tighter leading-none mb-4">{personalInfo.fullName}</h1>
        <p className="text-2xl font-light text-gray-400 tracking-wide">{personalInfo.title}</p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500 border-t border-gray-200 pt-4">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-12 max-w-[160mm]">
          <p className="text-base leading-relaxed text-gray-600">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-gray-400 mb-6">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <h3 className="text-2xl font-bold">{exp.role}</h3>
                <span className="text-sm text-gray-400">{exp.from} - {exp.to}</span>
              </div>
              <p className="text-base text-gray-500 mb-3">{exp.company} | {exp.location}</p>
              {exp.projects.map((project) => (
                <div key={project.id} className="mb-4 ml-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">{project.title}</p>
                  <ul className="text-sm text-gray-600 space-y-1">
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

      <div className="grid grid-cols-3 gap-8">
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-gray-400 mb-4">Skills</h2>
            <div className="space-y-1">
              {skills.map((skill) => (
                <p key={skill.id} className="text-sm text-gray-700">{skill.name}</p>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-gray-400 mb-4">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-sm font-semibold">{edu.degree}</p>
                <p className="text-xs text-gray-500">{edu.institution}</p>
                <p className="text-xs text-gray-400">{edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-gray-400 mb-4">Languages</h2>
            {languages.map((lang) => (
              <p key={lang.id} className="text-sm text-gray-700">{lang.name}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
