import type { ResumeData } from "@/types/resume";

export default function Template25({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-[#0a0a0a] p-[15mm] font-sans text-white" 
      style={{ backgroundImage: "repeating-linear-gradient(45deg, #111 0, #111 2px, transparent 0, transparent 50%)", backgroundSize: "10px 10px" }}>
      
      {/* Art Deco Header */}
      <div className="text-center mb-10 border-2 border-[#c9a96e] p-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-4">
          <div className="flex gap-2">
            <span className="w-2 h-2 bg-[#c9a96e] rotate-45"></span>
            <span className="w-2 h-2 bg-[#c9a96e] rotate-45"></span>
            <span className="w-2 h-2 bg-[#c9a96e] rotate-45"></span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-[#c9a96e] uppercase tracking-[0.2em] mb-2">{personalInfo.fullName}</h1>
        <div className="w-[40mm] h-[1px] bg-[#c9a96e] mx-auto mb-3"></div>
        <p className="text-sm text-[#c9a96e] uppercase tracking-[0.3em]">{personalInfo.title}</p>
      </div>

      <div className="flex gap-8">
        <div className="w-[55mm]">
          <div className="mb-6 space-y-2 text-xs text-[#888]">
            {personalInfo.email && <div className="border-b border-[#333] pb-2">{personalInfo.email}</div>}
            {personalInfo.phone && <div className="border-b border-[#333] pb-2">{personalInfo.phone}</div>}
            {personalInfo.location && <div className="border-b border-[#333] pb-2">{personalInfo.location}</div>}
          </div>

          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold text-[#c9a96e] uppercase tracking-[0.3em] mb-3 text-center">&#9670; Skills &#9670;</h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-xs text-[#aaa] text-center border border-[#333] py-1">{skill.name}</div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold text-[#c9a96e] uppercase tracking-[0.3em] mb-3 text-center">&#9670; Education &#9670;</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2 text-center">
                  <p className="text-xs text-[#ccc]">{edu.degree}</p>
                  <p className="text-xs text-[#888]">{edu.institution}</p>
                  <p className="text-xs text-[#666]">{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-[#c9a96e] uppercase tracking-[0.3em] mb-3 text-center">&#9670; Languages &#9670;</h2>
              {languages.map((lang) => (
                <p key={lang.id} className="text-xs text-[#aaa] text-center">{lang.name}</p>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 border-l border-[#333] pl-8">
          {summary && (
            <div className="mb-8">
              <h2 className="text-xs font-bold text-[#c9a96e] uppercase tracking-[0.3em] mb-3">&#9670; Profile &#9670;</h2>
              <p className="text-sm leading-relaxed text-[#bbb]">{summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-[#c9a96e] uppercase tracking-[0.3em] mb-4">&#9670; Experience &#9670;</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6">
                  <h3 className="font-bold text-[#ddd] mb-1">{exp.role}</h3>
                  <p className="text-xs text-[#c9a96e] mb-1">{exp.company} | {exp.from} - {exp.to}</p>
                  <p className="text-xs text-[#666] mb-2">{exp.location}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-2">
                      <p className="text-xs font-semibold text-[#999]">{project.title}</p>
                      <ul className="text-xs text-[#777] space-y-0.5">
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
      </div>
    </div>
  );
}
