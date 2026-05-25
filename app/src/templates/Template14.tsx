import type { ResumeData } from "@/types/resume";

export default function Template14({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-[#fff5e6] p-[15mm] font-sans text-gray-800 relative overflow-hidden">
      {/* Memphis Patterns */}
      <div className="absolute top-[20mm] left-[30mm] w-[15mm] h-[15mm] border-4 border-[#ff6b6b] rounded-full"></div>
      <div className="absolute top-[50mm] right-[25mm] w-[10mm] h-[10mm] bg-[#4ecdc4] transform rotate-45"></div>
      <div className="absolute bottom-[40mm] left-[20mm] w-[20mm] h-[4mm] bg-[#ffe66d]"></div>
      <div className="absolute top-[100mm] right-[40mm] w-0 h-0 border-l-[8mm] border-r-[8mm] border-b-[14mm] border-l-transparent border-r-transparent border-b-[#ff6b6b]"></div>
      <div className="absolute bottom-[80mm] right-[30mm] w-[12mm] h-[12mm] border-4 border-dashed border-[#4ecdc4] rounded-full"></div>

      <div className="relative">
        <div className="flex gap-6 mb-8 items-start">
          <div className="w-[60mm] h-[60mm] bg-[#ff6b6b] rounded-full flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-xs uppercase tracking-widest mb-1">Hello!</p>
              <p className="text-lg font-bold">I am</p>
            </div>
          </div>
          <div className="flex-1 pt-4">
            <h1 className="text-5xl font-bold text-[#2d3436] mb-2">{personalInfo.fullName}</h1>
            <p className="text-xl text-[#ff6b6b] font-bold">{personalInfo.title}</p>
            <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-600">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
            </div>
          </div>
        </div>

        {summary && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border-t-4 border-[#4ecdc4]">
            <p className="text-sm leading-relaxed">{summary}</p>
          </div>
        )}

        <div className="flex gap-6">
          <div className="flex-1">
            {experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#ff6b6b] mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#ff6b6b] rounded-full"></span>
                  Experience
                </h2>
                {experience.map((exp) => (
                  <div key={exp.id} className="mb-4 bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-gray-800">{exp.role}</h3>
                    <p className="text-xs text-gray-500 mb-1">{exp.company} | {exp.from} - {exp.to}</p>
                    {exp.projects.map((project) => (
                      <div key={project.id} className="mb-2">
                        <p className="text-xs font-semibold text-[#4ecdc4]">{project.title}</p>
                        <ul className="text-xs text-gray-600 space-y-0.5">
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
              <div className="mb-6 bg-[#ffe66d] p-4 rounded-lg">
                <h2 className="text-sm font-bold mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill.id} className="text-xs bg-white px-2 py-1 rounded shadow-sm">{skill.name}</span>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div className="mb-6 bg-[#4ecdc4] p-4 rounded-lg text-white">
                <h2 className="text-sm font-bold mb-3">Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <p className="text-xs font-bold">{edu.degree}</p>
                    <p className="text-xs opacity-80">{edu.institution}, {edu.year}</p>
                  </div>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <div className="bg-[#ff6b6b] p-4 rounded-lg text-white">
                <h2 className="text-sm font-bold mb-3">Languages</h2>
                {languages.map((lang) => (
                  <p key={lang.id} className="text-xs mb-1">{lang.name}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
