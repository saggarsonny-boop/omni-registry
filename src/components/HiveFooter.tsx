// -*- coding: utf-8 -*-
"use client";

import React, { useEffect, useState } from "react";
import { detectLocale, t, Locale } from "../lib/locales";

const HiveMark = ({ size = 20 }: { size?: number }) => (
  <svg
    viewBox="0 0 100 86.6"
    width={size}
    height={Math.round((size * 86.6) / 100)}
    role="img"
    aria-label="Hive Mark"
    style={{ display: "inline-block", verticalAlign: "middle", flex: "0 0 auto" }}
  >
    <defs>
      <linearGradient id="footer-rim" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE6A1" />
        <stop offset="40%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#5e4a0d" />
      </linearGradient>
      <radialGradient id="footer-face" cx="32%" cy="28%" r="85%">
        <stop offset="0%" stopColor="#FFD96E" />
        <stop offset="55%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#a07f15" />
      </radialGradient>
    </defs>
    <polygon
      points="25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3"
      fill="url(#footer-rim)"
      stroke="#8a6f1f"
      strokeWidth="0.6"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
    <polygon
      points="28.50,6.06 71.50,6.06 96.50,43.30 71.50,80.54 28.50,80.54 3.50,43.30"
      fill="url(#footer-face)"
      stroke="rgba(0,0,0,0.18)"
      strokeWidth="0.4"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default function HiveFooter() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  return (
    <footer className="w-full bg-[#050505] border-t border-hive-border text-hive-muted text-xs select-none">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 flex flex-col items-center gap-8 text-center">
        {/* Disclosure Area - Honest Rules */}
        <div className="max-w-3xl text-[11px] leading-relaxed text-hive-muted/70 bg-[#090909] border border-hive-border rounded-lg p-5">
          <p className="mb-2.5 font-semibold text-hive-muted tracking-wider uppercase text-[9px]">
            Ecosystem Disclosure
          </p>
          <p>
            OMNI is an independent open standard. The author of the OMNI proposal is also affiliated with the Universal Document open standard hosted on the parent domain; both standards are published under open licenses (CC BY 4.0). Neither standard charges any licensing fee for use of its specification.
          </p>
          <div className="mt-4 border-t border-hive-border/30 pt-3 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[10px]">
            <span>Code License: <a href="/LICENSE" className="text-hive-gold hover:underline">MIT</a></span>
            <span className="text-hive-border">•</span>
            <span>Standard License: <a href="/LICENSE-STANDARD" className="text-hive-gold hover:underline">CC BY 4.0</a></span>
            <span className="text-hive-border">•</span>
            <span>AI Usage: <span className="text-hive-paper-text font-mono">100% Audit Verified</span></span>
          </div>
        </div>

        {/* Canonical Hive Link Set */}
        <nav className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5 text-[11px]" aria-label="Ecosystem Directory">
          <a href="https://hive.baby" target="_blank" rel="noopener noreferrer" className="hover:text-hive-gold hover:underline">
            hive.baby
          </a>
          <span className="text-hive-gold-dim">•</span>
          <a href="https://hive.baby/about" target="_blank" rel="noopener noreferrer" className="hover:text-hive-gold hover:underline">
            social experiment
          </a>
          <span className="text-hive-gold-dim">•</span>
          <a href="https://hive.baby/contribute" target="_blank" rel="noopener noreferrer" className="hover:text-hive-gold hover:underline">
            contribute
          </a>
          <span className="text-hive-gold-dim">•</span>
          <a href="https://hive.baby/patrons" target="_blank" rel="noopener noreferrer" className="hover:text-hive-gold hover:underline">
            patronage
          </a>
          <span className="text-hive-gold-dim">•</span>
          <a href="https://hive.baby/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-hive-gold hover:underline">
            privacy
          </a>
        </nav>

        {/* HIVE_FOOTER_SIGNATURE: simplified Hive mark + text Made with ♥ in the Hive */}
        <div className="flex flex-row items-center justify-center gap-2 mt-4" aria-label="Ecosystem signature">
          <HiveMark size={20} />
          <span className="text-xs tracking-wide">
            {t("footer_made_with", locale)}
            <span className="text-hive-gold mx-1 text-sm inline-block animate-pulse" aria-hidden="true">♥</span>
            {t("footer_in_the", locale)}
            <a
              href="https://hive.baby"
              target="_blank"
              rel="noopener noreferrer"
              className="text-hive-paper-text hover:text-hive-gold font-semibold ml-1 transition-colors"
            >
              Hive
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
