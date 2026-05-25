import type { ResumeData } from "@/types/resume";

export default function Template15({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-[#faf8f5] p-[15mm] font-serif text-[#3d3229]">
      {/* Organic Header */}
      <div className="relative mb-10">
        <div className="absolute -top-4 -left-4 w-[80mm] h-[40mm] bg-[#e8ddd0] rounded-full opacity-50 blur-xl"></div>
        <div className="relative">
          <h1 className="text-5xl font-bold text-[#5a4a3a] mb-2">{personalInfo.fullName}</h1>
          <p className="text-lg text-[#8a7a6a] italic">{personalInfo.title}</p>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Left Sidebar */}
        <div className="w-[55mm]">
          <div className="mb-8 space-y-2 text-sm text-[#6a5a4a]">
            {personalInfo.email && <div className="border-b border-[#d8ccc0] pb-2">{personalInfo.email}</div>}
            {personalInfo.phone && <div className="border-b border-[#d8ccc0] pb-2">{personalInfo.phone}</div>}
            {personalInfo.location && <div className="border-b border-[#d8ccc0] pb-2">{personalInfo.location}</div>}
          </div>

          {skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-[#7a6a5a] mb-3 uppercase tracking-wider">Skills</h3>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-sm text-[#5a4a3a] flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#b8a890] rounded-full"></span>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-[#7a6a5a] mb-3 uppercase tracking-wider">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="text-sm font-semibold">{edu.degree}</p>
                  <p className="text-xs text-[#8a7a6a]">{edu.institution}</p>
                  <p className="text-xs text-[#aaa090]">{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-[#7a6a5a] mb-3 uppercase tracking-wider">Languages</h3>
              {languages.map((lang) => (
                <p key={lang.id} className="text-sm text-[#5a4a3a] mb-1">{lang.name} - {lang.proficiency}</p>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {summary && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
              <p className="text-sm leading-relaxed text-[#5a4a3a]">{summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-[#5a4a3a] mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#b8a890]"></span>
                Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6 pb-6 border-b border-[#e8ddd0]">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-[#3d3229]">{exp.role}</h3>
                    <span className="text-xs text-[#9a8a7a] bg-[#f0ebe4] px-2 py-1 rounded">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-sm text-[#7a6a5a] mb-3">{exp.company} | {exp.location}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-3">
                      <p className="text-sm font-semibold text-[#5a4a3a] mb-1">{project.title}</p>
                      <ul className="list-disc list-inside text-xs text-[#7a6a5a] space-y-1">
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
