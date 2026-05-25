import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export default function Template04({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages, certifications } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] flex font-sans text-gray-800">
      {/* Navy Sidebar */}
      <div className="w-[70mm] bg-[#1e3a5f] text-white p-[12mm]">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1 leading-tight">{personalInfo.fullName}</h1>
          <p className="text-sm text-blue-200">{personalInfo.title}</p>
        </div>

        <div className="mb-8 space-y-3 text-sm">
          {personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} className="text-blue-300" /> {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} className="text-blue-300" /> {personalInfo.phone}</div>}
          {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={14} className="text-blue-300" /> {personalInfo.location}</div>}
          {personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={14} className="text-blue-300" /> {personalInfo.linkedin}</div>}
          {personalInfo.website && <div className="flex items-center gap-2"><Globe size={14} className="text-blue-300" /> {personalInfo.website}</div>}
        </div>

        {skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-3 border-b border-blue-400/30 pb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs bg-white/10 px-2 py-1 rounded">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-3 border-b border-blue-400/30 pb-2">Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <p className="text-sm font-medium">{edu.degree}</p>
                <p className="text-xs text-blue-200">{edu.institution}</p>
                <p className="text-xs text-blue-300">{edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-3 border-b border-blue-400/30 pb-2">Languages</h3>
            {languages.map((lang) => (
              <div key={lang.id} className="text-sm mb-1">{lang.name} <span className="text-blue-300">({lang.proficiency})</span></div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-[15mm] bg-white">
        {summary && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1e3a5f] mb-3">Professional Summary</h2>
            <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1e3a5f] mb-4">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-800">{exp.role}</h3>
                  <span className="text-xs text-gray-400">{exp.from} - {exp.to}</span>
                </div>
                <p className="text-sm text-[#1e3a5f] mb-2">{exp.company} | {exp.location}</p>
                {exp.projects.map((project) => (
                  <div key={project.id} className="mb-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">{project.title}</p>
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

        {certifications.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1e3a5f] mb-3">Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="text-sm text-gray-600 mb-1">
                <span className="font-semibold text-[#1e3a5f]">{cert.name}</span> - {cert.organization}, {cert.year}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
