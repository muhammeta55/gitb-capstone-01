"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";

interface ConsentPreferences {
  necessary: true;
  analytics: boolean;
}

const STORAGE_KEY = "cookie-consent";

export function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading
    // browser storage after mount is the documented exception for this rule
    if (!stored) setVisible(true);
  }, []);

  function saveConsent(prefs: ConsentPreferences) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setVisible(false);
  }

  function handleAcceptAll() {
    saveConsent({ necessary: true, analytics: true });
  }

  function handleRejectAll() {
    saveConsent({ necessary: true, analytics: false });
  }

  function handleSavePreferences() {
    saveConsent({ necessary: true, analytics });
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("title")}
      className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        {!showPreferences ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              {t("message")}
            </p>
            <div className="flex flex-wrap gap-2 shrink-0 items-center">
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="text-sm text-text hover:text-primary underline underline-offset-4 px-2"
              >
                {t("managePreferences")}
              </button>
              <Button variant="ghost" size="sm" onClick={handleRejectAll}>
                {t("rejectAll")}
              </Button>
              <Button size="sm" onClick={handleAcceptAll}>
                {t("acceptAll")}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-text">{t("preferencesTitle")}</h2>
              <p className="text-sm text-muted mt-1">{t("preferencesDescription")}</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-text">{t("necessaryTitle")}</p>
                  <p className="text-xs text-muted">{t("necessaryDescription")}</p>
                </div>
                <Checkbox id="cookie-necessary" label="" checked disabled />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-text">{t("analyticsTitle")}</p>
                  <p className="text-xs text-muted">{t("analyticsDescription")}</p>
                </div>
                <Checkbox
                  id="cookie-analytics"
                  label=""
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={() => setShowPreferences(false)}>
                {t("back")}
              </Button>
              <Button size="sm" onClick={handleSavePreferences}>
                {t("savePreferences")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}