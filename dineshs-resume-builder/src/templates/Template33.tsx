import type { ResumeData } from "@/types/resume";

export default function Template33({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-[15mm] font-sans">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 mb-4 shadow-xl border border-white/30">
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{personalInfo.fullName}</h1>
        <p className="text-lg text-white/90">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-white/70">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {summary && (
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 mb-4 shadow-lg border border-white/30">
          <p className="text-sm leading-relaxed text-white">{summary}</p>
        </div>
      )}

      <div className="flex gap-4">
        <div className="flex-1">
          {experience.length > 0 && (
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 mb-4 shadow-lg border border-white/30">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-white">{exp.role}</h3>
                    <span className="text-xs text-white/60">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-sm text-white/80 mb-2">{exp.company}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-2">
                      <p className="text-xs font-semibold text-white/90">{project.title}</p>
                      <ul className="text-xs text-white/70 space-y-0.5">
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
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 mb-4 shadow-lg border border-white/30">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs bg-white/30 text-white px-2 py-1 rounded-full">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 mb-4 shadow-lg border border-white/30">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="text-xs font-semibold text-white">{edu.degree}</p>
                  <p className="text-xs text-white/60">{edu.institution}, {edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 shadow-lg border border-white/30">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Languages</h2>
              {languages.map((lang) => (
                <p key={lang.id} className="text-xs text-white/70 mb-1">{lang.name}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
