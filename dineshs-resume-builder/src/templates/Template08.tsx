import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export default function Template08({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[15mm] font-sans text-gray-800 relative overflow-hidden">
      {/* Decorative Geometric Shapes */}
      <div className="absolute top-0 right-0 w-[80mm] h-[80mm] bg-yellow-100 rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-[40mm] left-0 w-[40mm] h-[40mm] bg-blue-100 rounded-tr-full opacity-40"></div>
      <div className="absolute top-[120mm] right-[20mm] w-[20mm] h-[20mm] bg-red-100 rounded-full opacity-40"></div>
      <div className="absolute bottom-0 right-[60mm] w-[50mm] h-[50mm] bg-green-100 rounded-tl-full opacity-30"></div>

      {/* Header */}
      <div className="relative mb-10">
        <h1 className="text-5xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <p className="text-lg text-gray-600 mb-4">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={13} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={13} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={13} /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={13} /> {personalInfo.linkedin}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe size={13} /> {personalInfo.website}</span>}
        </div>
      </div>

      {/* Content Grid - Asymmetric */}
      <div className="relative flex gap-10">
        {/* Left - Wider */}
        <div className="w-[110mm]">
          {summary && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                About
              </h2>
              <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800">{exp.role}</h3>
                    <span className="text-xs text-gray-400">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{exp.company} | {exp.location}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-2">
                      <p className="text-sm font-medium text-gray-700">{project.title}</p>
                      <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
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

        {/* Right - Narrower */}
        <div className="w-[60mm]">
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="text-xs font-semibold text-gray-700">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.institution}</p>
                  <p className="text-xs text-gray-400">{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Languages
              </h2>
              {languages.map((lang) => (
                <p key={lang.id} className="text-xs text-gray-600 mb-1">{lang.name} - {lang.proficiency}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
