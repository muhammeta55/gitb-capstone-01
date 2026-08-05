import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spinner } from "@/components/ui/Spinner";

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
      <section>
        <h2 className="font-heading text-xl mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button isLoading>Loading</Button>
            <Button disabled>Disabled</Button>
        </div>
        </section>
        <section>
            <h2 className="font-heading text-xl mb-4">Card</h2>
            <Card className="max-w-sm">
                <h3 className="font-heading text-lg mb-2">Sample Card</h3>
                <p className="text-text">This is card content using the surface background and border tokens.</p>
            </Card>
        </section>

        <section>
            <h2 className="font-heading text-xl mb-4">Badges</h2>
            <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="muted">Muted</Badge>
            </div>
        </section>
        <section>
        <h2 className="font-heading text-xl mb-4">Form Elements</h2>
        <div className="flex flex-col gap-4 max-w-sm">
            <Input id="demo-input" label="Email" placeholder="you@example.com" />
            <Input id="demo-input-error" label="Email" error="This field is required" />
            <Textarea id="demo-textarea" label="Message" placeholder="Type here..." />
            <Checkbox id="demo-checkbox" label="I agree to the terms" />
        </div>
        </section>
        <section>
        <h2 className="font-heading text-xl mb-4">Select</h2>
        <Select id="demo-select" label="Category" className="max-w-sm">
            <option value="">Choose a category</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
        </Select>
        </section>

        <section>
        <h2 className="font-heading text-xl mb-4">Skeleton</h2>
        <div className="flex flex-col gap-2 max-w-sm">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-32 w-full" />
        </div>
        </section>

        <section>
        <h2 className="font-heading text-xl mb-4">Spinner</h2>
        <div className="flex gap-4 items-center">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
        </div>
        </section>
    </main>
  );
}