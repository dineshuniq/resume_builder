import type { ReactNode } from "react";

const BOLD_PATTERN = /(\*\*[^*]+\*\*)/g;
const BOLD_TOKEN = /^\*\*([^*]+)\*\*$/;

/**
 * Renders **word** markers as <strong> so bold text applied in the form
 * shows up bold in every template preview, PDF, and Word export.
 */
export function renderBoldText(text: string | undefined | null): ReactNode {
  if (!text) return text ?? "";
  if (!text.includes("**")) return text;

  const parts = text.split(BOLD_PATTERN);
  if (parts.length === 1) return text;

  return parts.map((part, index) => {
    const match = BOLD_TOKEN.exec(part);
    return match ? <strong key={index}>{match[1]}</strong> : part;
  });
}

/** Strips ** markers for contexts that need plain text (initials, filenames, aria-labels). */
export function stripBoldMarkers(text: string | undefined | null): string {
  if (!text) return text ?? "";
  return text.replace(/\*\*([^*]+)\*\*/g, "$1");
}
