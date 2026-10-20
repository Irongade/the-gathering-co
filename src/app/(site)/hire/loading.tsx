import { Skeleton } from "@/components/ui/skeleton";

export default function HireLoading() {
  return (
    <div className="container-content py-12 sm:py-20">
      <div className="mx-auto flex max-w-prose flex-col items-center gap-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-80" />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {["a", "b", "c", "d"].map((key) => (
          <div key={key} className="overflow-hidden rounded-xl border border-hairline bg-surface">
            <Skeleton className="aspect-[4/5] w-full rounded-none" />
            <div className="space-y-3 p-5">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-11 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
