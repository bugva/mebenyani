import { cn } from "@/lib/cn";

/**
 * bugva marka logosu — "mark" b+v monogramı, "full" bugva logotipi.
 * public/logo altındaki SVG'lerle aynı geometri; inline kullanım renk/boyut kontrolü sağlar.
 */
export function BugvaLogo({
  variant = "full",
  className,
}: {
  variant?: "mark" | "full";
  className?: string;
}) {
  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 140 140"
        fill="none"
        className={cn("h-8 w-8", className)}
        role="img"
        aria-label="bugva"
      >
        <defs>
          <linearGradient
            id="bugva-mark-grad"
            gradientUnits="userSpaceOnUse"
            x1="15"
            y1="21"
            x2="125"
            y2="119"
          >
            <stop offset="0%" stopColor="#7da4ff" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <g
          stroke="url(#bugva-mark-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 28 V112" />
          <circle cx="44" cy="90" r="22" />
          <path d="M82 68 L100 112 L118 68" />
        </g>
        <circle cx="44" cy="90" r="6.5" fill="url(#bugva-mark-grad)" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 336 136"
      fill="none"
      className={cn("h-6 w-auto", className)}
      role="img"
      aria-label="bugva"
    >
      <defs>
        <linearGradient
          id="bugva-full-grad"
          gradientUnits="userSpaceOnUse"
          x1="20"
          y1="68"
          x2="316"
          y2="68"
        >
          <stop offset="0%" stopColor="#7da4ff" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <g
        stroke="#9095a0"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M82 46 L82 70 A22 22 0 0 0 126 70 L126 46" />
        <circle cx="166" cy="68" r="22" />
        <path d="M188 46 V100 A18 18 0 0 1 152 100" />
        <circle cx="290" cy="68" r="22" />
        <path d="M312 46 V90" />
      </g>
      <g
        stroke="url(#bugva-full-grad)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 18 V90" />
        <circle cx="42" cy="68" r="22" />
        <path d="M206 46 L228 90 L250 46" />
      </g>
      <circle cx="42" cy="68" r="6" fill="url(#bugva-full-grad)" />
    </svg>
  );
}
