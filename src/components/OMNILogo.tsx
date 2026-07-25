// -*- coding: utf-8 -*-
import React from "react";

interface OMNILogoProps {
  size?: number;
  className?: string;
  variant?: "emblem" | "full";
}

export default function OMNILogo({ size = 48, className = "", variant = "emblem" }: OMNILogoProps) {
  const emblem = (
    <svg
      viewBox="0 0 100 86.6"
      width={size}
      height={Math.round((size * 86.6) / 100)}
      role="img"
      aria-label="O.M.N.I. Emblem"
      className={`inline-block select-none ${variant === "emblem" ? className : ""}`}
      style={{ verticalAlign: "middle", flex: "0 0 auto" }}
    >
      <defs>
        {/* Metallic 3D Rim Gradient */}
        <linearGradient id="omni-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFECA9" />
          <stop offset="35%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#4A3a05" />
        </linearGradient>

        {/* Soft Face Radial Glow */}
        <radialGradient id="omni-face" cx="32%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#FFDE82" />
          <stop offset="60%" stopColor="#C69E2A" />
          <stop offset="100%" stopColor="#0F0C02" />
        </radialGradient>

        {/* Metallic 3D Text Inner Gold */}
        <linearGradient id="omni-text-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#FFEAA1" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8A6F1F" />
        </linearGradient>
        
        {/* Soft Drop Shadow for the Emblem */}
        <filter id="omni-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D4AF37" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Hexagonal Outer Rim (Flat-Top Hexagon) */}
      <polygon
        points="25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3"
        fill="url(#omni-rim)"
        stroke="#8a6f1f"
        strokeWidth="0.6"
        strokeLinejoin="round"
        filter="url(#omni-glow)"
      />

      {/* Hexagonal Inner Face */}
      <polygon
        points="28.50,6.06 71.50,6.06 96.50,43.30 71.50,80.54 28.50,80.54 3.50,43.30"
        fill="url(#omni-face)"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />

      {/* Styled O.M.N.I. text centered inside the Hexagon */}
      <text
        x="50"
        y="49.5"
        textAnchor="middle"
        fill="url(#omni-text-grad)"
        fontSize="13"
        fontWeight="900"
        letterSpacing="0.02em"
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          filter: "drop-shadow(0px 1.5px 1.5px rgba(0,0,0,0.85))"
        }}
      >
        O.M.N.I.
      </text>
    </svg>
  );

  if (variant === "emblem") {
    return emblem;
  }

  return (
    <div className={`flex flex-col items-center text-center gap-5 ${className}`}>
      {/* Dynamic Gold-Accented Hexagon Emblem */}
      <div className="p-3 bg-hive-paper/60 border border-hive-border rounded-2xl hive-glass hive-glow mb-1">
        {emblem}
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col gap-2 select-none">
        <h1 className="font-display font-extrabold text-5xl md:text-7xl text-hive-paper-text tracking-widest drop-shadow-md">
          O.M.N.I.
        </h1>
        <p className="font-mono text-hive-gold text-xs md:text-sm uppercase tracking-[0.25em] font-semibold">
          The New Standard For Medical Code
        </p>
      </div>
    </div>
  );
}
