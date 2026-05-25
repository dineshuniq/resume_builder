import type { ResumeData } from "@/types/resume";

export default function Template26({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-gray-100 p-[15mm] font-sans text-gray-800">
      {/* Material Design Header */}
      <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName}</h1>
        <p className="text-sm opacity-80">{personalInfo.title}</p>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          {summary && (
            <div className="bg-white p-5 rounded-lg shadow-sm mb-4">
              <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="bg-white p-5 rounded-lg shadow-sm mb-4">
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800">{exp.role}</h3>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-sm text-indigo-500 mb-2">{exp.company} | {exp.location}</p>
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
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">Education</h2>
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
          <div className="bg-white p-5 rounded-lg shadow-sm mb-4">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">Contact</h2>
            <div className="space-y-2 text-xs text-gray-600">
              {personalInfo.email && <div>{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
              {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
            </div>
          </div>

          {skills.length > 0 && (
            <div className="bg-white p-5 rounded-lg shadow-sm mb-4">
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">Languages</h2>
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
