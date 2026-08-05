import { BootcampCardSkeleton } from "@/components/bootcamps/BootcampCardSkeleton";

export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="h-9 w-48 bg-border rounded animate-pulse mb-2" />
        <div className="h-5 w-72 bg-border rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <BootcampCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}