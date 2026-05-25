import type { ResumeData } from "@/types/resume";

export default function Template40({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-gradient-to-br from-gray-50 to-gray-100 p-[15mm] font-sans text-gray-800">
      {/* Ultra Modern - Futuristic Clean */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {personalInfo.fullName.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo.fullName}</h1>
            <p className="text-sm text-blue-500 font-medium">{personalInfo.title}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
          {personalInfo.email && <span className="bg-gray-50 px-3 py-1 rounded-full">{personalInfo.email}</span>}
          {personalInfo.phone && <span className="bg-gray-50 px-3 py-1 rounded-full">{personalInfo.phone}</span>}
          {personalInfo.location && <span className="bg-gray-50 px-3 py-1 rounded-full">{personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="bg-gray-50 px-3 py-1 rounded-full">{personalInfo.linkedin}</span>}
        </div>
      </div>

      {summary && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
        </div>
      )}

      <div className="flex gap-6">
        <div className="flex-1">
          {experience.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h2 className="text-sm font-bold text-blue-500 uppercase tracking-wider mb-4">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800">{exp.role}</h3>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-sm text-blue-500 mb-2">{exp.company} | {exp.location}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-2">
                      <p className="text-xs font-semibold text-gray-700">{project.title}</p>
                      <ul className="list-disc list-inside text-xs text-gray-500 space-y-0.5">
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

          {education.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-sm font-bold text-blue-500 uppercase tracking-wider mb-3">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="text-sm font-semibold text-gray-700">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.institution}, {edu.year}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-[55mm]">
          {skills.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
              <h2 className="text-sm font-bold text-blue-500 uppercase tracking-wider mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs bg-gradient-to-r from-cyan-50 to-blue-50 text-blue-600 px-3 py-1.5 rounded-full shadow-sm">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h2 className="text-sm font-bold text-blue-500 uppercase tracking-wider mb-3">Languages</h2>
              {languages.map((lang) => (
                <div key={lang.id} className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <p className="text-xs text-gray-600">{lang.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
