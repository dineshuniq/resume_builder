import type { ResumeData } from "@/types/resume";

export default function Template22({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white font-sans text-gray-800 overflow-hidden">
      {/* Diagonal Sections */}
      <div className="relative">
        {/* Header Band */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-[15mm] pb-12 text-white" style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" }}>
          <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
          <p className="text-lg opacity-80">{personalInfo.title}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm opacity-70">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>

        <div className="p-[15mm] -mt-6">
          {summary && (
            <div className="mb-8 bg-gray-50 p-6 rounded-lg">
              <p className="text-sm leading-relaxed">{summary}</p>
            </div>
          )}

          <div className="flex gap-8">
            <div className="flex-1">
              {experience.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-indigo-600 mb-4">Experience</h2>
                  {experience.map((exp) => (
                    <div key={exp.id} className="mb-6">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold">{exp.role}</h3>
                        <span className="text-xs text-gray-400">{exp.from} - {exp.to}</span>
                      </div>
                      <p className="text-sm text-indigo-500 mb-2">{exp.company}</p>
                      {exp.projects.map((project) => (
                        <div key={project.id} className="mb-2">
                          <p className="text-sm font-semibold text-gray-700">{project.title}</p>
                          <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
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
                <div className="mb-6 bg-purple-50 p-5 rounded-lg">
                  <h2 className="text-sm font-bold text-purple-600 mb-3">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill.id} className="text-xs bg-white text-purple-700 px-2 py-1 rounded shadow-sm">{skill.name}</span>
                    ))}
                  </div>
                </div>
              )}

              {education.length > 0 && (
                <div className="mb-6 bg-indigo-50 p-5 rounded-lg">
                  <h2 className="text-sm font-bold text-indigo-600 mb-3">Education</h2>
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-2">
                      <p className="text-xs font-semibold">{edu.degree}</p>
                      <p className="text-xs text-gray-500">{edu.institution}, {edu.year}</p>
                    </div>
                  ))}
                </div>
              )}

              {languages.length > 0 && (
                <div className="bg-pink-50 p-5 rounded-lg">
                  <h2 className="text-sm font-bold text-pink-600 mb-3">Languages</h2>
                  {languages.map((lang) => (
                    <p key={lang.id} className="text-xs text-gray-600 mb-1">{lang.name}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom diagonal */}
        <div className="h-[15mm] bg-gradient-to-r from-purple-600 to-indigo-600" style={{ clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 100%)" }}></div>
      </div>
    </div>
  );
}
