import chromium from "@sparticuz/chromium";
import puppeteer, { type Browser } from "puppeteer-core";

interface ExportPayload {
  data?: unknown;
  filename?: string;
  template?: number;
}

const LOCAL_BROWSER_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];

function sanitizeFilename(value: string | undefined) {
  return (value || "resume_candidate").replace(/[^\w-]/g, "_");
}

async function readJsonBody(req: any): Promise<ExportPayload> {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function getLocalExecutablePath() {
  const fs = await import("node:fs");
  return LOCAL_BROWSER_PATHS.find((browserPath) => fs.existsSync(browserPath));
}

async function launchBrowser(): Promise<Browser> {
  const localExecutablePath = process.env.VERCEL ? undefined : await getLocalExecutablePath();
  const executablePath = localExecutablePath || await chromium.executablePath();

  return puppeteer.launch({
    args: localExecutablePath ? ["--no-sandbox", "--disable-setuid-sandbox"] : chromium.args,
    defaultViewport: { width: 794, height: 1123, deviceScaleFactor: 1 },
    executablePath,
    headless: true,
  });
}

function getOrigin(req: any) {
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || (host?.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).send("Method Not Allowed");
    return;
  }

  let browser: Browser | undefined;

  try {
    const payload = await readJsonBody(req);
    if (!payload.data || !payload.template) {
      res.status(400).send("Missing resume data or template");
      return;
    }

    browser = await launchBrowser();
    const page = await browser.newPage();
    await page.goto(`${getOrigin(req)}/pdf-render`, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate((nextPayload) => {
      const pdfWindow = window as typeof window & {
        renderResumeForPdf?: (payload: unknown) => Promise<void>;
      };
      return pdfWindow.renderResumeForPdf?.(nextPayload);
    }, {
      data: payload.data,
      template: payload.template,
    });
    await page.waitForFunction(() => {
      const pdfWindow = window as typeof window & { resumePdfReady?: boolean };
      return pdfWindow.resumePdfReady === true;
    }, { timeout: 10000 });
    await page.emulateMediaType("print");

    const pdf = await page.pdf({
      format: "A4",
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
      printBackground: true,
      preferCSSPageSize: true,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${sanitizeFilename(payload.filename)}.pdf"`);
    res.status(200).send(Buffer.from(pdf));
  } catch (error) {
    console.error(error);
    res.status(500).send(error instanceof Error ? error.message : "PDF export failed");
  } finally {
    await browser?.close();
  }
}
