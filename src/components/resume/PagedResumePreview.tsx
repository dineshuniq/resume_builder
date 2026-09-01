import { type ComponentType, type CSSProperties, type RefObject, useCallback, useLayoutEffect, useRef, useState } from "react";
import type { ResumeData } from "@/types/resume";

const PAGE_GAP_FALLBACK = 24;
/* scrollWidth is a whole number while a 210mm column is not, so a flow holding
   exactly N columns can report up to a pixel wider than N columns occupy. That
   surplus tips the ceiling below into N+1 and appends a blank sheet, which is
   why a resume ending flush with page one showed an empty page two. */
const COLUMN_ROUNDING_TOLERANCE = 1;
const ATOMIC_SELECTOR = "article,section,div,li,ul,ol,p";
const GROUP_SELECTOR = "article,section,div,li,ul,ol,p,h1,h2,h3,h4,h5,h6";
/* Blocks worth keeping on one sheet: an entry the text scan identified, a card
   the template drew a border, rounding or shadow around, or a wrapper carrying
   entry-sized bottom spacing. Whole-token matching keeps mb-2 from also catching
   mb-20/mb-24. Matching here only nominates a block -- it is kept whole solely
   if the measure pass then finds it short enough. */
const KEEP_WHOLE_SELECTOR = [
  ".resume-atomic-block",
  '[class*="border-l"]',
  '[class*="rounded-lg"]',
  '[class*="shadow"]',
  '[class*="timeline"]',
  '[class~="mb-2"]',
  '[class~="mb-3"]',
  '[class~="mb-4"]',
  '[class~="mb-5"]',
  '[class~="mb-6"]',
].join(",");
/* A group taller than this share of a sheet cannot be kept whole without
   stranding a large blank area, so it is allowed to break across pages.
   Roughly eleven lines of body text: entry and project wrappers above it flow,
   while bullets, headings and short blocks still stay together. */
const MAX_ATOMIC_HEIGHT_RATIO = 0.2;

interface PagedResumePreviewProps {
  Template: ComponentType<{ data: ResumeData }>;
  data: ResumeData;
  printRef: RefObject<HTMLDivElement | null>;
}

interface PageLayout {
  count: number;
  pageWidth: number;
  pageHeight: number;
  pageStep: number;
  scale: number;
  pageSkin: {
    backgroundColor: string;
    backgroundImage: string;
    backgroundPosition: string;
    backgroundRepeat: string;
    backgroundSize: string;
  };
}

function normalizeText(value: string | null | undefined) {
  return (value || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function markSmallestBlock(root: HTMLElement, terms: string[]) {
  const normalizedTerms = terms.map(normalizeText).filter(Boolean);
  if (normalizedTerms.length === 0) return;

  const rootText = normalizeText(root.textContent);
  const elements = Array.from(root.querySelectorAll<HTMLElement>(ATOMIC_SELECTOR))
    .filter((element) => element !== root && !element.classList.contains("resume-page-flow"))
    .filter((element) => {
      const text = normalizeText(element.textContent);
      return text.length > 0 && text.length < rootText.length * 0.9 && normalizedTerms.every((term) => text.includes(term));
    })
    .sort((a, b) => normalizeText(a.textContent).length - normalizeText(b.textContent).length);

  const match = elements[0];
  if (match) {
    match.classList.add("resume-atomic-block");
  }
}

function annotateAtomicBlocks(root: HTMLElement, data: ResumeData) {
  root.querySelectorAll(".resume-atomic-block").forEach((element) => {
    element.classList.remove("resume-atomic-block");
  });

  markSmallestBlock(root, [data.personalInfo.fullName, data.personalInfo.title]);
  markSmallestBlock(root, [data.summary]);

  data.experience.forEach((experience) => {
    const firstProject = experience.projects[0];
    markSmallestBlock(root, [experience.role, experience.company, firstProject?.title || experience.from]);

    experience.projects.forEach((project) => {
      markSmallestBlock(root, [project.title, project.bullets[0] || ""]);
    });
  });

  data.education.forEach((education) => {
    markSmallestBlock(root, [education.degree, education.institution]);
  });

  data.certifications.forEach((certification) => {
    markSmallestBlock(root, [certification.name, certification.organization]);
  });

  const skillNames = data.skills.slice(0, 4).map((skill) => skill.name);
  markSmallestBlock(root, skillNames);

  const languageNames = data.languages.slice(0, 3).map((language) => language.name);
  markSmallestBlock(root, languageNames);
}

interface GroupDecisions {
  keepWhole: Set<number>;
  splittable: Set<number>;
}

function measureGroups(flow: HTMLElement, maxHeight: number): GroupDecisions {
  const elements = Array.from(flow.querySelectorAll<HTMLElement>(GROUP_SELECTOR));

  // Inside a column layout a tall group is split across columns, so its box is
  // only meaningful once columns are switched off for the measurement.
  const previousColumnWidth = flow.style.columnWidth;
  const previousHeight = flow.style.height;
  flow.style.columnWidth = "auto";
  flow.style.height = "auto";

  const keepWhole = new Set<number>();
  const splittable = new Set<number>();
  elements.forEach((element, index) => {
    if (element.getBoundingClientRect().height > maxHeight) {
      splittable.add(index);
    } else if (element.matches(KEEP_WHOLE_SELECTOR)) {
      keepWhole.add(index);
    }
  });

  flow.style.columnWidth = previousColumnWidth;
  flow.style.height = previousHeight;

  return { keepWhole, splittable };
}

function applyGroupDecisions(flow: HTMLElement, decisions: GroupDecisions) {
  const elements = Array.from(flow.querySelectorAll<HTMLElement>(GROUP_SELECTOR));
  elements.forEach((element, index) => {
    element.classList.toggle("resume-keep-whole", decisions.keepWhole.has(index));
    element.classList.toggle("resume-splittable", decisions.splittable.has(index));
  });
}

function readPageSkin(flow: HTMLElement): PageLayout["pageSkin"] {
  const templateRoot = flow.firstElementChild as HTMLElement | null;
  const computed = templateRoot ? window.getComputedStyle(templateRoot) : null;

  return {
    backgroundColor: computed?.backgroundColor || "rgb(255, 255, 255)",
    backgroundImage: computed?.backgroundImage || "none",
    backgroundPosition: computed?.backgroundPosition || "0% 0%",
    backgroundRepeat: computed?.backgroundRepeat || "repeat",
    backgroundSize: computed?.backgroundSize || "auto",
  };
}

export default function PagedResumePreview({ Template, data, printRef }: PagedResumePreviewProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [layout, setLayout] = useState<PageLayout>({
    count: 1,
    pageWidth: 794,
    pageHeight: 1123,
    pageStep: 818,
    scale: 1,
    pageSkin: {
      backgroundColor: "rgb(255, 255, 255)",
      backgroundImage: "none",
      backgroundPosition: "0% 0%",
      backgroundRepeat: "repeat",
      backgroundSize: "auto",
    },
  });

  /* A full pass costs ~250ms on a long resume, so it stays off the keystroke
     path and runs a frame later. Nothing it does is load-bearing for
     correctness: grouping is opt-in, so until this lands the content simply
     flows and fills each sheet. */
  const measureNow = useCallback(() => {
    const shell = shellRef.current;
    const flow = measureRef.current;

    if (!shell || !flow) return;

    // Runs first so the blocks it marks can be nominated as groups below.
    const flows = Array.from(shell.querySelectorAll<HTMLElement>(".resume-page-flow"));
    flows.forEach((pageFlow) => annotateAtomicBlocks(pageFlow, data));

    // Every flow renders the same template with the same data, so which groups
    // fit on a sheet only needs measuring once.
    const decisions = measureGroups(flow, flow.clientHeight * MAX_ATOMIC_HEIGHT_RATIO);
    flows.forEach((pageFlow) => applyGroupDecisions(pageFlow, decisions));

    const rect = flow.getBoundingClientRect();
    const computed = window.getComputedStyle(flow);
    const columnGap = Number.parseFloat(computed.columnGap) || PAGE_GAP_FALLBACK;
    const pageWidth = rect.width;
    const pageHeight = rect.height;
    const pageStep = pageWidth + columnGap;
    const count = Math.max(1, Math.ceil((flow.scrollWidth + columnGap - COLUMN_ROUNDING_TOLERANCE) / pageStep));

    /* Measured on the pane rather than the shell: the shell carries a min-width
       of max(100%, --resume-stage-width), and that variable is this scale times
       the page width. Reading its own width therefore fed the result back into
       itself, and once the scale reached 1 nothing could ever bring it back
       down, so a pane narrower than a sheet overflowed instead of fitting. */
    const pane = shell.parentElement;
    const paneStyle = pane && window.getComputedStyle(pane);
    const paneWidth = pane && paneStyle
      ? pane.clientWidth -
        (Number.parseFloat(paneStyle.paddingLeft) || 0) -
        (Number.parseFloat(paneStyle.paddingRight) || 0)
      : shell.clientWidth;
    const availableWidth = Math.max(280, paneWidth);
    const scale = Math.min(1, availableWidth / pageWidth);
    const pageSkin = readPageSkin(flow);

    setLayout((current) => {
      const next = { count, pageWidth, pageHeight, pageStep, scale, pageSkin };
      const changed =
        current.count !== next.count ||
        current.pageWidth !== next.pageWidth ||
        current.pageHeight !== next.pageHeight ||
        current.pageStep !== next.pageStep ||
        current.scale !== next.scale ||
        Object.entries(next.pageSkin).some(([key, value]) => current.pageSkin[key as keyof PageLayout["pageSkin"]] !== value);

      return changed ? next : current;
    });
  }, [data]);

  const recalculate = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      measureNow();
    });
  }, [measureNow]);

  /* layout.count is a dependency because growing the page count mounts fresh
     flows after the pass above has already run; they would otherwise keep the
     unannotated markup. The extra pass settles immediately: once the count
     stops changing setLayout returns the current object and no render follows. */
  useLayoutEffect(() => {
    recalculate();
  }, [Template, data, recalculate, layout.count]);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const flow = measureRef.current;
    const observer = new ResizeObserver(recalculate);

    if (shell) observer.observe(shell);
    if (flow) observer.observe(flow);
    // The shell stops narrowing once its min-width takes over, so the pane is
    // watched too: below that width it is the only one still reporting changes.
    if (shell?.parentElement) observer.observe(shell.parentElement);

    window.addEventListener("resize", recalculate);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      observer.disconnect();
      window.removeEventListener("resize", recalculate);
    };
  }, [recalculate]);

  const pages = Array.from({ length: layout.count }, (_, index) => index);
  const stageStyle = {
    "--resume-preview-scale": layout.scale,
    "--resume-stage-width": `${layout.pageWidth * layout.scale}px`,
    "--resume-stage-height": `${(layout.pageHeight * layout.count + 24 * Math.max(0, layout.count - 1)) * layout.scale}px`,
  } as CSSProperties;
  const pageSkinStyle = {
    "--resume-page-bg-color": layout.pageSkin.backgroundColor,
    "--resume-page-bg-image": layout.pageSkin.backgroundImage,
    "--resume-page-bg-position": layout.pageSkin.backgroundPosition,
    "--resume-page-bg-repeat": layout.pageSkin.backgroundRepeat,
    "--resume-page-bg-size": layout.pageSkin.backgroundSize,
  } as CSSProperties;

  return (
    <div ref={shellRef} className="resume-preview-shell" style={stageStyle}>
      <div ref={measureRef} className="resume-page-flow resume-page-flow--measure" aria-hidden="true">
        <Template data={data} />
      </div>

      <div className="resume-preview-stage">
        <div ref={printRef} className="resume-print-pages">
          {pages.map((pageIndex) => (
            <div key={pageIndex} className="resume-page-print-break">
              <div className="resume-page-screen-label">Page {pageIndex + 1}</div>
              <div className="resume-page-sheet" style={pageSkinStyle}>
                <div className="resume-page-window">
                  <div
                    className="resume-page-flow resume-page-flow--page"
                    style={{ transform: `translateX(-${pageIndex * layout.pageStep}px)` }}
                  >
                    <Template data={data} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
