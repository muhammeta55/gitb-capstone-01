"use client";

import { useEffect, useState } from "react";

interface CohortCountdownProps {
  startDate: string;
  labels?: {
    started?: string;
    startsInPrefix?: string;
    startsInSuffix?: string;
    daysUnit?: string;
    hoursUnit?: string;
    minutesUnit?: string;
    secondsUnit?: string;
  };
}

type TimeParts =
  | { started: true }
  | { started: false; days: number; hours: number; minutes: number; seconds: number };

function getTimeParts(startDate: string): TimeParts {
  const diff = new Date(startDate).getTime() - Date.now();

  if (diff <= 0) {
    return { started: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { started: false, days, hours, minutes, seconds };
}

export function CohortCountdown({ startDate, labels }: CohortCountdownProps) {
  const [time, setTime] = useState<TimeParts | null>(null);

  useEffect(() => {
    // Deliberately setting state synchronously here: `time` starts as null
    // so the server and first client render match exactly (no hydration
    // mismatch), and the real value is only computed once mounted.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(getTimeParts(startDate));

    const interval = setInterval(() => {
      setTime(getTimeParts(startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  if (time === null) {
    return <p className="text-xs font-medium text-transparent select-none">&nbsp;</p>;
  }

  if (time.started) {
    return (
      <p className="inline-flex items-center gap-1.5 text-xs font-medium text-success">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        {labels?.started ?? "Started"}
      </p>
    );
  }

  const prefix = labels?.startsInPrefix ?? "Starts in";
  const suffix = labels?.startsInSuffix ?? "";
  const dU = labels?.daysUnit ?? "d";
  const hU = labels?.hoursUnit ?? "h";
  const mU = labels?.minutesUnit ?? "m";
  const sU = labels?.secondsUnit ?? "s";

  return (
    <p className="text-xs font-medium text-primary tabular-nums">
      {prefix} {time.days}{dU} {String(time.hours).padStart(2, "0")}{hU}{" "}
      {String(time.minutes).padStart(2, "0")}{mU} {String(time.seconds).padStart(2, "0")}{sU}
      {suffix ? ` ${suffix}` : ""}
    </p>
  );
}