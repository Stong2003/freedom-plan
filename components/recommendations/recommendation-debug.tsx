"use client";

import { useState } from "react";

import { SectionCard } from "@/components/cards/section-card";
import type { RecommendationPayload } from "@/lib/recommendations/types";

interface RecommendationDebugProps {
  payload: RecommendationPayload;
  prompt: string;
}

export function RecommendationDebug({ payload, prompt }: RecommendationDebugProps) {
  const [open, setOpen] = useState(false);

  return (
    <SectionCard className="report-section print:hidden" title="Technical details" description="Optional debug payloads for development.">
      <div className="space-y-3">
        <button
          type="button"
          className="rounded-md border bg-white px-3 py-2 text-sm text-muted-foreground"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Hide" : "Show"} debug payload
        </button>

        {open ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <pre className="max-h-[360px] overflow-auto rounded-md border bg-secondary/30 p-3 text-xs">
              {JSON.stringify(payload, null, 2)}
            </pre>
            <pre className="max-h-[360px] overflow-auto rounded-md border bg-secondary/30 p-3 text-xs">{prompt}</pre>
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}
