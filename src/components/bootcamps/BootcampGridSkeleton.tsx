import { BootcampCardSkeleton } from "./BootcampCardSkeleton";

export function BootcampsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <BootcampCardSkeleton key={i} />
      ))}
    </div>
  );
}