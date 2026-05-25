import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export default function Template09({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[15mm] font-serif text-gray-800">
      {/* Editorial Header */}
      <div className="border-b-4 border-black pb-6 mb-8">
        <h1 className="text-6xl font-bold text-black leading-none mb-4">{personalInfo.fullName}</h1>
        <p className="text-xl text-gray-600 italic font-light">{personalInfo.title}</p>
      </div>

      {/* Contact Bar */}
      <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-8 border-b border-gray-200 pb-4">
        {personalInfo.email && <span className="flex items-center gap-1"><Mail size={14} /> {personalInfo.email}</span>}
        {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={14} /> {personalInfo.phone}</span>}
        {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={14} /> {personalInfo.location}</span>}
        {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={14} /> {personalInfo.linkedin}</span>}
        {personalInfo.website && <span className="flex items-center gap-1"><Globe size={14} /> {personalInfo.website}</span>}
      </div>

      {/* Pull Quote Style Summary */}
      {summary && (
        <div className="mb-10 bg-gray-50 p-6 border-l-4 border-black">
          <p className="text-lg italic text-gray-700 leading-relaxed">"{summary}"</p>
        </div>
      )}

      <div className="flex gap-10">
        {/* Main Content */}
        <div className="flex-1">
          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-6 uppercase tracking-wide">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.role}</h3>
                  <div className="flex justify-between items-baseline mb-3">
                    <p className="text-sm text-gray-600 font-medium">{exp.company} | {exp.location}</p>
                    <p className="text-sm text-gray-400">{exp.from} - {exp.to}</p>
                  </div>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">{project.title}</p>
                      <ul className="space-y-2">
                        {project.bullets.map((bullet, idx) => (
                          <li key={idx} className="text-sm text-gray-600 leading-relaxed">{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-[55mm]">
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs border border-gray-300 px-2 py-1">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <p className="text-sm font-bold text-gray-800">{edu.degree}</p>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-400">{edu.year} | {edu.score}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">Languages</h2>
              {languages.map((lang) => (
                <p key={lang.id} className="text-sm text-gray-600 mb-1">{lang.name} <span className="text-gray-400">({lang.proficiency})</span></p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
