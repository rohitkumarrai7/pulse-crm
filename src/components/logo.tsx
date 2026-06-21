import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function PulseLogo({ size = "md", showText = true, className }: LogoProps) {
  const sizes = { sm: 24, md: 32, lg: 48 };
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pulseGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        {/* Background circle */}
        <circle cx="24" cy="24" r="22" fill="url(#pulseGrad)" opacity="0.15" />
        {/* Pulse/heartbeat wave */}
        <polyline
          points="6,24 12,24 15,14 19,34 23,20 26,28 30,24 42,24"
          stroke="url(#pulseGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* CRM node dot */}
        <circle cx="24" cy="24" r="3" fill="#0d9488" />
        <circle cx="24" cy="24" r="5" stroke="#0d9488" strokeWidth="1.5" fill="none" opacity="0.4" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className="font-bold tracking-tight"
            style={{
              fontSize: size === "sm" ? 14 : size === "md" ? 18 : 26,
              background: "linear-gradient(135deg, #0d9488, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            PulseCRM
          </span>
          {size !== "sm" && (
            <span className="text-[10px] text-slate-400 tracking-widest uppercase">
              by CEO.Agency
            </span>
          )}
        </div>
      )}
    </div>
  );
}
