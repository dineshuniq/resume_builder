import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export default function Template06({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[15mm] font-sans text-gray-800">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <p className="text-lg text-gray-500 mb-4">{personalInfo.title}</p>
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-500">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={13} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={13} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={13} /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={13} /> {personalInfo.linkedin}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe size={13} /> {personalInfo.website}</span>}
        </div>
      </div>

      {summary && (
        <div className="max-w-[150mm] mx-auto mb-10 text-center">
          <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
        </div>
      )}

      {/* Timeline */}
      {experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-center text-lg font-bold text-gray-800 mb-8">Experience</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            {experience.map((exp, idx) => (
              <div key={exp.id} className={`relative flex mb-8 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800 text-sm">{exp.role}</h3>
                    <p className="text-xs text-gray-500 mb-1">{exp.company}</p>
                    <p className="text-xs text-gray-400 mb-2">{exp.from} - {exp.to}</p>
                    {exp.projects.map((project) => (
                      <div key={project.id} className="mb-2">
                        <p className="text-xs font-semibold text-gray-700">{project.title}</p>
                        <ul className="text-xs text-gray-500 space-y-0.5 mt-1">
                          {project.bullets.slice(0, 2).map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-4 border-gray-300 rounded-full"></div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8 text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Skills</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">{skill.name}</span>
            ))}
          </div>
        </div>
      )}

      {/* Education & Languages */}
      <div className="flex gap-8 justify-center">
        {education.length > 0 && (
          <div className="text-center">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-sm font-medium">{edu.degree}</p>
                <p className="text-xs text-gray-500">{edu.institution}, {edu.year}</p>
              </div>
            ))}
          </div>
        )}
        {languages.length > 0 && (
          <div className="text-center">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Languages</h2>
            {languages.map((lang) => (
              <p key={lang.id} className="text-sm text-gray-600">{lang.name}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
