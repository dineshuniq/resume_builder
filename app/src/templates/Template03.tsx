import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export default function Template03({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages, certifications } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white font-sans text-gray-800">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-[15mm] pb-10 text-white">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
        <p className="text-lg font-medium opacity-90">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm opacity-80">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={14} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={14} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={14} /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={14} /> {personalInfo.linkedin}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe size={14} /> {personalInfo.website}</span>}
        </div>
      </div>

      <div className="p-[15mm] pt-8">
        {/* Summary */}
        {summary && (
          <div className="mb-8">
            <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></span>
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6 border-l-4 border-purple-400 pl-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-800">{exp.role}</h3>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">{exp.from} - {exp.to}</span>
                </div>
                <p className="text-sm text-purple-600 mb-2">{exp.company} | {exp.location}</p>
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

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded"></span>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 flex justify-between items-baseline">
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">{edu.degree}</h3>
                  <p className="text-sm text-gray-500">{edu.institution}</p>
                </div>
                <span className="text-xs text-gray-400">{edu.year} | {edu.score}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-8">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-gradient-to-r from-orange-400 to-purple-500 rounded"></span>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs text-white px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="w-[60mm]">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></span>
                Languages
              </h2>
              {languages.map((lang) => (
                <div key={lang.id} className="text-sm text-gray-600 mb-1">{lang.name} - {lang.proficiency}</div>
              ))}
            </div>
          )}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded"></span>
              Certifications
            </h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-purple-600">{cert.name}</span> - {cert.organization}, {cert.year}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
