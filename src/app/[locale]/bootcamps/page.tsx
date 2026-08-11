import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { bootcamps } from "@/data/bootcamps";
import { categories } from "@/data/categories";
import { BootcampsBrowser } from "@/components/bootcamps/BootcampsBrowser";
import { BootcampsGridSkeleton } from "@/components/bootcamps/BootcampGridSkeleton";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta.bootcamps");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

// Deterministic "commit intensity" per cell — same output on server and
// client every time, so there's nothing for hydration to mismatch on.
function cellIntensity(i: number) {
  return (i * 37 + (i % 7) * 13) % 5; // 0 (empty) .. 4 (brightest)
}

const INTENSITY_CLASSES = [
  "bg-white/[0.04]",
  "bg-emerald-500/20",
  "bg-emerald-500/40",
  "bg-emerald-400/65",
  "bg-emerald-400",
];

function CommitHeatmap() {
  const rows = 7;
  const cols = 26;
  const cells = Array.from({ length: rows * cols });

  return (
    <div
      aria-hidden
      className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden opacity-70"
    >
      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {cells.map((_, i) => {
          const intensity = cellIntensity(i);
          return (
            <span
              key={i}
              className={`h-[9px] w-[9px] rounded-[2px] ${INTENSITY_CLASSES[intensity]}`}
              style={{
                opacity: 0,
                animation: "fadeInCell 0.6s ease-out forwards",
                animationDelay: `${(i % (cols * 2)) * 12}ms`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// Deterministic "code line" widths so the illustration reads as a screen
// full of code without being random / without risking hydration drift.
function lineWidth(i: number) {
  const widths = [88, 62, 74, 45, 91, 55, 68, 40, 83, 58, 71, 49];
  return widths[i % widths.length];
}

function CodeLaptopSilhouette() {
  const screenX = 60;
  const screenY = 30;
  const screenW = 520;
  const screenH = 300;
  const padding = 26;
  const lineHeight = 8;
  const lineGap = 15;
  const lineCount = 12;

  return (
    <svg
      aria-hidden
      viewBox="0 0 640 440"
      className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 w-[720px] max-w-none opacity-[0.09]"
    >
      {/* screen */}
      <rect
        x={screenX}
        y={screenY}
        width={screenW}
        height={screenH}
        rx={16}
        fill="none"
        stroke="white"
        strokeWidth={3}
      />
      {/* code lines inside the screen */}
      {Array.from({ length: lineCount }).map((_, i) => {
        const w = (lineWidth(i) / 100) * (screenW - padding * 2);
        return (
          <rect
            key={i}
            x={screenX + padding}
            y={screenY + padding + i * lineGap}
            width={w}
            height={lineHeight}
            rx={2}
            fill="#34D399"
          />
        );
      })}
      {/* base / keyboard */}
      <path
        d="M20 372 L620 372 L580 410 L60 410 Z"
        fill="none"
        stroke="white"
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <line
        x1={screenX}
        y1={screenY + screenH}
        x2={screenX + screenW}
        y2={screenY + screenH}
        stroke="white"
        strokeWidth={3}
      />
    </svg>
  );
}

export default function BootcampsPage() {
  const t = useTranslations("bootcampsPage");

  return (
    <>
      <style>{`
        @keyframes fadeInCell {
          from { opacity: 0; transform: scale(0.6); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#0D1117" }}
      >
        <CodeLaptopSilhouette />
        <CommitHeatmap />

        <div
          aria-hidden
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,17,23,0.55) 0%, rgba(13,17,23,0.9) 60%, #0D1117 100%)",
          }}
        />

        <div className="relative z-20 max-w-4xl mx-auto px-4 pt-24 pb-32 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            {t("title")}
          </h1>
          <p className="mt-4 text-slate-300 max-w-xl mx-auto">
            {t("subtitle", { count: bootcamps.length })}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pt-10 pb-10">
        <Suspense fallback={<BootcampsGridSkeleton />}>
          <BootcampsBrowser bootcamps={bootcamps} categories={categories} />
        </Suspense>
      </div>
    </>
  );
}