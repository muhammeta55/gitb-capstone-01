import { Skeleton } from "@/components/ui/Skeleton";

export default function BootcampDetailLoading() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="h-5 w-full max-w-lg" />
      </div>

      <Skeleton className="h-72 w-full mb-10 rounded-lg" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        <div className="lg:col-span-1">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </main>
  );
}