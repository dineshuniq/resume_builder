import type { ResumeData } from "@/types/resume";
import { getSectionTitle } from "@/lib/sectionTitles";
import { renderBoldText } from "@/lib/richText";

export default function Template30({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[15mm] font-sans text-gray-800">
      {/* Line Art - Thin elegant lines */}
      <div className="mb-8 border-b border-gray-300 pb-6">
        <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-2">{renderBoldText(personalInfo.fullName)}</h1>
        <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">{renderBoldText(personalInfo.title)}</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8 border-b border-gray-200 pb-6 text-sm text-gray-600">
        {personalInfo.email && <div className="border-r border-gray-200 pr-4">{renderBoldText(personalInfo.email)}</div>}
        {personalInfo.phone && <div className="border-r border-gray-200 pr-4">{renderBoldText(personalInfo.phone)}</div>}
        {personalInfo.location && <div className="border-r border-gray-200 pr-4">{renderBoldText(personalInfo.location)}</div>}
        {personalInfo.linkedin && <div>{renderBoldText(personalInfo.linkedin)}</div>}
      </div>

      {summary && (
        <div className="mb-8 border-l border-gray-400 pl-6">
          <p className="text-sm leading-relaxed text-gray-600">{renderBoldText(summary)}</p>
        </div>
      )}

      <div className="flex gap-10">
        <div className="flex-1">
          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-6 border-b border-gray-200 pb-2">{getSectionTitle(data, "experience", "Experience")}</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-800">{renderBoldText(exp.role)}</h3>
                    <span className="text-xs text-gray-400">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{renderBoldText(exp.company)} | {renderBoldText(exp.location)}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-3">
                      <p className="text-xs font-semibold text-gray-700 mb-1">{renderBoldText(project.title)}</p>
                      <ul className="text-xs text-gray-500 space-y-1">
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

        <div className="w-[50mm] border-l border-gray-200 pl-6">
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-3 border-b border-gray-200 pb-2">{getSectionTitle(data, "skills", "Skills")}</h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-sm text-gray-600">{renderBoldText(skill.name)}</div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-3 border-b border-gray-200 pb-2">{getSectionTitle(data, "education", "Education")}</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="text-xs font-semibold text-gray-700">{renderBoldText(edu.degree)}</p>
                  <p className="text-xs text-gray-500">{renderBoldText(edu.institution)}</p>
                  <p className="text-xs text-gray-400">{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-3 border-b border-gray-200 pb-2">{getSectionTitle(data, "languages", "Languages")}</h2>
              {languages.map((lang) => (
                <p key={lang.id} className="text-xs text-gray-600 mb-1">{renderBoldText(lang.name)}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
