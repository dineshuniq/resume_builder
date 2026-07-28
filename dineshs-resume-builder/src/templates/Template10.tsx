import type { ResumeData } from "@/types/resume";
import { getSectionTitle } from "@/lib/sectionTitles";
import { renderBoldText } from "@/lib/richText";

export default function Template10({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[12mm] font-mono text-black">
      {/* Brutalist Header */}
      <div className="border-4 border-black p-6 mb-6">
        <h1 className="text-5xl font-bold uppercase tracking-tighter mb-2">{renderBoldText(personalInfo.fullName)}</h1>
        <p className="text-lg uppercase tracking-wide">{renderBoldText(personalInfo.title)}</p>
      </div>

      {/* Contact - Raw */}
      <div className="border-l-8 border-black pl-4 mb-8 py-2">
        <div className="text-sm space-y-1">
          {personalInfo.email && <div>EMAIL: {renderBoldText(personalInfo.email)}</div>}
          {personalInfo.phone && <div>PHONE: {renderBoldText(personalInfo.phone)}</div>}
          {personalInfo.location && <div>LOCATION: {renderBoldText(personalInfo.location)}</div>}
          {personalInfo.linkedin && <div>LINKEDIN: {renderBoldText(personalInfo.linkedin)}</div>}
          {personalInfo.website && <div>WEB: {renderBoldText(personalInfo.website)}</div>}
        </div>
      </div>

      {summary && (
        <div className="mb-8 border-2 border-black p-4">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-3 bg-black text-white inline-block px-2 py-1">{getSectionTitle(data, "summary", "Summary")}</h2>
          <p className="text-sm leading-relaxed">{renderBoldText(summary)}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-4 border-b-4 border-black pb-2">{getSectionTitle(data, "experience", "Experience")}</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6 border-2 border-black p-4">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-bold text-lg">{renderBoldText(exp.role)}</h3>
                <span className="text-xs bg-black text-white px-2 py-1">{exp.from} - {exp.to}</span>
              </div>
              <p className="text-sm mb-3 uppercase">{renderBoldText(exp.company)} | {renderBoldText(exp.location)}</p>
              {exp.projects.map((project) => (
                <div key={project.id} className="mb-3 border-l-4 border-gray-400 pl-3">
                  <p className="text-sm font-bold mb-1">{renderBoldText(project.title)}</p>
                  <ul className="text-xs space-y-1">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx}>&gt; {renderBoldText(bullet)}</li>
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
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3">{getSectionTitle(data, "skills", "Skills")}</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs border-2 border-black px-2 py-1">{renderBoldText(skill.name)}</span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="border-2 border-black p-4">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3">{getSectionTitle(data, "education", "Education")}</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-xs font-bold">{renderBoldText(edu.degree)}</p>
                <p className="text-xs">{renderBoldText(edu.institution)}, {edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div className="border-2 border-black p-4">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3">{getSectionTitle(data, "languages", "Languages")}</h2>
            {languages.map((lang) => (
              <p key={lang.id} className="text-xs mb-1">{renderBoldText(lang.name)} [{lang.proficiency}]</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
