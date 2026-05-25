import type { ComponentType } from "react";
import type { ResumeData } from "@/types/resume";

export interface TemplateComponent {
  default: ComponentType<{ data: ResumeData }>;
}

export const templateNames: Record<number, string> = {
  1: "Pure Minimal",
  2: "Dark Executive",
  3: "Gradient Wave",
  4: "Navy Sidebar",
  5: "Two-Column Split",
  6: "Timeline Vertical",
  7: "Card Grid",
  8: "Geometric Shapes",
  9: "Magazine Editorial",
  10: "Brutalist",
  11: "Pastel Soft",
  12: "Neon Nights",
  13: "Swiss Grid",
  14: "Retro Memphis",
  15: "Organic Nature",
  16: "Tech Terminal",
  17: "Blueprint",
  18: "Asymmetric",
  19: "Overlapping",
  20: "Photo Header",
  21: "Ornate Frame",
  22: "Diagonal Split",
  23: "Mosaic Grid",
  24: "Wabi-Sabi",
  25: "Art Deco",
  26: "Material Design",
  27: "Flat Bold",
  28: "Typography Hero",
  29: "Color Block",
  30: "Line Art",
  31: "Dotted World",
  32: "Horizontal Bands",
  33: "Glassmorphism",
  34: "3D Perspective",
  35: "Circular Motif",
  36: "Staircase",
  37: "Hexagonal",
  38: "Ribbon Banner",
  39: "Masonry Flow",
  40: "Ultra Modern",
};

export const templateCategories: Record<string, number[]> = {
  "Professional": [1, 4, 5, 13, 21, 30, 40],
  "Creative": [3, 8, 9, 14, 18, 19, 23, 35, 36, 39],
  "Modern": [6, 7, 22, 26, 27, 28, 32, 38],
  "Dark": [2, 12, 16, 25, 37],
  "Minimal": [10, 11, 15, 17, 24, 29, 31, 33, 34],
};

// Import all templates
import Template01 from "./Template01";
import Template02 from "./Template02";
import Template03 from "./Template03";
import Template04 from "./Template04";
import Template05 from "./Template05";
import Template06 from "./Template06";
import Template07 from "./Template07";
import Template08 from "./Template08";
import Template09 from "./Template09";
import Template10 from "./Template10";
import Template11 from "./Template11";
import Template12 from "./Template12";
import Template13 from "./Template13";
import Template14 from "./Template14";
import Template15 from "./Template15";
import Template16 from "./Template16";
import Template17 from "./Template17";
import Template18 from "./Template18";
import Template19 from "./Template19";
import Template20 from "./Template20";
import Template21 from "./Template21";
import Template22 from "./Template22";
import Template23 from "./Template23";
import Template24 from "./Template24";
import Template25 from "./Template25";
import Template26 from "./Template26";
import Template27 from "./Template27";
import Template28 from "./Template28";
import Template29 from "./Template29";
import Template30 from "./Template30";
import Template31 from "./Template31";
import Template32 from "./Template32";
import Template33 from "./Template33";
import Template34 from "./Template34";
import Template35 from "./Template35";
import Template36 from "./Template36";
import Template37 from "./Template37";
import Template38 from "./Template38";
import Template39 from "./Template39";
import Template40 from "./Template40";

const templateComponents: Record<number, ComponentType<{ data: ResumeData }>> = {
  1: Template01,
  2: Template02,
  3: Template03,
  4: Template04,
  5: Template05,
  6: Template06,
  7: Template07,
  8: Template08,
  9: Template09,
  10: Template10,
  11: Template11,
  12: Template12,
  13: Template13,
  14: Template14,
  15: Template15,
  16: Template16,
  17: Template17,
  18: Template18,
  19: Template19,
  20: Template20,
  21: Template21,
  22: Template22,
  23: Template23,
  24: Template24,
  25: Template25,
  26: Template26,
  27: Template27,
  28: Template28,
  29: Template29,
  30: Template30,
  31: Template31,
  32: Template32,
  33: Template33,
  34: Template34,
  35: Template35,
  36: Template36,
  37: Template37,
  38: Template38,
  39: Template39,
  40: Template40,
};

export function getTemplateComponent(templateNumber: number): ComponentType<{ data: ResumeData }> {
  return templateComponents[templateNumber] || Template01;
}
