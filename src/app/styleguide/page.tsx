export default function StyleguidePage() {
  const colors = [
    { label: "Primary", bg: "bg-primary" },
    { label: "Secondary", bg: "bg-secondary" },
    { label: "Accent", bg: "bg-accent" },
    { label: "Background", bg: "bg-background" },
    { label: "Surface", bg: "bg-surface" },
    { label: "Text", bg: "bg-text" },
    { label: "Muted", bg: "bg-muted" },
    { label: "Border", bg: "bg-border" },
    { label: "Success", bg: "bg-success" },
    { label: "Warning", bg: "bg-warning" },
    { label: "Error", bg: "bg-error" },
  ];

  const textSizes = [
    { size: "xs", className: "text-xs" },
    { size: "sm", className: "text-sm" },
    { size: "base", className: "text-base" },
    { size: "lg", className: "text-lg" },
    { size: "xl", className: "text-xl" },
    { size: "2xl", className: "text-2xl" },
    { size: "3xl", className: "text-3xl" },
  ];

  const radii = [
    { name: "sm", className: "rounded-sm" },
    { name: "md", className: "rounded-md" },
    { name: "lg", className: "rounded-lg" },
    { name: "full", className: "rounded-full" },
  ];

  const shadows = [
    { name: "sm", className: "shadow-sm" },
    { name: "md", className: "shadow-md" },
    { name: "lg", className: "shadow-lg" },
  ];

  return (
    <main className="p-8 space-y-12 max-w-4xl mx-auto">
      <h1 className="font-heading text-3xl">Style Guide</h1>

      <section>
        <h2 className="font-heading text-xl mb-4">Colors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {colors.map((c) => (
            <div key={c.label} className="border border-border rounded-md overflow-hidden">
              <div className={`h-16 ${c.bg}`} />
              <p className="p-2 text-sm">{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-xl mb-4">Typography</h2>
        <div className="space-y-2">
          {textSizes.map((t) => (
            <p key={t.size} className={t.className}>
              text-{t.size} — The quick brown fox
            </p>
          ))}
        </div>
        <p className="font-heading text-lg mt-4">font-heading (Sora)</p>
        <p className="font-sans text-lg">font-sans (Geist)</p>
      </section>

      <section>
        <h2 className="font-heading text-xl mb-4">Radius</h2>
        <div className="flex gap-4">
          {radii.map((r) => (
            <div key={r.name} className={`w-20 h-20 bg-primary ${r.className}`} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-xl mb-4">Shadows</h2>
        <div className="flex gap-6">
          {shadows.map((s) => (
            <div key={s.name} className={`w-20 h-20 bg-surface border border-border rounded-md ${s.className}`} />
          ))}
        </div>
      </section>
    </main>
  );
}