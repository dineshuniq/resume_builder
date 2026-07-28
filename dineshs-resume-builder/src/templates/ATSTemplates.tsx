import type { ResumeData } from "@/types/resume";
import { getSectionTitle } from "@/lib/sectionTitles";
import { renderBoldText } from "@/lib/richText";

/**
 * ATS-compliant template engine.
 *
 * These templates are intentionally constrained to what applicant tracking
 * systems parse reliably: a single linear column (no side-by-side layout,
 * so nothing to mis-order or fragment across pages), real semantic
 * headings and <ul>/<li> lists, no icons/images/background graphics, and
 * standard fonts. Visual variety comes only from color, typography, and
 * heading/header treatment — never from structure.
 */

type HeadingStyle = "underline" | "tracked" | "leftbar" | "doubleRule" | "label";
type HeaderStyle = "leftPlain" | "leftTrackedSerif" | "centered" | "topBar";
type DateStyle = "sameLine" | "stacked";
type BulletStyle = "disc" | "dash";

interface ATSConfig {
  name: string;
  accent: string;
  font: "sans" | "serif";
  headingStyle: HeadingStyle;
  headerStyle: HeaderStyle;
  dateStyle: DateStyle;
  bulletStyle: BulletStyle;
}

const ACCENTS = [
  { name: "Navy", hex: "#1e3a5f" },
  { name: "Slate", hex: "#334155" },
  { name: "Forest", hex: "#14532d" },
  { name: "Charcoal", hex: "#1f2937" },
  { name: "Burgundy", hex: "#7f1d1d" },
  { name: "Teal", hex: "#0f766e" },
  { name: "Indigo", hex: "#3730a3" },
  { name: "Bronze", hex: "#92400e" },
  { name: "Steel", hex: "#1d4ed8" },
  { name: "Graphite", hex: "#374151" },
];

const HEADING_STYLES: { key: HeadingStyle; label: string }[] = [
  { key: "underline", label: "Classic" },
  { key: "tracked", label: "Tracked" },
  { key: "leftbar", label: "Accent Bar" },
  { key: "doubleRule", label: "Rule" },
  { key: "label", label: "Label" },
];

const HEADER_STYLES: HeaderStyle[] = ["leftPlain", "leftTrackedSerif", "centered", "topBar"];
const DATE_STYLES: DateStyle[] = ["sameLine", "stacked"];
const BULLET_STYLES: BulletStyle[] = ["disc", "dash"];

export const atsTemplates: ATSConfig[] = ACCENTS.flatMap((accent, accentIndex) =>
  HEADING_STYLES.map((heading, headingIndex) => {
    const index = accentIndex * HEADING_STYLES.length + headingIndex;
    return {
      name: `ATS ${accent.name} ${heading.label}`,
      accent: accent.hex,
      font: index % 2 === 0 ? "sans" : "serif",
      headingStyle: heading.key,
      headerStyle: HEADER_STYLES[index % HEADER_STYLES.length],
      dateStyle: DATE_STYLES[index % DATE_STYLES.length],
      bulletStyle: BULLET_STYLES[index % BULLET_STYLES.length],
    } as ATSConfig;
  })
);

function contactLine(data: ResumeData) {
  return [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location, data.personalInfo.linkedin, data.personalInfo.website].filter(
    Boolean
  );
}

function ContactLine({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item, index) => (
        <span key={item}>
          {index > 0 && " | "}
          {renderBoldText(item)}
        </span>
      ))}
    </>
  );
}

function SectionHeading({ children, config }: { children: React.ReactNode; config: ATSConfig }) {
  const { accent, headingStyle } = config;
  switch (headingStyle) {
    case "underline":
      return (
        <h2 className="mb-3 pb-1 text-sm font-bold uppercase tracking-wide text-gray-900" style={{ borderBottom: `2px solid ${accent}` }}>
          {children}
        </h2>
      );
    case "tracked":
      return (
        <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
          {children}
        </h2>
      );
    case "leftbar":
      return (
        <h2 className="mb-3 pl-2 text-sm font-bold uppercase tracking-wide text-gray-900" style={{ borderLeft: `4px solid ${accent}` }}>
          {children}
        </h2>
      );
    case "doubleRule":
      return (
        <h2
          className="mb-3 py-1 text-sm font-bold uppercase tracking-wide text-gray-900"
          style={{ borderTop: `1px solid ${accent}`, borderBottom: `1px solid ${accent}` }}
        >
          {children}
        </h2>
      );
    case "label":
      return (
        <h2 className="mb-3 inline-block rounded px-2 py-1 text-xs font-bold uppercase tracking-wide" style={{ backgroundColor: `${accent}18`, color: accent }}>
          {children}
        </h2>
      );
  }
}

function Header({ data, config }: { data: ResumeData; config: ATSConfig }) {
  const { personalInfo } = data;
  const { accent, headerStyle } = config;
  const contact = contactLine(data);

  const nameBlock = (align: "left" | "center") => (
    <div style={{ textAlign: align }}>
      <h1 className="text-3xl font-bold text-gray-900">{renderBoldText(personalInfo.fullName)}</h1>
      <p className="mt-1 text-base font-medium" style={{ color: accent }}>
        {renderBoldText(personalInfo.title)}
      </p>
      <p className="mt-2 text-xs text-gray-600"><ContactLine items={contact} /></p>
    </div>
  );

  if (headerStyle === "topBar") {
    return (
      <div className="mb-6">
        <div className="mb-4 h-[5px] w-full" style={{ backgroundColor: accent }} />
        {nameBlock("left")}
      </div>
    );
  }

  if (headerStyle === "centered") {
    return <div className="mb-6 border-b pb-4" style={{ borderColor: `${accent}55` }}>{nameBlock("center")}</div>;
  }

  if (headerStyle === "leftTrackedSerif") {
    return (
      <div className="mb-6 border-b pb-4" style={{ borderColor: `${accent}55` }}>
        <h1 className="text-3xl font-semibold uppercase tracking-[0.12em] text-gray-900">{renderBoldText(personalInfo.fullName)}</h1>
        <p className="mt-1 text-base" style={{ color: accent }}>
          {renderBoldText(personalInfo.title)}
        </p>
        <p className="mt-2 text-xs text-gray-600"><ContactLine items={contact} /></p>
      </div>
    );
  }

  return <div className="mb-6 border-b pb-4" style={{ borderColor: `${accent}55` }}>{nameBlock("left")}</div>;
}

function ExperienceSection({ data, config }: { data: ResumeData; config: ATSConfig }) {
  const { dateStyle, bulletStyle } = config;
  const listClass = bulletStyle === "disc" ? "list-disc list-inside" : "list-none";

  return (
    <section className="mb-6">
      <SectionHeading config={config}>{getSectionTitle(data, "experience", "Experience")}</SectionHeading>
      <div className="space-y-4">
        {data.experience.map((exp) => (
          <article key={exp.id}>
            {dateStyle === "sameLine" ? (
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-bold text-gray-900">{renderBoldText(exp.role)}</h3>
                <span className="whitespace-nowrap text-xs text-gray-500">
                  {exp.from} - {exp.current ? "Present" : exp.to}
                </span>
              </div>
            ) : (
              <div>
                <h3 className="text-sm font-bold text-gray-900">{renderBoldText(exp.role)}</h3>
                <span className="text-xs text-gray-500">
                  {exp.from} - {exp.current ? "Present" : exp.to}
                </span>
              </div>
            )}
            <p className="mb-1 text-sm text-gray-700">
              {renderBoldText(exp.company)}
              {exp.location ? `, ${""}` : ""}
              {renderBoldText(exp.location)}
            </p>
            {exp.projects.map((project) => (
              <div key={project.id} className="mb-2">
                {project.title && <p className="text-xs font-semibold text-gray-800">{renderBoldText(project.title)}</p>}
                <ul className={`${listClass} space-y-0.5 text-xs leading-relaxed text-gray-700`}>
                  {project.bullets.map((bullet, index) => (
                    <li key={index}>{bulletStyle === "dash" ? <>&#8211; {renderBoldText(bullet)}</> : renderBoldText(bullet)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

function ATSTemplate({ data, config }: { data: ResumeData; config: ATSConfig }) {
  const { summary, education, skills, languages, certifications } = data;
  const fontClass = config.font === "serif" ? "font-serif" : "font-sans";

  return (
    <div className={`w-[210mm] min-h-[297mm] bg-white p-[16mm] text-gray-900 ${fontClass}`}>
      <Header data={data} config={config} />

      {summary && (
        <section className="mb-6">
          <SectionHeading config={config}>{getSectionTitle(data, "summary", "Professional Summary")}</SectionHeading>
          <p className="text-sm leading-relaxed text-gray-700">{renderBoldText(summary)}</p>
        </section>
      )}

      {data.experience.length > 0 && <ExperienceSection data={data} config={config} />}

      {education.length > 0 && (
        <section className="mb-6">
          <SectionHeading config={config}>{getSectionTitle(data, "education", "Education")}</SectionHeading>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-baseline justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{renderBoldText(edu.degree)}</p>
                  <p className="text-xs text-gray-600">
                    {renderBoldText(edu.institution)}
                    {edu.score ? ` — ${""}` : ""}
                    {renderBoldText(edu.score)}
                  </p>
                </div>
                <span className="whitespace-nowrap text-xs text-gray-500">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <SectionHeading config={config}>{getSectionTitle(data, "skills", "Skills")}</SectionHeading>
          <p className="text-sm leading-relaxed text-gray-700">
            {skills.map((skill, index) => (
              <span key={skill.id}>
                {index > 0 && ", "}
                {renderBoldText(skill.name)}
              </span>
            ))}
          </p>
        </section>
      )}

      {languages.length > 0 && (
        <section className="mb-6">
          <SectionHeading config={config}>{getSectionTitle(data, "languages", "Languages")}</SectionHeading>
          <p className="text-sm leading-relaxed text-gray-700">
            {languages.map((lang, index) => (
              <span key={lang.id}>
                {index > 0 && ", "}
                {renderBoldText(lang.name)} ({lang.proficiency})
              </span>
            ))}
          </p>
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <SectionHeading config={config}>{getSectionTitle(data, "certifications", "Certifications")}</SectionHeading>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {certifications.map((cert) => (
              <li key={cert.id}>
                {renderBoldText(cert.name)}
                {cert.organization ? ` — ${""}` : ""}
                {renderBoldText(cert.organization)}
                {cert.year ? `, ${cert.year}` : ""}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function makeATSTemplate(index: number) {
  return function Template({ data }: { data: ResumeData }) {
    return <ATSTemplate data={data} config={atsTemplates[index]} />;
  };
}

export const ATSTemplateComponents = atsTemplates.map((_, index) => makeATSTemplate(index));
