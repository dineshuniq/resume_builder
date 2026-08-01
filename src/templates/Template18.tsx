import type { ResumeData } from "@/types/resume";
import { getSectionTitle } from "@/lib/sectionTitles";
import { renderBoldText } from "@/lib/richText";

export default function Template18({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[15mm] font-sans text-gray-800">
      {/* Asymmetric Header - pushed right */}
      <div className="ml-[40mm] mb-12">
        <h1 className="text-6xl font-bold text-gray-900 leading-none mb-3">{renderBoldText(personalInfo.fullName)}</h1>
        <p className="text-xl text-gray-400 font-light tracking-[0.3em] uppercase">{renderBoldText(personalInfo.title)}</p>
        <div className="mt-6 space-y-1 text-sm text-gray-500">
          {personalInfo.email && <div>{renderBoldText(personalInfo.email)}</div>}
          {personalInfo.phone && <div>{renderBoldText(personalInfo.phone)}</div>}
          {personalInfo.location && <div>{renderBoldText(personalInfo.location)}</div>}
          {personalInfo.linkedin && <div>{renderBoldText(personalInfo.linkedin)}</div>}
        </div>
      </div>

      {summary && (
        <div className="ml-[60mm] mb-12 max-w-[100mm]">
          <p className="text-sm leading-loose text-gray-600">{renderBoldText(summary)}</p>
        </div>
      )}

      <div className="flex gap-12">
        {/* Left - empty space for asymmetry */}
        <div className="w-[30mm]"></div>

        {/* Right - content */}
        <div className="flex-1">
          {experience.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-gray-400 mb-6">{getSectionTitle(data, "experience", "Experience")}</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-8 flex gap-6">
                  <div className="w-[25mm] text-right shrink-0">
                    <p className="text-xs text-gray-400">{exp.from}</p>
                    <p className="text-xs text-gray-400">{exp.to}</p>
                  </div>
                  <div className="border-l border-gray-200 pl-6">
                    <h3 className="font-bold text-gray-800 mb-1">{renderBoldText(exp.role)}</h3>
                    <p className="text-sm text-gray-500 mb-3">{renderBoldText(exp.company)} | {renderBoldText(exp.location)}</p>
                    {exp.projects.map((project) => (
                      <div key={project.id} className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">{renderBoldText(project.title)}</p>
                        <ul className="text-xs text-gray-500 space-y-1">
                          {project.bullets.map((bullet, idx) => (
                            <li key={idx}>{renderBoldText(bullet)}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-8">
            {skills.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-gray-400 mb-4">{getSectionTitle(data, "skills", "Skills")}</h2>
                <div className="space-y-1">
                  {skills.map((skill) => (
                    <p key={skill.id} className="text-sm text-gray-600">{renderBoldText(skill.name)}</p>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-gray-400 mb-4">{getSectionTitle(data, "education", "Education")}</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <p className="text-sm font-semibold text-gray-700">{renderBoldText(edu.degree)}</p>
                    <p className="text-xs text-gray-500">{renderBoldText(edu.institution)}, {edu.year}</p>
                  </div>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-gray-400 mb-4">{getSectionTitle(data, "languages", "Languages")}</h2>
                {languages.map((lang) => (
                  <p key={lang.id} className="text-sm text-gray-600">{renderBoldText(lang.name)}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
