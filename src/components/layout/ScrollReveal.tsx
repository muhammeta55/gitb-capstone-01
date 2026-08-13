"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Reusable "fade + slide up" reveal for any section, re-triggering every
// time it scrolls into/out of view (not once) — so scrolling back up and
// down replays the animation each time. Uses framer-motion's useInView
// (IntersectionObserver under the hood, not a scroll listener) so it
// stays cheap even on long pages — no continuous re-renders while
// scrolling.
export function ScrollReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
