import Link from "next/link";

export default function RootNotFound() {
  return (
    <main className="max-w-xl mx-auto px-4 py-24 text-center min-h-screen flex flex-col items-center justify-center">
      <div className="space-y-6 p-8 border border-border rounded-lg bg-surface">
        <div>
          <p className="text-6xl font-bold text-primary">404</p>
          <h1 className="text-2xl font-bold mt-4">Page not found</h1>
          <p className="text-muted mt-2">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Link
          href="/en"
          className="inline-block bg-primary text-background rounded-md px-4 py-2 font-medium hover:opacity-90"
        >
          Back to home
        </Link>

        <div className="pt-6 border-t border-border">
          <p className="text-sm font-medium mb-3">Or check out these popular pages</p>
          <div className="flex flex-col gap-2">
            <Link href="/en/bootcamps" className="text-sm text-primary hover:underline">
              Browse bootcamps
            </Link>
            <Link href="/en/schedule" className="text-sm text-primary hover:underline">
              View schedule
            </Link>
            <Link href="/en" className="text-sm text-primary hover:underline">
              Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}