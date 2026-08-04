"use client";

import { useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useState, type RefObject } from "react";

/**
 * Ties a motion value to the scroll progress of the given section, moving
 * from `distance` to `-distance` px as the section passes through the
 * viewport. Returns a static 0 motion value when the user prefers reduced
 * motion, so nothing shifts for those users.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  distance = 40,
): MotionValue<number> {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [distance, -distance],
  );

  return y;
}
