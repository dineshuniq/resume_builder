import type { ResumeData } from "@/types/resume";

export default function Template38({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[15mm] font-sans text-gray-800">
      {/* Ribbon Banner Style */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <p className="text-lg text-gray-500">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {summary && (
        <div className="relative mb-10 bg-red-600 text-white p-5 shadow-lg">
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] border-t-transparent border-l-[10px] border-l-red-800 border-b-[10px] border-b-transparent"></div>
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-red-800 border-b-[10px] border-b-transparent"></div>
          <p className="text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      <div className="flex gap-8">
        <div className="flex-1">
          {experience.length > 0 && (
            <div className="mb-8">
              <div className="relative bg-blue-600 text-white px-4 py-2 inline-block mb-4">
                <span className="text-sm font-bold uppercase tracking-wider">Experience</span>
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[10px] border-b-transparent border-r-[10px] border-r-blue-800"></div>
              </div>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6 border-l-4 border-blue-600 pl-4">
                  <h3 className="font-bold text-gray-800">{exp.role}</h3>
                  <p className="text-sm text-blue-600 mb-1">{exp.company} | {exp.from} - {exp.to}</p>
                  <p className="text-xs text-gray-500 mb-2">{exp.location}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-2">
                      <p className="text-xs font-semibold">{project.title}</p>
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
              <div className="relative bg-green-600 text-white px-4 py-2 inline-block mb-3">
                <span className="text-xs font-bold uppercase tracking-wider">Skills</span>
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[8px] border-b-transparent border-r-[8px] border-r-green-800"></div>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs bg-green-100 text-green-700 px-2 py-1">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-6">
              <div className="relative bg-purple-600 text-white px-4 py-2 inline-block mb-3">
                <span className="text-xs font-bold uppercase tracking-wider">Education</span>
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[8px] border-b-transparent border-r-[8px] border-r-purple-800"></div>
              </div>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="text-xs font-semibold">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.institution}, {edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <div className="relative bg-orange-600 text-white px-4 py-2 inline-block mb-3">
                <span className="text-xs font-bold uppercase tracking-wider">Languages</span>
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[8px] border-b-transparent border-r-[8px] border-r-orange-800"></div>
              </div>
              {languages.map((lang) => (
                <p key={lang.id} className="text-xs mb-1">{lang.name}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
