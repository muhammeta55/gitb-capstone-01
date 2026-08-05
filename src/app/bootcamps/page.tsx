import { bootcamps } from "@/data/bootcamps";
import { BootcampCard } from "@/components/bootcamps/BootcampCard";

export default function BootcampsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Bootcamps</h1>
        <p className="text-muted mt-2">
          Browse all {bootcamps.length} bootcamps and find the right program for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bootcamps.map((bootcamp) => (
          <BootcampCard key={bootcamp.slug} bootcamp={bootcamp} />
        ))}
      </div>
    </main>
  );
}