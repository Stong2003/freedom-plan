"use client";

import { useState } from "react";

import { SectionCard } from "@/components/cards/section-card";
import { Button } from "@/components/ui/button";
import { buildReportShareSummary, copyTextToClipboard, triggerBrowserPrint } from "@/lib/report/export";
import type { ReportData } from "@/lib/report/types";

export function ReportExportActions({ report }: { report: ReportData }) {
  const [message, setMessage] = useState("Print / Save as PDF is the supported export path today.");

  const handlePrint = () => {
    const result = triggerBrowserPrint();
    setMessage(result.message);
  };

  const handleExportPdf = () => {
    const result = triggerBrowserPrint();
    setMessage(`PDF export uses your browser print dialog: ${result.message}`);
  };

  const handleCopySummary = async () => {
    const text = buildReportShareSummary(report);
    const result = await copyTextToClipboard(text);
    setMessage(result.success ? "Summary copied to clipboard." : result.message);
  };

  return (
    <SectionCard
      className="report-section print:hidden"
      title="Export"
      description="Supported now: browser print and Save as PDF. Additional export formats are planned next."
    >
      <div className="flex flex-wrap gap-3 print:hidden">
        <Button type="button" onClick={handlePrint} aria-label="Print report or save as PDF">
          Print / Save as PDF
        </Button>
        <Button type="button" variant="secondary" onClick={handleExportPdf}>
          Open PDF flow
        </Button>
        <Button type="button" variant="outline" onClick={handleCopySummary}>
          Copy Share Summary
        </Button>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{message}</p>
    </SectionCard>
  );
}
