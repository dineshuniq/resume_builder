import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export default function Template11({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-[#fef9f3] p-[15mm] font-sans text-gray-800">
      {/* Soft Header */}
      <div className="bg-[#e8f4f0] rounded-3xl p-8 mb-6">
        <h1 className="text-4xl font-bold text-[#2d5a4c] mb-2">{personalInfo.fullName}</h1>
        <p className="text-lg text-[#5a8a7a]">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-3 mt-4 text-sm text-[#7aaa9a]">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={13} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={13} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={13} /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={13} /> {personalInfo.linkedin}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe size={13} /> {personalInfo.website}</span>}
        </div>
      </div>

      {summary && (
        <div className="bg-[#fdf2f0] rounded-2xl p-6 mb-6">
          <p className="text-sm leading-relaxed text-[#8a6a5a]">{summary}</p>
        </div>
      )}

      <div className="flex gap-6">
        <div className="flex-1">
          {experience.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
              <h2 className="text-sm font-bold text-[#5a4a8a] mb-4 uppercase tracking-wider">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800">{exp.role}</h3>
                    <span className="text-xs text-gray-400">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-sm text-[#7a6aaa] mb-2">{exp.company}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-2">
                      <p className="text-xs font-semibold text-gray-600">{project.title}</p>
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
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#5a4a8a] mb-3 uppercase tracking-wider">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="text-sm font-semibold text-gray-700">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.institution}, {edu.year}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-[60mm]">
          {skills.length > 0 && (
            <div className="bg-[#f0f4ff] rounded-2xl p-5 mb-4">
              <h2 className="text-sm font-bold text-[#4a5a8a] mb-3 uppercase tracking-wider">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs bg-white text-[#5a6aaa] px-3 py-1.5 rounded-xl shadow-sm">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="bg-[#fff5f5] rounded-2xl p-5">
              <h2 className="text-sm font-bold text-[#8a4a5a] mb-3 uppercase tracking-wider">Languages</h2>
              {languages.map((lang) => (
                <p key={lang.id} className="text-xs text-[#9a6a7a] mb-1">{lang.name} - {lang.proficiency}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
