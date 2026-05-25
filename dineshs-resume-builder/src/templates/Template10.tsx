import type { ResumeData } from "@/types/resume";

export default function Template10({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[12mm] font-mono text-black">
      {/* Brutalist Header */}
      <div className="border-4 border-black p-6 mb-6">
        <h1 className="text-5xl font-bold uppercase tracking-tighter mb-2">{personalInfo.fullName}</h1>
        <p className="text-lg uppercase tracking-wide">{personalInfo.title}</p>
      </div>

      {/* Contact - Raw */}
      <div className="border-l-8 border-black pl-4 mb-8 py-2">
        <div className="text-sm space-y-1">
          {personalInfo.email && <div>EMAIL: {personalInfo.email}</div>}
          {personalInfo.phone && <div>PHONE: {personalInfo.phone}</div>}
          {personalInfo.location && <div>LOCATION: {personalInfo.location}</div>}
          {personalInfo.linkedin && <div>LINKEDIN: {personalInfo.linkedin}</div>}
          {personalInfo.website && <div>WEB: {personalInfo.website}</div>}
        </div>
      </div>

      {summary && (
        <div className="mb-8 border-2 border-black p-4">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-3 bg-black text-white inline-block px-2 py-1">Summary</h2>
          <p className="text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-4 border-b-4 border-black pb-2">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6 border-2 border-black p-4">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-bold text-lg">{exp.role}</h3>
                <span className="text-xs bg-black text-white px-2 py-1">{exp.from} - {exp.to}</span>
              </div>
              <p className="text-sm mb-3 uppercase">{exp.company} | {exp.location}</p>
              {exp.projects.map((project) => (
                <div key={project.id} className="mb-3 border-l-4 border-gray-400 pl-3">
                  <p className="text-sm font-bold mb-1">{project.title}</p>
                  <ul className="text-xs space-y-1">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx}>&gt; {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {skills.length > 0 && (
          <div className="border-2 border-black p-4">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs border-2 border-black px-2 py-1">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="border-2 border-black p-4">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-xs font-bold">{edu.degree}</p>
                <p className="text-xs">{edu.institution}, {edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div className="border-2 border-black p-4">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Languages</h2>
            {languages.map((lang) => (
              <p key={lang.id} className="text-xs mb-1">{lang.name} [{lang.proficiency}]</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
