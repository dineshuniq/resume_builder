import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

export default function Template07({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages, certifications } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-gray-100 p-[10mm] font-sans text-gray-800">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo.fullName}</h1>
        <p className="text-gray-500 mb-4">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          {personalInfo.email && <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><Mail size={12} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><Phone size={12} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><MapPin size={12} /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><Linkedin size={12} /> {personalInfo.linkedin}</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Summary Card */}
        {summary && (
          <div className="bg-white rounded-xl shadow-sm p-5 col-span-2">
            <h2 className="text-sm font-bold text-gray-800 mb-2">Professional Summary</h2>
            <p className="text-xs leading-relaxed text-gray-600">{summary}</p>
          </div>
        )}

        {/* Experience Cards */}
        {experience.map((exp) => (
          <div key={exp.id} className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-800 text-sm">{exp.role}</h3>
              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{exp.from} - {exp.to}</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">{exp.company} | {exp.location}</p>
            {exp.projects.map((project) => (
              <div key={project.id} className="mb-2">
                <p className="text-xs font-semibold text-gray-700">{project.title}</p>
                <ul className="text-xs text-gray-500 space-y-0.5 mt-1">
                  {project.bullets.map((bullet, idx) => (
                    <li key={idx}>- {bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        {/* Skills Card */}
        {skills.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {/* Education Card */}
        {education.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-xs font-semibold text-gray-700">{edu.degree}</p>
                <p className="text-xs text-gray-500">{edu.institution}</p>
                <p className="text-xs text-gray-400">{edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span key={lang.id} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md">{lang.name}</span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="text-xs text-gray-600 mb-1">{cert.name} - {cert.organization}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
