import type { ResumeData } from "@/types/resume";

export default function Template35({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[15mm] font-sans text-gray-800">
      {/* Circular Motif */}
      <div className="flex gap-8 mb-10 items-start">
        <div className="w-[40mm] h-[40mm] bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-center shrink-0">
          <div>
            <p className="text-xs uppercase tracking-wider">Hello</p>
            <p className="text-lg font-bold">I'm</p>
          </div>
        </div>
        <div className="pt-2">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
          <p className="text-lg text-purple-500">{personalInfo.title}</p>
          <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>
      </div>

      {summary && (
        <div className="mb-10 bg-gray-50 p-6 rounded-full text-center max-w-[160mm] mx-auto">
          <p className="text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      <div className="flex gap-8">
        <div className="flex-1">
          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-purple-500 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">E</span>
                Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6 flex gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-pink-500">
                    {exp.from.split(' ')[1]?.slice(2) || '●'}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{exp.role}</h3>
                    <p className="text-sm text-gray-500 mb-1">{exp.company} | {exp.from} - {exp.to}</p>
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
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-[55mm]">
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-purple-500 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-purple-500 mb-3">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="flex gap-3 mb-2 items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-purple-500">
                    {edu.year?.slice(2)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold">{edu.degree}</p>
                    <p className="text-xs text-gray-500">{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-purple-500 mb-3">Languages</h2>
              {languages.map((lang) => (
                <p key={lang.id} className="text-sm text-gray-600 mb-1">{lang.name}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
