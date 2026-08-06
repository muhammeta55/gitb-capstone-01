"use client";

import { useEffect, useState } from "react";

export interface Countdown {
  hasStarted: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculate(targetDate: string): Countdown {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { hasStarted: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { hasStarted: false, days, hours, minutes, seconds };
}

export function useCountdown(targetDate: string): Countdown {
  const [countdown, setCountdown] = useState<Countdown>(() => calculate(targetDate));

  useEffect(() => {
    // targetDate değiştiyse ilk değeri anında tazele (döngü değil, tek seferlik senkronizasyon)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCountdown(calculate(targetDate));

    const interval = setInterval(() => {
      setCountdown(calculate(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}