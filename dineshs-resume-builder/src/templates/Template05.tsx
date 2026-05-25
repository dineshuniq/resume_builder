import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export default function Template05({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages, certifications } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] flex font-sans text-gray-800">
      {/* Left Column - Dark */}
      <div className="w-1/2 bg-gray-900 text-white p-[15mm]">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
          <p className="text-sm text-gray-400">{personalInfo.title}</p>
        </div>

        <div className="mb-8 space-y-3 text-sm">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Contact</h3>
          {personalInfo.email && <div className="flex items-center gap-2 text-gray-300"><Mail size={14} /> {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-2 text-gray-300"><Phone size={14} /> {personalInfo.phone}</div>}
          {personalInfo.location && <div className="flex items-center gap-2 text-gray-300"><MapPin size={14} /> {personalInfo.location}</div>}
          {personalInfo.linkedin && <div className="flex items-center gap-2 text-gray-300"><Linkedin size={14} /> {personalInfo.linkedin}</div>}
          {personalInfo.website && <div className="flex items-center gap-2 text-gray-300"><Globe size={14} /> {personalInfo.website}</div>}
        </div>

        {skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs border border-gray-600 px-3 py-1 rounded-full">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Languages</h3>
            {languages.map((lang) => (
              <div key={lang.id} className="text-sm text-gray-300 mb-1">{lang.name} - {lang.proficiency}</div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Certifications</h3>
            {certifications.map((cert) => (
              <div key={cert.id} className="text-sm text-gray-300 mb-2">{cert.name} - {cert.organization}</div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column - Light */}
      <div className="w-1/2 bg-gray-50 p-[15mm]">
        {summary && (
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-3">Summary</h2>
            <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-4">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-800 text-sm">{exp.role}</h3>
                  <span className="text-xs text-gray-400">{exp.from} - {exp.to}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
                {exp.projects.map((project) => (
                  <div key={project.id} className="mb-2">
                    <p className="text-xs font-semibold text-gray-700 mb-1">{project.title}</p>
                    <ul className="list-disc list-inside text-xs text-gray-500 space-y-0.5">
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

        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-4">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="text-sm font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-xs text-gray-500">{edu.institution}, {edu.year}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
