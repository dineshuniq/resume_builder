import type { ResumeData } from "@/types/resume";
import { getSectionTitle } from "@/lib/sectionTitles";
import { renderBoldText } from "@/lib/richText";

export default function Template31({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[15mm] font-sans text-gray-800" 
      style={{ backgroundImage: "radial-gradient(circle, #e0e0e0 1px, transparent 1px)", backgroundSize: "8mm 8mm" }}>
      
      <div className="bg-white p-6 shadow-sm mb-6 relative">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{renderBoldText(personalInfo.fullName)}</h1>
        <p className="text-lg text-gray-500">{renderBoldText(personalInfo.title)}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
          {personalInfo.email && <span>{renderBoldText(personalInfo.email)}</span>}
          {personalInfo.phone && <span>{renderBoldText(personalInfo.phone)}</span>}
          {personalInfo.location && <span>{renderBoldText(personalInfo.location)}</span>}
        </div>
      </div>

      {summary && (
        <div className="bg-white p-6 shadow-sm mb-6 border border-dashed border-gray-300">
          <p className="text-sm leading-relaxed">{renderBoldText(summary)}</p>
        </div>
      )}

      <div className="flex gap-6">
        <div className="flex-1">
          {experience.length > 0 && (
            <div className="bg-white p-6 shadow-sm mb-6 border border-dashed border-gray-300">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-dashed border-gray-300 pb-2">{getSectionTitle(data, "experience", "Experience")}</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold">{renderBoldText(exp.role)}</h3>
                    <span className="text-xs text-gray-400">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{renderBoldText(exp.company)} | {renderBoldText(exp.location)}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-2">
                      <p className="text-xs font-semibold">{renderBoldText(project.title)}</p>
                      <ul className="text-xs text-gray-500 space-y-0.5">
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

          {education.length > 0 && (
            <div className="bg-white p-6 shadow-sm border border-dashed border-gray-300">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-dashed border-gray-300 pb-2">{getSectionTitle(data, "education", "Education")}</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="text-sm font-semibold">{renderBoldText(edu.degree)}</p>
                  <p className="text-xs text-gray-500">{renderBoldText(edu.institution)}, {edu.year}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-[55mm]">
          {skills.length > 0 && (
            <div className="bg-white p-5 shadow-sm mb-4 border border-dashed border-gray-300">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-dashed border-gray-300 pb-2">{getSectionTitle(data, "skills", "Skills")}</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs border border-dashed border-gray-400 px-2 py-1">{renderBoldText(skill.name)}</span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="bg-white p-5 shadow-sm border border-dashed border-gray-300">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-dashed border-gray-300 pb-2">{getSectionTitle(data, "languages", "Languages")}</h2>
              {languages.map((lang) => (
                <p key={lang.id} className="text-xs mb-1">{renderBoldText(lang.name)}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
