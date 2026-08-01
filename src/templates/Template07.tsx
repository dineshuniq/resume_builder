import type { ResumeData } from "@/types/resume";
import { getSectionTitle } from "@/lib/sectionTitles";
import { renderBoldText } from "@/lib/richText";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

export default function Template07({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages, certifications } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-gray-100 p-[10mm] font-sans text-gray-800">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{renderBoldText(personalInfo.fullName)}</h1>
        <p className="text-gray-500 mb-4">{renderBoldText(personalInfo.title)}</p>
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          {personalInfo.email && <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><Mail size={12} /> {renderBoldText(personalInfo.email)}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><Phone size={12} /> {renderBoldText(personalInfo.phone)}</span>}
          {personalInfo.location && <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><MapPin size={12} /> {renderBoldText(personalInfo.location)}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><Linkedin size={12} /> {renderBoldText(personalInfo.linkedin)}</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Summary Card */}
        {summary && (
          <div className="bg-white rounded-xl shadow-sm p-5 col-span-2">
            <h2 className="text-sm font-bold text-gray-800 mb-2">{getSectionTitle(data, "summary", "Professional Summary")}</h2>
            <p className="text-xs leading-relaxed text-gray-600">{renderBoldText(summary)}</p>
          </div>
        )}

        {/* Experience Cards */}
        {experience.map((exp) => (
          <div key={exp.id} className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-800 text-sm">{renderBoldText(exp.role)}</h3>
              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{exp.from} - {exp.to}</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">{renderBoldText(exp.company)} | {renderBoldText(exp.location)}</p>
            {exp.projects.map((project) => (
              <div key={project.id} className="mb-2">
                <p className="text-xs font-semibold text-gray-700">{renderBoldText(project.title)}</p>
                <ul className="text-xs text-gray-500 space-y-0.5 mt-1">
                  {project.bullets.map((bullet, idx) => (
                    <li key={idx}>- {renderBoldText(bullet)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        {/* Skills Card */}
        {skills.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-3">{getSectionTitle(data, "skills", "Skills")}</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md">{renderBoldText(skill.name)}</span>
              ))}
            </div>
          </div>
        )}

        {/* Education Card */}
        {education.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-3">{getSectionTitle(data, "education", "Education")}</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-xs font-semibold text-gray-700">{renderBoldText(edu.degree)}</p>
                <p className="text-xs text-gray-500">{renderBoldText(edu.institution)}</p>
                <p className="text-xs text-gray-400">{edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-3">{getSectionTitle(data, "languages", "Languages")}</h2>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span key={lang.id} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md">{renderBoldText(lang.name)}</span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-3">{getSectionTitle(data, "certifications", "Certifications")}</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="text-xs text-gray-600 mb-1">{renderBoldText(cert.name)} - {renderBoldText(cert.organization)}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
