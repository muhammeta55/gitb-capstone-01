import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta.dashboard");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

// Static mock content — no real account/session data connected.
// This page satisfies the brief's "Should" item as a visual preview only.
const MOCK = {
  programTitle: "Full-Stack Web Development",
  progressPercent: 62,
  currentModule: 5,
  totalModules: 8,
  upcomingSessions: [
    { title: "React Server Components deep dive", date: "Sep 12, 18:00 CET" },
    { title: "Live code review — Week 5 projects", date: "Sep 15, 17:00 CET" },
    { title: "Q&A with instructor", date: "Sep 18, 18:00 CET" },
  ],
  stats: { assignments: 14, hours: 62, streak: 9 },
};

export default async function DashboardPage() {
  const t = await getTranslations("dashboardPage");

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <div className="mb-3">
        <Badge variant="warning">{t("mockNotice")}</Badge>
      </div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text">{t("welcomeBack")}</h1>
        <p className="text-muted mt-1">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: program progress + sessions */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-text">{t("enrolledProgram")}</h2>
              <Badge variant="primary">{MOCK.programTitle}</Badge>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm text-muted mb-1.5">
                <span>{t("moduleLabel", { current: MOCK.currentModule, total: MOCK.totalModules })}</span>
                <span>{t("progressLabel", { percent: MOCK.progressPercent })}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${MOCK.progressPercent}%` }}
                />
              </div>
            </div>
            <Button className="w-full sm:w-auto">{t("continueLearning")}</Button>
          </Card>

          <Card className="space-y-4">
            <h2 className="font-semibold text-text">{t("upcomingSessions")}</h2>
            <ul className="space-y-3">
              {MOCK.upcomingSessions.map((session) => (
                <li
                  key={session.title}
                  className="flex items-center justify-between gap-4 rounded-md border border-border px-3 py-2.5"
                >
                  <span className="text-sm text-text">{session.title}</span>
                  <span className="text-xs text-muted shrink-0">{session.date}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Right: certificate + stats */}
        <div className="space-y-6">
          <Card className="space-y-2">
            <h2 className="font-semibold text-text">{t("certificateStatus")}</h2>
            <Badge variant="warning">{t("certificateInProgress")}</Badge>
          </Card>

          <Card className="space-y-4">
            <h2 className="font-semibold text-text">{t("quickStats")}</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">{t("statAssignments")}</span>
                <span className="font-semibold text-text">{MOCK.stats.assignments}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">{t("statHours")}</span>
                <span className="font-semibold text-text">{MOCK.stats.hours}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">{t("statStreak")}</span>
                <span className="font-semibold text-text">{MOCK.stats.streak}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}