// -*- coding: utf-8 -*-
"use client";

import React from "react";
import OMNILogo from "./OMNILogo";
import { detectLocale, t, Locale } from "../lib/locales";
import { useEffect, useState } from "react";

/**
 * Native vector SVG of the canonical Hive logo icon.
 */
const HiveIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    viewBox="0 0 100 86.6"
    width={size}
    height={Math.round((size * 86.6) / 100)}
    role="img"
    aria-label="Hive Mark"
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <defs>
      <linearGradient id="header-rim" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE6A1" />
        <stop offset="40%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#5e4a0d" />
      </linearGradient>
      <radialGradient id="header-face" cx="32%" cy="28%" r="85%">
        <stop offset="0%" stopColor="#FFD96E" />
        <stop offset="55%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#a07f15" />
      </radialGradient>
    </defs>
    <polygon
      points="25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3"
      fill="url(#header-rim)"
      stroke="#8a6f1f"
      strokeWidth="0.6"
      strokeLinejoin="round"
    />
    <polygon
      points="28.50,6.06 71.50,6.06 96.50,43.30 71.50,80.54 28.50,80.54 3.50,43.30"
      fill="url(#header-face)"
      stroke="rgba(0,0,0,0.18)"
      strokeWidth="0.4"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HiveHeader() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-hive-ink/95 border-b border-hive-border backdrop-blur-md px-4 py-3 md:px-8 touch-target select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Clickable OMNI Brand Name + Icon */}
        <a href="/" className="flex items-center gap-2 touch-target group">
          <OMNILogo size={32} className="group-hover:scale-105 transition-transform duration-200" />
          <span className="flex flex-col">
            <span className="font-display font-bold text-hive-paper-text text-sm md:text-base tracking-wide leading-tight group-hover:text-hive-gold transition-colors duration-200">
              O.M.N.I. Registry
            </span>
            <span className="text-[10px] text-hive-muted font-mono tracking-wider leading-none">
              v0.2.0 · SPEC
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          <a href="/browse" className="text-sm font-medium text-hive-muted hover:text-hive-gold transition-colors touch-target flex items-center">
            {t("nav_browse", locale)}
          </a>
          <a href="/convert" className="text-sm font-medium text-hive-muted hover:text-hive-gold transition-colors touch-target flex items-center">
            {t("nav_convert", locale)}
          </a>
          <a href="/integrate" className="text-sm font-medium text-hive-muted hover:text-hive-gold transition-colors touch-target flex items-center">
            {locale === "zh" ? "系统集成" : locale === "es" ? "Integrar" : locale === "fr" ? "Intégration" : locale === "ar" ? "دمج" : locale === "hi" ? "एकीकृत" : locale === "pt" ? "Integrar" : "Integrate"}
          </a>
          <a href="/governance" className="text-sm font-medium text-hive-muted hover:text-hive-gold transition-colors touch-target flex items-center">
            {t("nav_governance", locale)}
          </a>
          <a href="/paper" className="text-sm font-medium text-hive-muted hover:text-hive-gold transition-colors touch-target flex items-center">
            {t("nav_paper", locale)}
          </a>
          <a href="/api" className="text-sm font-medium text-hive-muted hover:text-hive-gold transition-colors touch-target flex items-center">
            {t("nav_api", locale)}
          </a>
        </nav>

        {/* HIVE_HEADER_LOGO: Right-aligned Clickable Hive Logo */}
        <div className="flex items-center gap-3">
          <a
            href="https://hive.baby"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-hive-paper/80 border border-hive-border hover:border-hive-gold px-3 py-1.5 rounded-full transition-all duration-200 touch-target"
            aria-label="Visit the Hive ecosystem (opens in a new window)"
          >
            <HiveIcon size={18} />
            <span className="font-mono text-[10px] md:text-xs font-semibold text-hive-muted hover:text-hive-paper-text tracking-widest uppercase transition-colors">
              HIVE
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
