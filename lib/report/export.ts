import type { ReportData } from "@/lib/report/types";

export function canUseBrowserPrinting(): boolean {
  return typeof window !== "undefined" && typeof window.print === "function";
}

export function triggerBrowserPrint(): { ok: boolean; message: string } {
  if (!canUseBrowserPrinting()) {
    return { ok: false, message: "Browser print is unavailable in this environment." };
  }

  window.print();
  return { ok: true, message: "Print dialog opened. Use Save as PDF to export." };
}

export function buildReportShareSummary(report: ReportData): string {
  return [
    `${report.header.title} (${report.header.generatedDateLabel})`,
    `Source: ${report.header.sourceLabel}`,
    `Current net worth: ${report.header.topLine.currentNetWorthLabel}`,
    `Estimated Regular FIRE: ${report.header.topLine.regularFireAgeLabel}`,
    `Primary lever: ${report.header.topLine.primaryLeverLabel}`,
  ].join(" | ");
}

export async function copyTextToClipboard(text: string): Promise<{ ok: boolean; message: string }> {
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    return { ok: false, message: "Clipboard is unavailable in this environment." };
  }

  try {
    await navigator.clipboard.writeText(text);
    return { ok: true, message: "Summary copied to clipboard." };
  } catch {
    return { ok: false, message: "Failed to copy summary to clipboard." };
  }
}
