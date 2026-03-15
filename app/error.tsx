"use client";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="mx-auto max-w-2xl rounded-xl border bg-white p-6 text-center sm:p-10">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">FirePath</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="mt-3 text-sm text-muted-foreground sm:text-base">
        We couldn&apos;t load this view right now. You can try again or return to the main flow.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button type="button" onClick={reset}>Try again</Button>
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>Back Home</Link>
      </div>
    </section>
  );
}
