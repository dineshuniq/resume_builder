export interface BoldToggleResult {
  value: string;
  start: number;
  end: number;
}

/**
 * Toggles **markdown-style bold** around the selection [start, end) in value.
 * - If nothing is selected, expands to the word under the cursor.
 * - If the selection is already wrapped in ** markers, removes them.
 * - Otherwise wraps the selection in ** markers.
 * Returns null when there is nothing to bold.
 */
export function toggleBold(value: string, start: number, end: number): BoldToggleResult | null {
  if (start === end) {
    const left = value.slice(0, start);
    const right = value.slice(end);
    const leftWord = /[^\s]*$/.exec(left)?.[0] ?? "";
    const rightWord = /^[^\s]*/.exec(right)?.[0] ?? "";
    start -= leftWord.length;
    end += rightWord.length;
    if (start === end) return null;
  }

  const before = value.slice(0, start);
  const selected = value.slice(start, end);
  const after = value.slice(end);

  if (before.endsWith("**") && after.startsWith("**")) {
    const newValue = before.slice(0, -2) + selected + after.slice(2);
    return { value: newValue, start: start - 2, end: end - 2 };
  }

  const inner = /^\*\*([\s\S]+)\*\*$/.exec(selected);
  if (inner) {
    const newValue = before + inner[1] + after;
    return { value: newValue, start, end: start + inner[1].length };
  }

  const newValue = `${before}**${selected}**${after}`;
  return { value: newValue, start: start + 2, end: end + 2 };
}
