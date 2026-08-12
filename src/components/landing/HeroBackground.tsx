"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ROTATION_INTERVAL = 6000; // 6s per image

interface HeroBackgroundProps {
  images: string[];
}

// Isolated as its own client component so Hero.tsx itself can stay a
// server component — only the parts that actually need client-side state
// (the rotation timer) pay the client-JS cost.
export function HeroBackground({ images }: HeroBackgroundProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // No rotation for users who prefer reduced motion — a cycling
    // background is itself a motion effect, not just a transition.
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(timer);
  }, [images.length, prefersReducedMotion]);

  // Preload the next image in the sequence ahead of its turn. Without
  // this, the crossfade can start before the browser has actually
  // fetched the upcoming image — instead of a smooth 1.2s fade, the
  // image abruptly "pops in" once the fetch finally resolves. Preloading
  // gives it the full rotation interval (6s) to fetch, so by the time
  // it becomes active it's already in the browser cache.
  useEffect(() => {
    if (images.length < 2) return;
    const nextIndex = (index + 1) % images.length;
    const preload = new window.Image();
    preload.src = images[nextIndex];
  }, [index, images]);

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={images[index]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src={images[index]}
          alt=""
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    </AnimatePresence>
  );
}