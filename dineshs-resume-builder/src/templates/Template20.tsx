import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe, Camera } from "lucide-react";

export default function Template20({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white font-sans text-gray-800">
      {/* Photo Header Area */}
      <div className="h-[85mm] bg-gradient-to-br from-gray-800 to-gray-900 relative flex items-end p-[15mm]">
        <div className="absolute top-[15mm] right-[15mm] w-[50mm] h-[50mm] bg-gray-700 rounded-lg flex items-center justify-center border-4 border-white/20">
          <Camera size={32} className="text-gray-500" />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white mb-2">{personalInfo.fullName}</h1>
          <p className="text-xl text-gray-300">{personalInfo.title}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
            {personalInfo.email && <span className="flex items-center gap-1"><Mail size={13} /> {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={13} /> {personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={13} /> {personalInfo.location}</span>}
            {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={13} /> {personalInfo.linkedin}</span>}
            {personalInfo.website && <span className="flex items-center gap-1"><Globe size={13} /> {personalInfo.website}</span>}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[20mm] bg-gradient-to-t from-white/10 to-transparent"></div>
      </div>

      <div className="p-[15mm] pt-8">
        {summary && (
          <div className="mb-8">
            <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
          </div>
        )}

        <div className="flex gap-8">
          <div className="flex-1">
            {experience.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gray-800 rounded"></span>
                  Experience
                </h2>
                {experience.map((exp) => (
                  <div key={exp.id} className="mb-6">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-800">{exp.role}</h3>
                      <span className="text-xs text-gray-400">{exp.from} - {exp.to}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{exp.company} | {exp.location}</p>
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
          </div>

          <div className="w-[60mm]">
            {skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill.id} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">{skill.name}</span>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <p className="text-sm font-semibold text-gray-700">{edu.degree}</p>
                    <p className="text-xs text-gray-500">{edu.institution}</p>
                    <p className="text-xs text-gray-400">{edu.year}</p>
                  </div>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Languages</h2>
                {languages.map((lang) => (
                  <p key={lang.id} className="text-sm text-gray-600 mb-1">{lang.name} - {lang.proficiency}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
