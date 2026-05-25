import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export default function Template01({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages, certifications } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[15mm] font-sans text-gray-800">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <p className="text-lg text-gray-500 font-light mb-4">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={13} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={13} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={13} /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={13} /> {personalInfo.linkedin}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe size={13} /> {personalInfo.website}</span>}
        </div>
      </div>

      <hr className="border-gray-200 mb-8" />

      {/* Summary */}
      {summary && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-semibold text-gray-800">{exp.role}</h3>
                <span className="text-xs text-gray-400">{exp.from} - {exp.to}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{exp.company} | {exp.location}</p>
              {exp.projects.map((project) => (
                <div key={project.id} className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">{project.title}</p>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
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

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-gray-800 text-sm">{edu.degree}</h3>
                <span className="text-xs text-gray-400">{edu.year}</span>
              </div>
              <p className="text-sm text-gray-500">{edu.institution} <span className="text-gray-300">|</span> {edu.score}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full">{skill.name}</span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Languages</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            {languages.map((lang) => (
              <span key={lang.id} className="text-gray-600">{lang.name} <span className="text-gray-400">({lang.proficiency})</span></span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="text-sm text-gray-600 mb-1">
              {cert.name} <span className="text-gray-400">- {cert.organization}, {cert.year}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
