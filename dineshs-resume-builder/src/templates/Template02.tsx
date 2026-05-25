import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export default function Template02({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages, certifications } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-[#2d2d2d] text-white p-[15mm] font-sans">
      <div className="flex gap-8">
        {/* Left Sidebar */}
        <div className="w-[65mm]">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-1 leading-tight">{personalInfo.fullName}</h1>
            <p className="text-sm text-[#c9a96e] font-medium tracking-wider uppercase">{personalInfo.title}</p>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#c9a96e] mb-4 border-b border-[#c9a96e]/30 pb-2">Contact</h3>
            <div className="space-y-3 text-sm">
              {personalInfo.email && <div className="flex items-center gap-2 text-gray-300"><Mail size={14} className="text-[#c9a96e]" /> {personalInfo.email}</div>}
              {personalInfo.phone && <div className="flex items-center gap-2 text-gray-300"><Phone size={14} className="text-[#c9a96e]" /> {personalInfo.phone}</div>}
              {personalInfo.location && <div className="flex items-center gap-2 text-gray-300"><MapPin size={14} className="text-[#c9a96e]" /> {personalInfo.location}</div>}
              {personalInfo.linkedin && <div className="flex items-center gap-2 text-gray-300"><Linkedin size={14} className="text-[#c9a96e]" /> {personalInfo.linkedin}</div>}
              {personalInfo.website && <div className="flex items-center gap-2 text-gray-300"><Globe size={14} className="text-[#c9a96e]" /> {personalInfo.website}</div>}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#c9a96e] mb-4 border-b border-[#c9a96e]/30 pb-2">Skills</h3>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full"></span>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#c9a96e] mb-4 border-b border-[#c9a96e]/30 pb-2">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="text-sm font-medium text-gray-200">{edu.degree}</p>
                  <p className="text-xs text-gray-400">{edu.institution}</p>
                  <p className="text-xs text-gray-500">{edu.year} | {edu.score}</p>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#c9a96e] mb-4 border-b border-[#c9a96e]/30 pb-2">Languages</h3>
              <div className="space-y-2 text-sm">
                {languages.map((lang) => (
                  <div key={lang.id} className="text-gray-300">{lang.name} <span className="text-gray-500">- {lang.proficiency}</span></div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex-1">
          {/* Summary */}
          {summary && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#c9a96e] mb-4 border-b border-[#c9a96e]/30 pb-2">Profile</h3>
              <p className="text-sm leading-relaxed text-gray-300">{summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#c9a96e] mb-4 border-b border-[#c9a96e]/30 pb-2">Experience</h3>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-white">{exp.role}</h4>
                    <span className="text-xs text-[#c9a96e]">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{exp.company} | {exp.location}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-3">
                      <p className="text-sm font-medium text-gray-300 mb-1">{project.title}</p>
                      <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
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

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#c9a96e] mb-4 border-b border-[#c9a96e]/30 pb-2">Certifications</h3>
              {certifications.map((cert) => (
                <div key={cert.id} className="text-sm text-gray-300 mb-2">
                  <span className="text-[#c9a96e]">{cert.name}</span> - {cert.organization}, {cert.year}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
