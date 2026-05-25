import type { ResumeData } from "@/types/resume";

export default function Template34({ data }: { data: ResumeData }) {
  const { personalInfo, summary, skills, experience, education } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-gray-100 p-[15mm] font-sans text-gray-800" style={{ perspective: "1000px" }}>
      <div className="bg-white p-8 shadow-xl mb-6" style={{ transform: "rotateY(-3deg) rotateX(2deg)", transformStyle: "preserve-3d" }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <p className="text-lg text-gray-500">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {summary && (
        <div className="bg-white p-6 shadow-lg mb-6 ml-4" style={{ transform: "rotateY(2deg)", transformStyle: "preserve-3d" }}>
          <p className="text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      <div className="flex gap-4">
        <div className="flex-1">
          {experience.length > 0 && (
            <div className="bg-white p-6 shadow-lg mb-4" style={{ transform: "rotateY(-2deg)", transformStyle: "preserve-3d" }}>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold">{exp.role}</h3>
                    <span className="text-xs text-gray-400">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{exp.company}</p>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="mb-2">
                      <p className="text-xs font-semibold">{project.title}</p>
                      <ul className="text-xs text-gray-500 space-y-0.5">
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
            <div className="bg-white p-5 shadow-lg mb-4" style={{ transform: "rotateY(3deg)", transformStyle: "preserve-3d" }}>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs bg-gray-100 px-2 py-1">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="bg-white p-5 shadow-lg" style={{ transform: "rotateY(2deg)", transformStyle: "preserve-3d" }}>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="text-xs font-semibold">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.institution}, {edu.year}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
