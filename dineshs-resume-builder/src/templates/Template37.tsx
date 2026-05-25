import type { ResumeData } from "@/types/resume";

export default function Template37({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-gray-900 p-[15mm] font-sans text-white" 
      style={{ backgroundImage: "repeating-linear-gradient(60deg, #1a1a2e 0, #1a1a2e 2px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }}>
      
      <div className="flex gap-6 mb-8 items-center">
        <div className="w-[50mm] h-[55mm] bg-gradient-to-b from-cyan-400 to-blue-600" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
          <p className="text-lg text-cyan-400">{personalInfo.title}</p>
          <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-400">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>
      </div>

      {summary && (
        <div className="mb-8 border-l-4 border-cyan-400 pl-4">
          <p className="text-sm leading-relaxed text-gray-300">{summary}</p>
        </div>
      )}

      <div className="flex gap-8">
        <div className="flex-1">
          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6">
                  <h3 className="font-bold text-white mb-1">{exp.role}</h3>
                  <p className="text-xs text-cyan-400 mb-2">{exp.company} | {exp.from} - {exp.to}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-2">
                      <p className="text-xs font-semibold text-gray-300">{project.title}</p>
                      <ul className="text-xs text-gray-500 space-y-0.5">
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

        <div className="w-[55mm]">
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs border border-cyan-400 text-cyan-400 px-2 py-1" style={{ clipPath: "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)" }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-3">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="text-xs font-semibold text-gray-300">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.institution}, {edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-3">Languages</h2>
              {languages.map((lang) => (
                <p key={lang.id} className="text-xs text-gray-400 mb-1">{lang.name}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
