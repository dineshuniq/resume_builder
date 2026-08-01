import type { ResumeData, SectionTitles } from "@/types/resume";
import { defaultSectionTitles } from "@/types/resume";

export function getSectionTitles(data: ResumeData): SectionTitles {
  return {
    ...defaultSectionTitles,
    ...data.sectionTitles,
  };
}

export function getSectionTitle(data: ResumeData, key: keyof SectionTitles, fallback?: string) {
  const title = data.sectionTitles?.[key]?.trim();
  const defaultTitle = defaultSectionTitles[key];

  if (!title || title === defaultTitle) {
    return fallback || defaultTitle;
  }

  return title;
}
