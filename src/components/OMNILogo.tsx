// -*- coding: utf-8 -*-
import React from "react";

interface OMNILogoProps {
  size?: number;
  className?: string;
}

export default function OMNILogo({ size = 48, className = "" }: OMNILogoProps) {
  return (
    <svg
      viewBox="0 0 100 86.6"
      width={size}
      height={Math.round((size * 86.6) / 100)}
      role="img"
      aria-label="OMNI Logo"
      className={`inline-block select-none ${className}`}
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

      {/* Styled O Mark centered in the Hexagon */}
      <circle
        cx="50"
        cy="43.3"
        r="20"
        fill="none"
        stroke="url(#omni-text-grad)"
        strokeWidth="7"
      />
      <circle
        cx="50"
        cy="43.3"
        r="11"
        fill="none"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="1.5"
      />
    </svg>
  );
}
