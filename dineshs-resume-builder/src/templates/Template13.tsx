import type { ResumeData } from "@/types/resume";

export default function Template13({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[12mm] font-sans text-black">
      {/* Swiss Grid Header */}
      <div className="grid grid-cols-4 gap-4 mb-8 border-b-2 border-black pb-4">
        <div className="col-span-3">
          <h1 className="text-3xl font-bold uppercase tracking-tight">{personalInfo.fullName}</h1>
          <p className="text-sm uppercase tracking-widest text-red-600 mt-1">{personalInfo.title}</p>
        </div>
        <div className="text-xs text-right space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
        </div>
      </div>

      {summary && (
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="col-span-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-600">Profile</h2>
          </div>
          <div className="col-span-3">
            <p className="text-sm leading-relaxed">{summary}</p>
          </div>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-4 mb-4 border-t border-gray-200 pt-4">
            <div className="col-span-1">
              <h2 className="text-xs font-bold uppercase tracking-widest text-red-600">Experience</h2>
            </div>
            <div className="col-span-3"></div>
          </div>
          {experience.map((exp) => (
            <div key={exp.id} className="grid grid-cols-4 gap-4 mb-6">
              <div className="col-span-1">
                <p className="text-xs font-medium">{exp.from} - {exp.to}</p>
                <p className="text-xs text-gray-500">{exp.company}</p>
              </div>
              <div className="col-span-3">
                <h3 className="font-bold text-sm mb-1">{exp.role}</h3>
                <p className="text-xs text-gray-500 mb-2">{exp.location}</p>
                {exp.projects.map((project) => (
                  <div key={project.id} className="mb-2">
                    <p className="text-xs font-semibold">{project.title}</p>
                    <ul className="text-xs text-gray-600 space-y-0.5">
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

      <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-6">
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs bg-black text-white px-2 py-1">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-xs font-bold">{edu.degree}</p>
                <p className="text-xs text-gray-600">{edu.institution}, {edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">Languages</h2>
            {languages.map((lang) => (
              <p key={lang.id} className="text-xs mb-1">{lang.name} ({lang.proficiency})</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
