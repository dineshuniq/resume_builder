import type { ResumeData } from "@/types/resume";
import type React from "react";

type Layout =
  | "sidebar"
  | "dashboard"
  | "grid"
  | "tshape"
  | "editorial"
  | "typographic"
  | "leftAligned"
  | "asymmetric"
  | "accent"
  | "boldSidebar"
  | "topBanner"
  | "ribbon"
  | "chevron"
  | "classic"
  | "summaryFirst"
  | "mono"
  | "timeline"
  | "splitHeader"
  | "quad"
  | "dark"
  | "startup"
  | "organic"
  | "spotlight"
  | "infographic"
  | "tSkills"
  | "monogram";

interface TemplateConfig {
  layout: Layout;
  accent: string;
  dark?: string;
  paper?: string;
  serif?: boolean;
}

const contactLine = (data: ResumeData) =>
  [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location, data.personalInfo.linkedin, data.personalInfo.website].filter(Boolean);

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

function SectionTitle({ children, accent, className = "" }: { children: React.ReactNode; accent: string; className?: string }) {
  return (
    <h2 className={`text-[11px] font-bold uppercase tracking-[0.22em] ${className}`} style={{ color: accent }}>
      {children}
    </h2>
  );
}

function ExperienceList({ data, accent, timeline = false, compact = false }: { data: ResumeData; accent: string; timeline?: boolean; compact?: boolean }) {
  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      {data.experience.map((exp) => (
        <article key={exp.id} className={timeline ? "relative pl-6" : ""}>
          {timeline && (
            <>
              <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 bg-white" style={{ borderColor: accent }} />
              <span className="absolute left-[5px] top-5 bottom-[-20px] w-px bg-gray-200" />
            </>
          )}
          <div className={compact ? "mb-1" : "mb-2"}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: accent }}>
              {exp.from} - {exp.to}
            </p>
            <h3 className={compact ? "text-sm font-bold" : "text-base font-bold"}>{exp.role}</h3>
            <p className="text-xs text-gray-500">{exp.company} | {exp.location}</p>
          </div>
          {exp.projects.map((project) => (
            <div key={project.id} className={compact ? "mb-2" : "mb-3"}>
              <p className="text-xs font-bold" style={{ color: accent }}>{project.title}</p>
              <ul className="mt-1 list-disc pl-4 text-[11px] leading-relaxed text-gray-600">
                {project.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </article>
      ))}
    </div>
  );
}

function Skills({ data, accent, boxed = false }: { data: ResumeData; accent: string; boxed?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {data.skills.map((skill) => (
        <span
          key={skill.id}
          className={boxed ? "border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide" : "text-[11px] font-medium"}
          style={boxed ? { borderColor: accent, color: accent } : undefined}
        >
          {skill.name}
        </span>
      ))}
    </div>
  );
}

function Education({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-3">
      {data.education.map((edu) => (
        <article key={edu.id}>
          <p className="text-xs font-bold">{edu.degree}</p>
          <p className="text-[11px] text-gray-500">{edu.institution}</p>
          <p className="text-[10px] text-gray-400">{edu.year} | {edu.score}</p>
        </article>
      ))}
    </div>
  );
}

function SideMeta({ data, accent, dark = false }: { data: ResumeData; accent: string; dark?: boolean }) {
  const tone = dark ? "text-white/75" : "text-gray-600";
  return (
    <div className="space-y-6">
      <div>
        <SectionTitle accent={accent}>Contact</SectionTitle>
        <div className={`mt-3 space-y-2 text-[11px] ${tone}`}>
          {contactLine(data).map((item) => <p key={item}>{item}</p>)}
        </div>
      </div>
      <div>
        <SectionTitle accent={accent}>Skills</SectionTitle>
        <div className="mt-3">
          <Skills data={data} accent={accent} boxed />
        </div>
      </div>
      <div>
        <SectionTitle accent={accent}>Education</SectionTitle>
        <div className={`mt-3 ${tone}`}>
          <Education data={data} />
        </div>
      </div>
    </div>
  );
}

function AdvancedTemplate({ data, config }: { data: ResumeData; config: TemplateConfig }) {
  const { personalInfo, summary, certifications, languages } = data;
  const paper = config.paper || "#ffffff";
  const accent = config.accent;
  const dark = config.dark || "#111827";
  const font = config.serif ? "font-serif" : "font-sans";

  if (config.layout === "sidebar") {
    return (
      <div className={`w-[210mm] min-h-[297mm] ${font} bg-white text-gray-800`}>
        <div className="flex min-h-[297mm]">
          <aside className="w-[58mm] border-r p-[13mm]" style={{ borderColor: `${accent}33`, background: "#f8fafc" }}>
            <h1 className="text-2xl font-black leading-tight">{personalInfo.fullName}</h1>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: accent }}>{personalInfo.title}</p>
            <div className="mt-8"><SideMeta data={data} accent={accent} /></div>
          </aside>
          <main className="flex-1 p-[15mm]">
            <SectionTitle accent={accent}>Professional Experience</SectionTitle>
            <div className="mt-5"><ExperienceList data={data} accent={accent} /></div>
          </main>
        </div>
      </div>
    );
  }

  if (config.layout === "dashboard") {
    return (
      <div className={`w-[210mm] min-h-[297mm] ${font} bg-white p-[11mm] text-gray-800`}>
        <header className="mb-6 border-b pb-5">
          <h1 className="text-3xl font-black">{personalInfo.fullName}</h1>
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>{personalInfo.title}</p>
        </header>
        <div className="grid grid-cols-3 gap-5 text-xs">
          <section><SectionTitle accent={accent}>Profile</SectionTitle><p className="mt-3 leading-relaxed text-gray-600">{summary}</p><div className="mt-6"><SectionTitle accent={accent}>Education</SectionTitle><div className="mt-3"><Education data={data} /></div></div></section>
          <section><SectionTitle accent={accent}>Core Stack</SectionTitle><div className="mt-3"><Skills data={data} accent={accent} boxed /></div><div className="mt-6"><SectionTitle accent={accent}>Languages</SectionTitle>{languages.map((lang) => <p key={lang.id} className="mt-2 text-gray-600">{lang.name} - {lang.proficiency}</p>)}</div></section>
          <section><SectionTitle accent={accent}>Experience</SectionTitle><div className="mt-3"><ExperienceList data={data} accent={accent} compact /></div></section>
        </div>
      </div>
    );
  }

  if (config.layout === "grid" || config.layout === "quad") {
    return (
      <div className={`w-[210mm] min-h-[297mm] ${font} bg-[#f7f7f5] p-[12mm] text-gray-800`}>
        <header className="mb-5 grid grid-cols-[1.5fr_1fr] gap-4">
          <div className="border bg-white p-5"><h1 className="text-3xl font-black">{personalInfo.fullName}</h1><p style={{ color: accent }}>{personalInfo.title}</p></div>
          <div className="border bg-white p-5 text-[11px] text-gray-600">{contactLine(data).map((item) => <p key={item}>{item}</p>)}</div>
        </header>
        <div className="grid grid-cols-4 gap-4">
          <section className="col-span-3 border bg-white p-5"><SectionTitle accent={accent}>Experience</SectionTitle><div className="mt-4"><ExperienceList data={data} accent={accent} compact={config.layout === "quad"} /></div></section>
          <aside className="space-y-4"><section className="border bg-white p-4"><SectionTitle accent={accent}>Skills</SectionTitle><div className="mt-3"><Skills data={data} accent={accent} boxed /></div></section><section className="border bg-white p-4"><SectionTitle accent={accent}>Education</SectionTitle><div className="mt-3"><Education data={data} /></div></section><section className="border bg-white p-4"><SectionTitle accent={accent}>Certs</SectionTitle>{certifications.map((cert) => <p key={cert.id} className="mt-2 text-[11px]">{cert.name}</p>)}</section></aside>
        </div>
      </div>
    );
  }

  if (config.layout === "tshape") {
    return (
      <div className={`w-[210mm] min-h-[297mm] ${font} bg-white p-[13mm] text-gray-800`}>
        <header className="border-b-4 pb-6" style={{ borderColor: accent }}><h1 className="text-4xl font-black">{personalInfo.fullName}</h1><p className="mt-1 text-sm uppercase tracking-[0.22em]">{personalInfo.title}</p></header>
        <div className="grid grid-cols-[48mm_1fr] gap-8 pt-8">
          <aside className="border-r pr-6" style={{ borderColor: `${accent}55` }}><SideMeta data={data} accent={accent} /></aside>
          <main><SectionTitle accent={accent}>Experience</SectionTitle><div className="mt-5"><ExperienceList data={data} accent={accent} /></div></main>
        </div>
      </div>
    );
  }

  if (config.layout === "editorial" || config.layout === "typographic" || config.layout === "leftAligned" || config.layout === "asymmetric") {
    const wideLeft = config.layout === "asymmetric";
    return (
      <div className={`w-[210mm] min-h-[297mm] ${font} p-[15mm] text-gray-800`} style={{ background: paper }}>
        <header className={config.layout === "leftAligned" ? "mb-12 max-w-[120mm]" : "mb-10"}>
          <h1 className={config.layout === "typographic" ? "text-6xl font-black leading-none tracking-tight" : "text-5xl font-black leading-tight"} style={{ color: dark }}>{personalInfo.fullName}</h1>
          <p className="mt-3 text-sm uppercase tracking-[0.24em]" style={{ color: accent }}>{personalInfo.title}</p>
        </header>
        <div className={wideLeft ? "grid grid-cols-[65mm_1fr] gap-8" : "grid grid-cols-[38mm_1fr] gap-8"}>
          <aside className="text-[11px] uppercase tracking-[0.18em]" style={{ color: accent }}>
            <p>Profile</p><p className="mt-28">Experience</p><p className="mt-36">Details</p>
          </aside>
          <main>
            <p className="mb-8 text-sm leading-relaxed text-gray-600">{summary}</p>
            <ExperienceList data={data} accent={accent} />
            <div className="mt-8 grid grid-cols-2 gap-6"><div><SectionTitle accent={accent}>Skills</SectionTitle><div className="mt-3"><Skills data={data} accent={accent} /></div></div><div><SectionTitle accent={accent}>Education</SectionTitle><div className="mt-3"><Education data={data} /></div></div></div>
          </main>
        </div>
      </div>
    );
  }

  if (config.layout === "accent") {
    return (
      <div className={`w-[210mm] min-h-[297mm] ${font} bg-white p-[15mm] text-gray-800`}>
        <header className="mb-8 border-t-[8px] pt-6" style={{ borderColor: accent }}>
          <h1 className="text-4xl font-black">{personalInfo.fullName}</h1>
          <p className="mt-2 text-sm font-bold uppercase tracking-[0.22em]" style={{ color: accent }}>{personalInfo.title}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-gray-500">{contactLine(data).map((item) => <span key={item}>{item}</span>)}</div>
        </header>
        <section className="mb-8">
          <SectionTitle accent={accent}>Summary</SectionTitle>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">{summary}</p>
        </section>
        <SectionTitle accent={accent}>Experience</SectionTitle>
        <div className="mt-5"><ExperienceList data={data} accent={accent} /></div>
        <div className="mt-8 grid grid-cols-2 gap-8">
          <section><SectionTitle accent={accent}>Skills</SectionTitle><div className="mt-3"><Skills data={data} accent={accent} boxed /></div></section>
          <section><SectionTitle accent={accent}>Education</SectionTitle><div className="mt-3"><Education data={data} /></div></section>
        </div>
      </div>
    );
  }

  if (config.layout === "boldSidebar") {
    return (
      <div className={`w-[210mm] min-h-[297mm] ${font} bg-white text-gray-800`}>
        <div className="flex min-h-[297mm]"><aside className="w-[70mm] p-[14mm] text-white" style={{ background: dark }}><h1 className="text-3xl font-black">{personalInfo.fullName}</h1><p className="mt-3 text-xs uppercase tracking-[0.22em]" style={{ color: accent }}>{personalInfo.title}</p><div className="mt-10"><SideMeta data={data} accent={accent} dark /></div></aside><main className="flex-1 p-[15mm]"><p className="mb-8 text-sm leading-relaxed">{summary}</p><ExperienceList data={data} accent={accent} /></main></div>
      </div>
    );
  }

  if (config.layout === "topBanner" || config.layout === "splitHeader") {
    return (
      <div className={`w-[210mm] min-h-[297mm] ${font} bg-white text-gray-800`}>
        <header className={config.layout === "splitHeader" ? "grid grid-cols-2 gap-8 p-[15mm]" : "p-[15mm] text-white"} style={config.layout === "topBanner" ? { background: dark } : { borderBottom: `6px solid ${accent}` }}>
          <div><h1 className="text-4xl font-black">{personalInfo.fullName}</h1><p className="mt-2 text-sm uppercase tracking-[0.2em]" style={{ color: config.layout === "topBanner" ? accent : dark }}>{personalInfo.title}</p></div>
          <div className="text-xs leading-relaxed text-right">{contactLine(data).map((item) => <p key={item}>{item}</p>)}</div>
        </header>
        <main className="p-[15mm]"><p className="mb-8 text-sm leading-relaxed text-gray-600">{summary}</p><ExperienceList data={data} accent={accent} /><div className="mt-8 grid grid-cols-2 gap-8"><div><SectionTitle accent={accent}>Skills</SectionTitle><div className="mt-3"><Skills data={data} accent={accent} boxed /></div></div><div><SectionTitle accent={accent}>Education</SectionTitle><div className="mt-3"><Education data={data} /></div></div></div></main>
      </div>
    );
  }

  if (config.layout === "ribbon") {
    return (
      <div className={`w-[210mm] min-h-[297mm] ${font} bg-white text-gray-800`}>
        <div className="grid min-h-[297mm] grid-cols-[26mm_1fr]"><aside className="flex items-start justify-center pt-[18mm] text-white" style={{ background: accent }}><p className="origin-center rotate-90 whitespace-nowrap text-xs font-bold uppercase tracking-[0.35em]">Resume</p></aside><main className="p-[15mm]"><h1 className="text-4xl font-black">{personalInfo.fullName}</h1><p className="mt-1 text-sm uppercase tracking-[0.2em]">{personalInfo.title}</p><p className="mt-8 text-sm leading-relaxed text-gray-600">{summary}</p><div className="mt-8"><ExperienceList data={data} accent={accent} /></div></main></div>
      </div>
    );
  }

  if (config.layout === "chevron") {
    return (
      <div className={`w-[210mm] min-h-[297mm] ${font} bg-white p-[14mm] text-gray-800`}>
        <header className="mb-8"><h1 className="text-4xl font-black">{personalInfo.fullName}</h1><p style={{ color: accent }}>{personalInfo.title}</p></header>
        <section className="mb-8 border-l-[14px] p-4" style={{ borderColor: accent, clipPath: "polygon(0 0, 98% 0, 100% 50%, 98% 100%, 0 100%)" }}><p className="text-sm leading-relaxed">{summary}</p></section>
        <ExperienceList data={data} accent={accent} />
      </div>
    );
  }

  if (config.layout === "classic" || config.layout === "summaryFirst" || config.layout === "mono") {
    return (
      <div className={`w-[210mm] min-h-[297mm] ${config.layout === "mono" ? "font-sans" : "font-serif"} bg-white p-[16mm] text-gray-900`}>
        <header className="text-center"><h1 className={config.layout === "mono" ? "text-5xl font-black uppercase" : "text-4xl font-bold"}>{personalInfo.fullName}</h1><p className="mt-2 text-xs uppercase tracking-[0.22em]">{contactLine(data).join(" | ")}</p></header>
        <div className={config.layout === "mono" ? "my-8 h-2 bg-black" : "my-8 border-t border-b py-4"}><p className="text-sm leading-relaxed">{summary}</p></div>
        <div className={config.layout === "summaryFirst" ? "grid grid-cols-2 gap-8" : ""}><div><SectionTitle accent={config.layout === "mono" ? "#000" : accent}>Experience</SectionTitle><div className="mt-5"><ExperienceList data={data} accent={accent} /></div></div><aside className={config.layout === "summaryFirst" ? "" : "mt-8 grid grid-cols-2 gap-8"}><div><SectionTitle accent={accent}>Skills</SectionTitle><div className="mt-3"><Skills data={data} accent={accent} /></div></div><div><SectionTitle accent={accent}>Education</SectionTitle><div className="mt-3"><Education data={data} /></div></div></aside></div>
      </div>
    );
  }

  if (config.layout === "timeline") {
    return (
      <div className={`w-[210mm] min-h-[297mm] ${font} bg-white p-[15mm] text-gray-800`}>
        <header className="mb-10"><h1 className="text-4xl font-black">{personalInfo.fullName}</h1><p style={{ color: accent }}>{personalInfo.title}</p></header>
        <ExperienceList data={data} accent={accent} timeline />
      </div>
    );
  }

  if (config.layout === "dark") {
    return (
      <div className={`w-[210mm] min-h-[297mm] ${font} p-[15mm] text-white`} style={{ background: dark }}>
        <header className="mb-8 border p-6" style={{ borderColor: accent }}><h1 className="text-4xl font-black" style={{ color: accent }}>{personalInfo.fullName}</h1><p>{personalInfo.title}</p></header>
        <p className="mb-8 text-sm leading-relaxed text-white/70">{summary}</p>
        <div className="grid grid-cols-[1fr_55mm] gap-8"><main><ExperienceList data={data} accent={accent} /></main><aside><SideMeta data={data} accent={accent} dark /></aside></div>
      </div>
    );
  }

  if (config.layout === "startup" || config.layout === "organic") {
    return (
      <div className={`w-[210mm] min-h-[297mm] ${font} p-[15mm] text-gray-800`} style={{ background: paper }}>
        <header className="rounded-2xl p-6" style={{ background: "#ffffffaa" }}><h1 className="text-4xl font-black">{personalInfo.fullName}</h1><p style={{ color: accent }}>{personalInfo.title}</p><p className="mt-5 text-sm leading-relaxed">{summary}</p></header>
        <main className="mt-8 grid grid-cols-[1fr_55mm] gap-8"><section><ExperienceList data={data} accent={accent} /></section><aside className="space-y-6 rounded-2xl bg-white/70 p-5"><SideMeta data={data} accent={accent} /></aside></main>
      </div>
    );
  }

  if (config.layout === "spotlight") {
    const featured = data.experience[0]?.projects[0];
    return (
      <div className={`w-[210mm] min-h-[297mm] ${font} bg-white p-[15mm] text-gray-800`}>
        <header className="mb-6"><h1 className="text-4xl font-black">{personalInfo.fullName}</h1><p style={{ color: accent }}>{personalInfo.title}</p></header>
        <section className="mb-8 border p-6" style={{ borderColor: accent }}><SectionTitle accent={accent}>Featured Project</SectionTitle><h2 className="mt-3 text-2xl font-black">{featured?.title}</h2><p className="mt-3 text-sm leading-relaxed">{featured?.bullets.join(" ")}</p></section>
        <ExperienceList data={data} accent={accent} compact />
      </div>
    );
  }

  if (config.layout === "infographic" || config.layout === "tSkills") {
    return (
      <div className={`w-[210mm] min-h-[297mm] ${font} bg-white p-[14mm] text-gray-800`}>
        <header className="mb-8"><h1 className="text-4xl font-black">{personalInfo.fullName}</h1><p style={{ color: accent }}>{personalInfo.title}</p></header>
        <section className="mb-8 grid grid-cols-4 gap-3">{data.skills.slice(0, 8).map((skill, index) => <div key={skill.id} className="border p-3 text-center"><p className="text-2xl font-black" style={{ color: accent }}>{index < 3 ? "Deep" : "Broad"}</p><p className="text-[10px] uppercase tracking-wide">{skill.name}</p></div>)}</section>
        <ExperienceList data={data} accent={accent} />
      </div>
    );
  }

  return (
    <div className={`w-[210mm] min-h-[297mm] ${font} bg-white p-[16mm] text-gray-800`}>
      <header className="mb-10 flex items-center gap-6"><div className="flex h-20 w-20 items-center justify-center border-4 text-3xl font-black" style={{ borderColor: accent, color: accent }}>{initials(personalInfo.fullName)}</div><div><h1 className="text-4xl font-black">{personalInfo.fullName}</h1><p style={{ color: accent }}>{personalInfo.title}</p></div></header>
      <p className="mb-8 text-sm leading-relaxed text-gray-600">{summary}</p>
      <ExperienceList data={data} accent={accent} />
      <div className="mt-8 grid grid-cols-2 gap-8"><div><SectionTitle accent={accent}>Skills</SectionTitle><div className="mt-3"><Skills data={data} accent={accent} boxed /></div></div><div><SectionTitle accent={accent}>Education</SectionTitle><div className="mt-3"><Education data={data} /></div></div></div>
    </div>
  );
}

const templates: Record<number, TemplateConfig> = {
  41: { layout: "sidebar", accent: "#2563eb", paper: "#ffffff" },
  42: { layout: "dashboard", accent: "#0f766e" },
  43: { layout: "grid", accent: "#475569" },
  44: { layout: "tshape", accent: "#1d4ed8" },
  45: { layout: "editorial", accent: "#9a5b3f", paper: "#f4efe6", dark: "#27352f", serif: true },
  46: { layout: "typographic", accent: "#111827" },
  47: { layout: "leftAligned", accent: "#64748b" },
  48: { layout: "asymmetric", accent: "#7c3aed" },
  49: { layout: "accent", accent: "#0891b2" },
  50: { layout: "boldSidebar", accent: "#a7f3d0", dark: "#14342f" },
  51: { layout: "topBanner", accent: "#38bdf8", dark: "#0f172a" },
  52: { layout: "ribbon", accent: "#7f1d1d" },
  53: { layout: "chevron", accent: "#ea580c" },
  54: { layout: "classic", accent: "#6b4e2e", serif: true },
  55: { layout: "summaryFirst", accent: "#334155", serif: true },
  56: { layout: "mono", accent: "#000000" },
  57: { layout: "timeline", accent: "#2563eb" },
  58: { layout: "splitHeader", accent: "#0f766e", dark: "#0f172a" },
  59: { layout: "quad", accent: "#4b5563" },
  60: { layout: "dark", accent: "#6ee7b7", dark: "#0f172a" },
  61: { layout: "startup", accent: "#d97706", paper: "#fff7ed" },
  62: { layout: "organic", accent: "#9a6847", paper: "#f7f1e8", serif: true },
  63: { layout: "spotlight", accent: "#7c3aed" },
  64: { layout: "infographic", accent: "#0ea5e9" },
  65: { layout: "tSkills", accent: "#16a34a" },
  66: { layout: "monogram", accent: "#4f46e5" },
};

function makeTemplate(templateNumber: number) {
  return function Template({ data }: { data: ResumeData }) {
    return <AdvancedTemplate data={data} config={templates[templateNumber] || templates[41]} />;
  };
}

export const Template41 = makeTemplate(41);
export const Template42 = makeTemplate(42);
export const Template43 = makeTemplate(43);
export const Template44 = makeTemplate(44);
export const Template45 = makeTemplate(45);
export const Template46 = makeTemplate(46);
export const Template47 = makeTemplate(47);
export const Template48 = makeTemplate(48);
export const Template49 = makeTemplate(49);
export const Template50 = makeTemplate(50);
export const Template51 = makeTemplate(51);
export const Template52 = makeTemplate(52);
export const Template53 = makeTemplate(53);
export const Template54 = makeTemplate(54);
export const Template55 = makeTemplate(55);
export const Template56 = makeTemplate(56);
export const Template57 = makeTemplate(57);
export const Template58 = makeTemplate(58);
export const Template59 = makeTemplate(59);
export const Template60 = makeTemplate(60);
export const Template61 = makeTemplate(61);
export const Template62 = makeTemplate(62);
export const Template63 = makeTemplate(63);
export const Template64 = makeTemplate(64);
export const Template65 = makeTemplate(65);
export const Template66 = makeTemplate(66);
