import type { ResumeData } from "@/types/resume";

export default function Template16({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-[#1e1e1e] text-[#4af626] p-[15mm] font-mono text-sm">
      {/* Terminal Header */}
      <div className="mb-6 border border-[#4af626] p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
          <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
          <span className="text-xs text-[#666] ml-2">resume.exe</span>
        </div>
        <p className="text-xs mb-1"><span className="text-[#4af626]">$</span> whoami</p>
        <h1 className="text-2xl font-bold text-white mb-1">{personalInfo.fullName}</h1>
        <p className="text-xs text-[#888]">{personalInfo.title}</p>
      </div>

      <div className="mb-4">
        <p className="text-xs"><span className="text-[#4af626]">$</span> cat contact.info</p>
        <div className="pl-4 text-xs text-[#888] space-y-1 mt-2">
          {personalInfo.email && <div>email: {personalInfo.email}</div>}
          {personalInfo.phone && <div>phone: {personalInfo.phone}</div>}
          {personalInfo.location && <div>location: {personalInfo.location}</div>}
          {personalInfo.linkedin && <div>linkedin: {personalInfo.linkedin}</div>}
        </div>
      </div>

      {summary && (
        <div className="mb-4">
          <p className="text-xs"><span className="text-[#4af626]">$</span> cat summary.txt</p>
          <p className="pl-4 text-xs text-[#aaa] mt-2 leading-relaxed">{summary}</p>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-4">
          <p className="text-xs"><span className="text-[#4af626]">$</span> ls skills/</p>
          <div className="pl-4 flex flex-wrap gap-2 mt-2">
            {skills.map((skill) => (
              <span key={skill.id} className="text-xs text-[#4af626]">{skill.name}.skill</span>
            ))}
          </div>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-4">
          <p className="text-xs"><span className="text-[#4af626]">$</span> cat experience.log</p>
          {experience.map((exp) => (
            <div key={exp.id} className="pl-4 mt-3 mb-4 border-l border-[#333]">
              <p className="text-xs text-white font-bold">[{exp.from} - {exp.to}] {exp.role}</p>
              <p className="text-xs text-[#666]">@{exp.company} | {exp.location}</p>
              {exp.projects.map((project) => (
                <div key={project.id} className="mt-2">
                  <p className="text-xs text-[#888]">&gt; {project.title}</p>
                  <ul className="text-xs text-[#555] space-y-0.5 mt-1">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx}>- {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {education.length > 0 && (
          <div>
            <p className="text-xs"><span className="text-[#4af626]">$</span> cat education.json</p>
            {education.map((edu) => (
              <div key={edu.id} className="pl-4 mt-2">
                <p className="text-xs text-[#aaa]">{"{"}</p>
                <p className="text-xs text-[#888] pl-2">"degree": "{edu.degree}"</p>
                <p className="text-xs text-[#888] pl-2">"school": "{edu.institution}"</p>
                <p className="text-xs text-[#888] pl-2">"year": "{edu.year}"</p>
                <p className="text-xs text-[#aaa]">{"}"}</p>
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <p className="text-xs"><span className="text-[#4af626]">$</span> echo $LANGUAGES</p>
            <div className="pl-4 mt-2 text-xs text-[#888]">
              {languages.map((lang) => (
                <p key={lang.id}>{lang.name}={lang.proficiency}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-xs mt-6"><span className="text-[#4af626]">$</span> <span className="animate-pulse">_</span></p>
    </div>
  );
}
