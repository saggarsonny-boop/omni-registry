// -*- coding: utf-8 -*-
"use client";

import React, { useEffect, useState } from "react";
import OMNILogo from "../components/OMNILogo";
import { detectLocale, t, Locale, LOCALE_NAMES, SUPPORTED_LOCALES } from "../lib/locales";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocale(detectLocale());
    setMounted(true);
  }, []);

  const handleLocaleChange = (lang: Locale) => {
    setLocale(lang);
  };

  // Prevent hydration flash by keeping it basic until mounted
  const activeLocale = mounted ? locale : "en";

  return (
    <div className="w-full bg-hive-ink min-h-screen flex flex-col fade-in">
      {/* ABOVE THE FOLD: Hero Section */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center text-center px-6 py-12 border-b border-hive-border overflow-hidden">
        {/* Glowing Background Radial Accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-hive-gold/5 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">
          {/* Glowing Emblem & Lockup */}
          <OMNILogo size={84} variant="full" />

          {/* Literal Standard Expansion in Active Locale */}
          <p className="font-mono text-hive-muted/80 text-[10px] md:text-xs uppercase tracking-wider -mt-4">
            ({t("tagline", activeLocale)})
          </p>

          {/* Core Description Tagline */}
          <p className="max-w-2xl text-base md:text-lg text-hive-muted leading-relaxed font-light">
            {t("hero_sub", activeLocale)}
          </p>

          {/* Action Buttons: Browse, Convert, Paper */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <a
              href="/browse"
              className="w-full sm:w-auto bg-hive-gold hover:bg-[#bfa032] text-hive-ink font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-lg transition-all duration-200 hive-glow hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 touch-target"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {t("btn_browse", activeLocale)}
            </a>
            <a
              href="/convert"
              className="w-full sm:w-auto bg-transparent hover:bg-hive-paper-2 border-2 border-hive-gold hover:border-[#bfa032] text-hive-gold hover:text-[#bfa032] font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 touch-target"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              {t("btn_convert", activeLocale)}
            </a>
            <a
              href="/paper"
              className="w-full sm:w-auto bg-hive-paper-2 hover:bg-hive-paper-light border border-hive-border text-hive-paper-text font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 touch-target"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t("btn_paper", activeLocale)}
            </a>
          </div>
        </div>

        {/* Scroll Indicator Chevron */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <svg className="w-6 h-6 text-hive-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* BELOW THE FOLD: Manifesto Section */}
      <section className="w-full max-w-4xl mx-auto px-6 py-20 md:py-28 flex flex-col gap-12 relative z-10">
        
        {/* Dynamic Language Switcher for Manifesto */}
        <div className="flex flex-col items-center gap-3 bg-[#090909] border border-hive-border rounded-xl p-4 self-center w-full max-w-xl">
          <span className="text-[10px] font-mono tracking-widest text-hive-muted uppercase">
            Manifesto Language Switcher
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {SUPPORTED_LOCALES.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLocaleChange(lang)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all touch-target ${
                  activeLocale === lang
                    ? "bg-hive-gold text-hive-ink font-bold shadow-md"
                    : "bg-hive-paper/80 border border-hive-border hover:border-hive-gold text-hive-muted hover:text-hive-paper-text"
                }`}
              >
                {LOCALE_NAMES[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Manifesto Title */}
        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="font-display font-semibold text-3xl md:text-5xl text-hive-paper-text tracking-wide">
            {t("manifesto_title", activeLocale)}
          </h2>
          <div className="w-24 h-1 bg-hive-gold rounded-full" />
        </div>

        {/* 4-Paragraph Manifesto in Large Serif Typography */}
        <article className="font-display text-lg md:text-xl leading-relaxed text-hive-paper-text/90 flex flex-col gap-8 text-justify">
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-hive-gold first-letter:float-left first-letter:mr-3 first-letter:font-display">
            {t("manifesto_p1", activeLocale)}
          </p>
          <p>{t("manifesto_p2", activeLocale)}</p>
          <p>{t("manifesto_p3", activeLocale)}</p>
          <p>{t("manifesto_p4", activeLocale)}</p>
        </article>

        {/* Sibling Standards Section */}
        <div className="mt-8 bg-hive-paper/40 border border-hive-border rounded-2xl p-8 relative overflow-hidden hive-glass">
          <div className="absolute top-0 right-0 w-24 h-24 bg-hive-gold/5 rounded-full filter blur-xl pointer-events-none" />
          <h3 className="font-display font-bold text-xl md:text-2xl text-hive-paper-text mb-3">
            {t("sibling_title", activeLocale)}
          </h3>
          <p className="text-sm md:text-base text-hive-muted leading-relaxed">
            {t("sibling_desc", activeLocale)}{" "}
            <a
              href="https://universaldocument.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-hive-gold hover:underline font-semibold ml-1.5"
            >
              universaldocument.org →
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
