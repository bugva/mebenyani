"use client";

import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";

/**
 * Drop-in replacement for next/image that adds a chromatic-aberration /
 * RGB-split glitch effect on hover. It renders its own `group/rgb`
 * wrapper (an `absolute inset-0` div, matching what `fill` images expect),
 * so it can be dropped straight into any `position: relative` container
 * that previously held a plain `<Image fill />`.
 */
export function RGBSplitImage({
  wrapperClassName,
  className,
  ...props
}: ImageProps & { wrapperClassName?: string }) {
  return (
    <div className={cn("group/rgb absolute inset-0", wrapperClassName)}>
      <Image {...props} className={cn(className, "relative z-0")} />
      <Image
        {...props}
        alt=""
        aria-hidden
        className={cn(
          className,
          "pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-screen transition-[opacity,transform] duration-300 ease-out will-change-transform [filter:sepia(1)_saturate(8)_hue-rotate(-15deg)_brightness(1.15)]",
          "group-hover/rgb:opacity-70 group-hover/rgb:-translate-x-[7px] group-hover/rgb:translate-y-[2px]",
        )}
      />
      <Image
        {...props}
        alt=""
        aria-hidden
        className={cn(
          className,
          "pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-screen transition-[opacity,transform] duration-300 ease-out will-change-transform [filter:sepia(1)_saturate(8)_hue-rotate(160deg)_brightness(1.15)]",
          "group-hover/rgb:opacity-70 group-hover/rgb:translate-x-[7px] group-hover/rgb:-translate-y-[2px]",
        )}
      />
    </div>
  );
}
