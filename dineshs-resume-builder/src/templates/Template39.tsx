import type { ResumeData } from "@/types/resume";

export default function Template39({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-gray-50 p-[10mm] font-sans text-gray-800">
      {/* Pinterest Masonry Style */}
      <div className="mb-6 bg-white p-5 shadow-sm rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo.fullName}</h1>
        <p className="text-sm text-gray-500">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-400">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-4 bg-gradient-to-r from-pink-500 to-rose-400 p-5 rounded-lg shadow-sm text-white">
          <p className="text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      <div className="columns-3 gap-3">
        {experience.map((exp, idx) => (
          <div key={exp.id} className={`bg-white p-4 rounded-lg shadow-sm mb-3 break-inside-avoid ${idx % 3 === 0 ? '' : idx % 3 === 1 ? 'mt-6' : 'mt-3'}`}>
            <h3 className="font-bold text-sm text-gray-800 mb-1">{exp.role}</h3>
            <p className="text-xs text-gray-500 mb-2">{exp.company}</p>
            <p className="text-xs text-gray-400 mb-2">{exp.from} - {exp.to}</p>
            {exp.projects.map((project) => (
              <div key={project.id} className="mb-2">
                <p className="text-xs font-semibold text-gray-700">{project.title}</p>
                <ul className="text-xs text-gray-500 space-y-0.5">
                  {project.bullets.slice(0, 2).map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        {skills.length > 0 && (
          <div className="bg-indigo-500 p-4 rounded-lg shadow-sm mb-3 break-inside-avoid text-white">
            <h2 className="text-sm font-bold mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs bg-white/20 px-2 py-1 rounded">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {education.map((edu, idx) => (
          <div key={edu.id} className={`bg-white p-4 rounded-lg shadow-sm mb-3 break-inside-avoid ${idx % 2 === 0 ? 'mt-4' : ''}`}>
            <p className="text-xs font-semibold text-gray-700">{edu.degree}</p>
            <p className="text-xs text-gray-500">{edu.institution}</p>
            <p className="text-xs text-gray-400">{edu.year}</p>
          </div>
        ))}

        {languages.length > 0 && (
          <div className="bg-teal-500 p-4 rounded-lg shadow-sm mb-3 break-inside-avoid text-white mt-5">
            <h2 className="text-sm font-bold mb-2">Languages</h2>
            {languages.map((lang) => (
              <p key={lang.id} className="text-xs mb-1">{lang.name}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
