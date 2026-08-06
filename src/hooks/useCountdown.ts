"use client";

import { useEffect, useState } from "react";

export interface Countdown {
  hasStarted: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ready: boolean; // client'ta gerçek değer hesaplanana kadar false
}

function calculate(targetDate: string): Omit<Countdown, "ready"> {
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

// Sunucu ve istemcinin ilk render'da üretmesi gereken ortak, sabit değer.
// Gerçek sayı burada değil, sadece useEffect'te (client-only) hesaplanır.
const INITIAL: Countdown = {
  hasStarted: false,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  ready: false,
};

export function useCountdown(targetDate: string): Countdown {
  const [countdown, setCountdown] = useState<Countdown>(INITIAL);

  useEffect(() => {
    setCountdown({ ...calculate(targetDate), ready: true });

    const interval = setInterval(() => {
      setCountdown({ ...calculate(targetDate), ready: true });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}