import type { ResumeData } from "@/types/resume";
import { getSectionTitle } from "@/lib/sectionTitles";
import { renderBoldText } from "@/lib/richText";

export default function Template21({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-[#faf6f0] p-[12mm] font-serif text-[#3d2817]" 
      style={{ border: "8px solid #8b4513", outline: "2px solid #d4a574", outlineOffset: "4px" }}>
      
      {/* Ornate Header */}
      <div className="text-center mb-8 border-b-2 border-[#8b4513] pb-6">
        <div className="text-[#8b4513] text-2xl mb-2">&#10047; &#10047; &#10047;</div>
        <h1 className="text-4xl font-bold text-[#5a3010] mb-2">{renderBoldText(personalInfo.fullName)}</h1>
        <p className="text-lg text-[#8b4513] italic">{renderBoldText(personalInfo.title)}</p>
        <div className="flex justify-center flex-wrap gap-4 mt-4 text-sm text-[#6a5030]">
          {personalInfo.email && <span>{renderBoldText(personalInfo.email)}</span>}
          {personalInfo.phone && <span>{renderBoldText(personalInfo.phone)}</span>}
          {personalInfo.location && <span>{renderBoldText(personalInfo.location)}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-8 text-center max-w-[150mm] mx-auto">
          <div className="text-[#8b4513] text-xl mb-2">&#8220;</div>
          <p className="text-sm leading-relaxed italic text-[#5a4030]">{renderBoldText(summary)}</p>
          <div className="text-[#8b4513] text-xl mt-2">&#8221;</div>
        </div>
      )}

      <div className="flex gap-8">
        <div className="flex-1">
          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-center text-lg font-bold text-[#5a3010] mb-4">
                <span className="text-[#8b4513]">&#10047;</span> {getSectionTitle(data, "experience", "Experience")} <span className="text-[#8b4513]">&#10047;</span>
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6 border-l-2 border-[#d4a574] pl-4">
                  <h3 className="font-bold text-[#3d2817]">{renderBoldText(exp.role)}</h3>
                  <p className="text-sm text-[#8b4513] mb-1">{renderBoldText(exp.company)} | {exp.from} - {exp.to}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-2">
                      <p className="text-sm font-semibold text-[#5a4030]">{renderBoldText(project.title)}</p>
                      <ul className="text-xs text-[#6a5030] space-y-0.5">
                        {project.bullets.map((bullet, idx) => (
                          <li key={idx}>{renderBoldText(bullet)}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-[50mm]">
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-center text-sm font-bold text-[#5a3010] mb-3">{getSectionTitle(data, "skills", "Skills")}</h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs border border-[#8b4513] text-[#5a3010] px-2 py-1">{renderBoldText(skill.name)}</span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-6 text-center">
              <h2 className="text-sm font-bold text-[#5a3010] mb-3">{getSectionTitle(data, "education", "Education")}</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="text-xs font-semibold">{renderBoldText(edu.degree)}</p>
                  <p className="text-xs text-[#8b4513]">{renderBoldText(edu.institution)}</p>
                  <p className="text-xs text-[#a08060]">{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div className="text-center">
              <h2 className="text-sm font-bold text-[#5a3010] mb-3">{getSectionTitle(data, "languages", "Languages")}</h2>
              {languages.map((lang) => (
                <p key={lang.id} className="text-xs text-[#6a5030] mb-1">{renderBoldText(lang.name)}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
