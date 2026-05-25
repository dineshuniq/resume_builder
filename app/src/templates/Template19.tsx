import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

export default function Template19({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-gray-50 p-[15mm] font-sans text-gray-800">
      {/* Overlapping Header */}
      <div className="relative mb-10 h-[35mm]">
        <div className="absolute top-0 left-0 w-[120mm] h-[30mm] bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg shadow-lg"></div>
        <div className="absolute top-[10mm] left-[15mm] bg-white p-6 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo.fullName}</h1>
          <p className="text-sm text-purple-600">{personalInfo.title}</p>
        </div>
        <div className="absolute top-[5mm] right-0 flex flex-col gap-2 text-xs text-gray-600">
          {personalInfo.email && <span className="flex items-center gap-1 bg-white px-3 py-2 rounded shadow"><Mail size={12} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1 bg-white px-3 py-2 rounded shadow"><Phone size={12} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1 bg-white px-3 py-2 rounded shadow"><MapPin size={12} /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1 bg-white px-3 py-2 rounded shadow"><Linkedin size={12} /> {personalInfo.linkedin}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm -mt-2 ml-[10mm] max-w-[160mm]">
          <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
        </div>
      )}

      <div className="flex gap-6">
        <div className="flex-1">
          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Experience</h2>
              {experience.map((exp, idx) => (
                <div key={exp.id} className={`mb-6 bg-white p-5 rounded-lg shadow-sm ${idx > 0 ? '-mt-3 ml-4' : ''}`}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800">{exp.role}</h3>
                    <span className="text-xs text-gray-400">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-sm text-purple-600 mb-2">{exp.company} | {exp.location}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-2">
                      <p className="text-xs font-semibold text-gray-700">{project.title}</p>
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
        </div>

        <div className="w-[55mm]">
          {skills.length > 0 && (
            <div className="mb-6 bg-white p-5 rounded-lg shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-6 bg-white p-5 rounded-lg shadow-sm -mt-3 ml-2">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="text-xs font-semibold text-gray-700">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.institution}</p>
                  <p className="text-xs text-gray-400">{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div className="bg-white p-5 rounded-lg shadow-sm -mt-3 ml-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">Languages</h2>
              {languages.map((lang) => (
                <p key={lang.id} className="text-xs text-gray-600 mb-1">{lang.name}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
