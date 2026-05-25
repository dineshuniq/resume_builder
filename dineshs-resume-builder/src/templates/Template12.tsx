import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

export default function Template12({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-[#0a0a0a] text-white p-[15mm] font-sans">
      {/* Neon Header */}
      <div className="mb-8 border border-[#00ffff] p-6" style={{ boxShadow: "0 0 20px rgba(0,255,255,0.3)" }}>
        <h1 className="text-4xl font-bold text-[#00ffff] mb-2" style={{ textShadow: "0 0 10px rgba(0,255,255,0.5)" }}>{personalInfo.fullName}</h1>
        <p className="text-[#ff00ff] font-medium">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
          {personalInfo.email && <span className="flex items-center gap-1 text-[#00ffff]"><Mail size={13} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1 text-[#ff00ff]"><Phone size={13} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1 text-gray-500"><MapPin size={13} /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1 text-[#00ffff]"><Linkedin size={13} /> {personalInfo.linkedin}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-8 border-l-2 border-[#ff00ff] pl-4">
          <p className="text-sm leading-relaxed text-gray-300">{summary}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-[#00ffff] mb-4 uppercase tracking-widest border-b border-[#00ffff]/30 pb-2">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6 border border-gray-800 p-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-white">{exp.role}</h3>
                    <span className="text-xs text-[#ff00ff]">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{exp.company} | {exp.location}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-3">
                      <p className="text-sm font-medium text-[#00ffff] mb-1">{project.title}</p>
                      <ul className="list-disc list-inside text-xs text-gray-500 space-y-1">
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
        </div>

        <div>
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-[#ff00ff] mb-3 uppercase tracking-widest border-b border-[#ff00ff]/30 pb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs border border-[#00ffff] text-[#00ffff] px-2 py-1">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-[#00ffff] mb-3 uppercase tracking-widest border-b border-[#00ffff]/30 pb-2">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="text-xs font-medium text-white">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.institution}</p>
                  <p className="text-xs text-gray-600">{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-[#ff00ff] mb-3 uppercase tracking-widest border-b border-[#ff00ff]/30 pb-2">Languages</h2>
              {languages.map((lang) => (
                <p key={lang.id} className="text-xs text-gray-400 mb-1">{lang.name}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
