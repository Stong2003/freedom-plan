import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl rounded-xl border bg-white p-6 text-center sm:p-10">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">FirePath</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-sm text-muted-foreground sm:text-base">
        The page you requested is unavailable. Continue with the main planning flow from Home or start your FIRE Plan.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
          Back Home
        </Link>
        <Link href="/plan" className={cn(buttonVariants())}>
          Start Plan
        </Link>
      </div>
    </section>
  );
}
