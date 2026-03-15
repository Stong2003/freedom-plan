import { Skeleton } from "@/components/ui/skeleton";

export function PageLoadingSkeleton() {
  return (
    <section className="space-y-4 rounded-xl border bg-white p-5 sm:p-6" aria-label="Loading content">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </section>
  );
}
