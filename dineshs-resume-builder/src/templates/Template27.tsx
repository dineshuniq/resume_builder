import type { ResumeData } from "@/types/resume";

export default function Template27({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] font-sans text-gray-800">
      {/* Flat Design - Bold color blocks */}
      <div className="bg-[#e74c3c] p-[15mm] text-white">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
        <p className="text-lg">{personalInfo.title}</p>
      </div>

      <div className="bg-[#c0392b] p-4 text-white text-sm">
        <div className="flex flex-wrap gap-6">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>

      <div className="p-[15mm]">
        {summary && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#e74c3c] mb-3">Summary</h2>
            <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
          </div>
        )}

        <div className="flex gap-8">
          <div className="flex-1">
            {experience.length > 0 && (
              <div className="mb-8">
                <div className="bg-[#3498db] text-white p-3 mb-4 -mx-[15mm] px-[15mm]">
                  <h2 className="text-lg font-bold">Experience</h2>
                </div>
                {experience.map((exp) => (
                  <div key={exp.id} className="mb-6">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-800">{exp.role}</h3>
                      <span className="text-xs text-gray-400">{exp.from} - {exp.to}</span>
                    </div>
                    <p className="text-sm text-[#3498db] mb-2">{exp.company} | {exp.location}</p>
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
              <div className="mb-8">
                <div className="bg-[#2ecc71] text-white p-3 mb-4 -mx-0">
                  <h2 className="text-sm font-bold">Skills</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill.id} className="text-xs bg-[#2ecc71] text-white px-3 py-1">{skill.name}</span>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div className="mb-8">
                <div className="bg-[#9b59b6] text-white p-3 mb-4">
                  <h2 className="text-sm font-bold">Education</h2>
                </div>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <p className="text-sm font-semibold text-gray-700">{edu.degree}</p>
                    <p className="text-xs text-gray-500">{edu.institution}, {edu.year}</p>
                  </div>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <div className="bg-[#f39c12] text-white p-3 mb-4">
                  <h2 className="text-sm font-bold">Languages</h2>
                </div>
                {languages.map((lang) => (
                  <p key={lang.id} className="text-sm text-gray-600 mb-1">{lang.name}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
