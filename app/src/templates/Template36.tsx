import type { ResumeData } from "@/types/resume";

export default function Template36({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[15mm] font-sans text-gray-800">
      {/* Staircase Layout */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <p className="text-lg text-gray-500">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-8 ml-0 bg-gray-50 p-5 max-w-[170mm]">
          <p className="text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4">Experience</h2>
          {experience.map((exp, idx) => (
            <div key={exp.id} className="mb-6 bg-white shadow-sm p-5 border-l-4 border-indigo-500" style={{ marginLeft: `${idx * 8}mm` }}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold">{exp.role}</h3>
                <span className="text-xs text-gray-400">{exp.from} - {exp.to}</span>
              </div>
              <p className="text-sm text-indigo-500 mb-2">{exp.company} | {exp.location}</p>
              {exp.projects.map((project) => (
                <div key={project.id} className="mb-2">
                  <p className="text-xs font-semibold">{project.title}</p>
                  <ul className="text-xs text-gray-500 space-y-0.5">
                    {project.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4" style={{ marginLeft: "24mm" }}>
        {skills.length > 0 && (
          <div className="bg-indigo-50 p-4">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs bg-white px-2 py-1 shadow-sm">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="bg-purple-50 p-4" style={{ marginTop: "4mm" }}>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-xs font-semibold">{edu.degree}</p>
                <p className="text-xs text-gray-500">{edu.institution}, {edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div className="bg-pink-50 p-4" style={{ marginTop: "8mm" }}>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">Languages</h2>
            {languages.map((lang) => (
              <p key={lang.id} className="text-xs mb-1">{lang.name}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
