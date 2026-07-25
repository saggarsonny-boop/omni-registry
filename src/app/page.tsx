// -*- coding: utf-8 -*-
"use client";

import React, { useEffect, useState } from "react";
import OMNILogo from "../components/OMNILogo";
import { detectLocale, t, Locale, LOCALE_NAMES, SUPPORTED_LOCALES } from "../lib/locales";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);
  const [targets, setTargets] = useState(10000);
  const [actions, setActions] = useState(150);
  const [means, setMeans] = useState(50);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

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

      {/* BELOW THE FOLD: Interactive Scale Sliders & Simple English Explanations */}
      <section className="w-full max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-16 relative z-10 border-b border-hive-border">
        {/* Glow Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-hive-gold/5 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-[10px] font-mono tracking-widest text-hive-gold uppercase font-bold">
            CPT vs O.M.N.I. Scale Comparison
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-hive-paper-text tracking-wide">
            The Combinatorial Scale Engine
          </h2>
          <p className="max-w-2xl text-sm md:text-base text-hive-muted font-light mt-1">
            Traditional systems require massive databases to store pre-coordinated procedure combinations. O.M.N.I. replaces them with three post-coordinated grammar axes validated on the fly.
          </p>
        </div>

        {/* Dual Panel Layout: Sliders & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Sliders (7 cols) */}
          <div className="lg:col-span-7 bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-hive-paper-text uppercase tracking-wide">
                Adjust standard axes sets
              </h3>
              <p className="text-xs text-hive-muted">
                See how defining simple standard blocks opens up millions of potential medical interventions.
              </p>
            </div>

            <div className="flex flex-col gap-6 mt-2">
              {/* Slider 1: Targets */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider">
                  <span className="text-hive-muted">Anatomical Target Axis</span>
                  <span className="text-hive-gold">{targets.toLocaleString()} Targets</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="500"
                  value={targets}
                  onChange={(e) => setTargets(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#0a0a0a] rounded-lg appearance-none cursor-pointer accent-hive-gold border border-hive-border/60 focus:outline-none"
                />
                <span className="text-[10px] text-hive-muted/70 font-mono leading-none">
                  (e.g., [appendix], [gallbladder], [left ventricle] — sourced from SNOMED CT)
                </span>
              </div>

              {/* Slider 2: Actions */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider">
                  <span className="text-hive-muted">Clinical Action Axis</span>
                  <span className="text-hive-gold">{actions.toLocaleString()} Actions</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={actions}
                  onChange={(e) => setActions(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#0a0a0a] rounded-lg appearance-none cursor-pointer accent-hive-gold border border-hive-border/60 focus:outline-none"
                />
                <span className="text-[10px] text-hive-muted/70 font-mono leading-none">
                  (e.g., [total excision], [partial excision], [repair], [bypass] — derived from WHO ICHI)
                </span>
              </div>

              {/* Slider 3: Means */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider">
                  <span className="text-hive-muted">Surgical & Diagnostic Means Axis</span>
                  <span className="text-hive-gold">{means.toLocaleString()} Means</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={means}
                  onChange={(e) => setMeans(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#0a0a0a] rounded-lg appearance-none cursor-pointer accent-hive-gold border border-hive-border/60 focus:outline-none"
                />
                <span className="text-[10px] text-hive-muted/70 font-mono leading-none">
                  (e.g., [percutaneous endoscopic], [open], [ultrasound], [computed tomography])
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel: Golden Math & Cost Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-hive-paper to-[#16140f] border-2 border-hive-gold/30 rounded-2xl p-6 md:p-8 flex flex-col justify-between items-center text-center relative overflow-hidden shadow-2xl">
            {/* Ambient gold glow */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-hive-gold/10 rounded-full filter blur-xl pointer-events-none" />
            
            <div className="flex flex-col items-center gap-1.5 w-full border-b border-hive-border/40 pb-4">
              <span className="text-[9px] font-mono font-bold tracking-widest text-hive-gold uppercase">
                COMBINATORIAL CAPACITY
              </span>
              <div className="text-sm font-mono text-hive-muted">
                {targets.toLocaleString()} × {actions.toLocaleString()} × {means.toLocaleString()}
              </div>
            </div>

            <div className="my-6 flex flex-col items-center gap-1 animate-pulse">
              <span className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-hive-gold leading-none tracking-wide drop-shadow-md">
                {(targets * actions * means).toLocaleString()}
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-hive-paper-text/80 font-bold mt-1">
                Potential Procedure Codes
              </span>
            </div>

            <div className="w-full bg-[#0a0a0a]/60 border border-hive-border rounded-xl p-4 flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-[#1d9e75] tracking-widest uppercase flex items-center gap-1.5 leading-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1d9e75] inline-block animate-ping" />
                Edge Hosting Cost
              </span>
              <div className="font-mono text-3xl font-extrabold text-hive-paper-text tracking-wide leading-none">
                $0.00<span className="text-xs font-medium text-hive-muted">/mo</span>
              </div>
              <p className="text-[10px] text-hive-muted/90 font-mono leading-relaxed mt-1 text-center">
                Edge servers parse the bracketed grammar in milliseconds. 100% database-free storage egress!
              </p>
            </div>
          </div>
        </div>

        {/* AUDIENCE PERSONA PATHWAYS */}
        <div className="flex flex-col gap-6 border-t border-b border-hive-border/40 py-12 my-4">
          <div className="flex flex-col items-center text-center gap-1.5 pb-2">
            <span className="text-[10px] font-mono tracking-widest text-hive-gold uppercase font-bold">
              Audience Navigation Guide
            </span>
            <h3 className="font-display font-bold text-xl md:text-2xl text-hive-paper-text">
              Choose Your Pathway
            </h3>
            <p className="max-w-xl text-xs md:text-sm text-hive-muted font-light mt-0.5">
              We have optimized the registry interface to serve your specific professional objectives. Select your persona to skip straight to what applies to you:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            
            {/* Card 1: Developers */}
            <div className="bg-hive-paper border border-hive-border hover:border-hive-gold rounded-2xl p-5 flex flex-col justify-between hive-glass hive-hover group">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-hive-gold/5 border border-hive-gold/30 flex items-center justify-center font-mono font-bold text-xs text-hive-gold group-hover:bg-hive-gold/10 transition-colors">
                  💻
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-hive-paper-text uppercase tracking-wide">
                    EHR Developers
                  </h4>
                  <p className="text-[11px] text-hive-muted leading-relaxed">
                    Ready to implement? Access EMR widgets, FHIR CodeableConcept profiles, and edge CORS API fetch snippets.
                  </p>
                </div>
              </div>
              <a
                href="/integrate"
                className="mt-6 w-full text-center bg-transparent hover:bg-hive-gold/10 border border-hive-gold/40 hover:border-hive-gold text-hive-gold text-[10px] font-mono font-bold uppercase tracking-wider py-3 rounded-lg transition-all touch-target flex items-center justify-center"
              >
                Go to Integration Hub →
              </a>
            </div>

            {/* Card 2: Clinicians */}
            <div className="bg-hive-paper border border-hive-border hover:border-hive-gold rounded-2xl p-5 flex flex-col justify-between hive-glass hive-hover group">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-hive-gold/5 border border-hive-gold/30 flex items-center justify-center font-mono font-bold text-xs text-hive-gold group-hover:bg-hive-gold/10 transition-colors">
                  🩺
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-hive-paper-text uppercase tracking-wide">
                    Doctors & Clinicians
                  </h4>
                  <p className="text-[11px] text-hive-muted leading-relaxed">
                    Coding a procedure? Use our interactive sandbox to assemble custom axes stems and view 7-language translations.
                  </p>
                </div>
              </div>
              <a
                href="/convert"
                className="mt-6 w-full text-center bg-transparent hover:bg-hive-gold/10 border border-hive-gold/40 hover:border-hive-gold text-hive-gold text-[10px] font-mono font-bold uppercase tracking-wider py-3 rounded-lg transition-all touch-target flex items-center justify-center"
              >
                Assemble in Sandbox →
              </a>
            </div>

            {/* Card 3: Governance */}
            <div className="bg-hive-paper border border-hive-border hover:border-hive-gold rounded-2xl p-5 flex flex-col justify-between hive-glass hive-hover group">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-hive-gold/5 border border-hive-gold/30 flex items-center justify-center font-mono font-bold text-xs text-hive-gold group-hover:bg-hive-gold/10 transition-colors">
                  ⚖️
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-hive-paper-text uppercase tracking-wide">
                    Insurers & Lawyers
                  </h4>
                  <p className="text-[11px] text-hive-muted leading-relaxed">
                    Verifying crosswalks? Read Sonny Saggar MD's peer-review SSRN proposal paper and inspect mapping specs.
                  </p>
                </div>
              </div>
              <a
                href="/paper"
                className="mt-6 w-full text-center bg-transparent hover:bg-hive-gold/10 border border-hive-gold/40 hover:border-hive-gold text-hive-gold text-[10px] font-mono font-bold uppercase tracking-wider py-3 rounded-lg transition-all touch-target flex items-center justify-center"
              >
                Read Paper & Mappings →
              </a>
            </div>

            {/* Card 4: Innovators */}
            <div className="bg-hive-paper border border-hive-border hover:border-hive-gold rounded-2xl p-5 flex flex-col justify-between hive-glass hive-hover group">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-hive-gold/5 border border-hive-gold/30 flex items-center justify-center font-mono font-bold text-xs text-hive-gold group-hover:bg-hive-gold/10 transition-colors">
                  💡
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-hive-paper-text uppercase tracking-wide">
                    Health Innovators
                  </h4>
                  <p className="text-[11px] text-hive-muted leading-relaxed">
                    Evaluating licenses? Check the 4-axis comparison matrix and adjust the sliders to audit scale capabilities.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  const targetEl = document.getElementById("comparison-matrix");
                  if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-6 w-full text-center bg-transparent hover:bg-hive-gold/10 border border-hive-gold/40 hover:border-hive-gold text-hive-gold text-[10px] font-mono font-bold uppercase tracking-wider py-3 rounded-lg transition-all touch-target flex items-center justify-center"
              >
                Compare Incumbents ↓
              </button>
            </div>

          </div>
        </div>

        {/* INCUMBENT COMPARISON MATRIX */}
        <div id="comparison-matrix" className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass relative scroll-mt-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-hive-gold/5 rounded-full filter blur-2xl pointer-events-none" />
          
          <div className="flex flex-col gap-1 border-b border-hive-border/40 pb-4">
            <span className="text-[10px] font-mono tracking-widest text-hive-gold uppercase font-bold leading-none">
              Paradigm Shift Analysis
            </span>
            <h3 className="font-display font-bold text-xl text-hive-paper-text tracking-wide">
              CPT vs O.M.N.I.: Architectural Comparison Matrix
            </h3>
            <p className="text-xs text-hive-muted">
              Why O.M.N.I. is architecturally and philosophically superior to the incumbents across four core axes:
            </p>
          </div>

          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="border-b border-hive-border/40 text-hive-muted text-[10px] uppercase font-mono tracking-wider">
                  <th className="py-3 px-3 font-bold">Capability Axis</th>
                  <th className="py-3 px-3 border-l border-hive-border/20">Proprietary Incumbents (CPT / ICD-10)</th>
                  <th className="py-3 px-3 border-l border-hive-border/20 text-hive-gold">The O.M.N.I. Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hive-border/20 text-hive-paper-text leading-relaxed">
                
                {/* Row 1: Financial Cost */}
                <tr className="hover:bg-hive-paper-light/50 transition-colors">
                  <td className="py-4 px-3 font-bold font-mono text-[10px] uppercase text-hive-muted">Financial Cost</td>
                  <td className="py-4 px-3 border-l border-hive-border/20">
                    <strong className="text-hive-danger block mb-0.5">Toll Booths:</strong>
                    Hundreds of millions of dollars in mandatory annual licensing fees to private commercial entities (AMA).
                  </td>
                  <td className="py-4 px-3 border-l border-hive-border/20 bg-hive-gold/5">
                    <strong className="text-[#1d9e75] block mb-0.5">$0.00 / 100% Free:</strong>
                    Released entirely under open-source MIT and Creative Commons CC BY 4.0 licenses. No license checks required.
                  </td>
                </tr>

                {/* Row 2: System Scale */}
                <tr className="hover:bg-hive-paper-light/50 transition-colors">
                  <td className="py-4 px-3 font-bold font-mono text-[10px] uppercase text-hive-muted">System Scale</td>
                  <td className="py-4 px-3 border-l border-hive-border/20">
                    <strong className="text-hive-paper-text font-bold block mb-0.5">Rigid & Pre-coordinated:</strong>
                    Limited to ~10,000 static codes. Adding a new clinical variant requires manual cataloging, design, and registration.
                  </td>
                  <td className="py-4 px-3 border-l border-hive-border/20 bg-hive-gold/5">
                    <strong className="text-hive-gold block mb-0.5">Infinite & Post-coordinated:</strong>
                    Bricks layout combining Anatomical Targets, Actions, and Means to dynamically represent **1.5 Billion+ potential codes**.
                  </td>
                </tr>

                {/* Row 3: Infrastructure Cost */}
                <tr className="hover:bg-hive-paper-light/50 transition-colors">
                  <td className="py-4 px-3 font-bold font-mono text-[10px] uppercase text-hive-muted">Infrastructure Cost</td>
                  <td className="py-4 px-3 border-l border-hive-border/20">
                    <strong className="text-hive-paper-text font-bold block mb-0.5">Heavy Database Burden:</strong>
                    Requires complex, centralized relational SQL databases to catalog, search, and exchange every pre-built procedure.
                  </td>
                  <td className="py-4 px-3 border-l border-hive-border/20 bg-hive-gold/5">
                    <strong className="text-[#1d9e75] block mb-0.5">Zero Centralized Egress:</strong>
                    Static serverless deployment on Cloudflare Edge. Bracketed grammar validated in milliseconds in standard client browsers.
                  </td>
                </tr>

                {/* Row 4: Machine Readability */}
                <tr className="hover:bg-hive-paper-light/50 transition-colors">
                  <td className="py-4 px-3 font-bold font-mono text-[10px] uppercase text-hive-muted">Machine Readability</td>
                  <td className="py-4 px-3 border-l border-hive-border/20">
                    <strong className="text-hive-paper-text font-bold block mb-0.5">Arbitrary Integers:</strong>
                    Legacy 5-digit proprietary code indices convey exactly zero anatomical or clinical structure to AI/ML record models.
                  </td>
                  <td className="py-4 px-3 border-l border-hive-border/20 bg-hive-gold/5">
                    <strong className="text-hive-gold block mb-0.5">Semantic & Expressive:</strong>
                    Compositional grammar mapping cleanly to clinical standard SNOMED CT concept IDs and ICHI axis hierarchies.
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* Beautiful Accordion Panel for Plain English Explanations */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center text-center gap-1 border-b border-hive-border/40 pb-3 mb-2">
            <span className="text-[10px] font-mono tracking-widest text-hive-muted uppercase leading-none">
              Simple English Learning Academy
            </span>
            <h3 className="font-display font-bold text-xl md:text-2xl text-hive-paper-text">
              How O.M.N.I. Works in Plain English
            </h3>
          </div>

          <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
            {/* Accordion 1: Infinite Codes for Free */}
            <div className="bg-hive-paper border border-hive-border rounded-2xl overflow-hidden transition-all duration-300">
              <button
                onClick={() => setActiveAccordion(activeAccordion === "infinite" ? null : "infinite")}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-[#161616] transition-colors focus:outline-none touch-target"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg text-hive-gold" role="img" aria-label="Lego blocks">🧱</span>
                  <span className="font-display font-bold text-base md:text-lg text-hive-paper-text tracking-wide">
                    How O.M.N.I. Accommodates Infinite Codes for $0.00/mo
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-hive-gold transition-transform duration-300 ${activeAccordion === "infinite" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  activeAccordion === "infinite" ? "max-h-[800px] border-t border-hive-border/40 p-5 md:p-8" : "max-h-0"
                }`}
              >
                <div className="flex flex-col gap-6 text-sm md:text-base leading-relaxed text-hive-paper-text/90">
                  <div>
                    <strong className="text-hive-gold uppercase text-xs font-mono tracking-wider block mb-1">
                      The Problem: Pre-coordinated catalogs are like pre-made toys
                    </strong>
                    <p>
                      Traditional systems like **CPT (AMA)** and **ICD-10** are pre-coordinated. They are like a catalogue of pre-made toys. Every time a toy manufacturer wants to release a new variant, they must design it, catalog it, print a box, and store it. This rigid process is why CPT is limited to ~10,000 static codes, requires massive databases to hold every record, and costs hundreds of millions in private licensing fees.
                    </p>
                  </div>

                  <div>
                    <strong className="text-hive-gold uppercase text-xs font-mono tracking-wider block mb-1">
                      The O.M.N.I. Solution: Post-coordinated axes are like Lego blocks
                    </strong>
                    <p>
                      O.M.N.I. is post-coordinated. It is like **Lego blocks**. Instead of storing billions of pre-built toys, we only store the standard bricks. The blocks are built along three independent, logical axes:
                    </p>
                    <ul className="list-disc pl-5 mt-2 flex flex-col gap-1.5 text-hive-muted text-xs md:text-sm">
                      <li><strong>Target Axis:</strong> What anatomical part is operated on? (e.g., <code className="text-hive-gold font-mono">[appendix]</code>)</li>
                      <li><strong>Action Axis:</strong> What clinical action is performed? (e.g., <code className="text-hive-gold font-mono">[total excision]</code>)</li>
                      <li><strong>Means Axis:</strong> What approach or guidance is used? (e.g., <code className="text-hive-gold font-mono">[percutaneous endoscopic]</code>)</li>
                    </ul>
                  </div>

                  <div className="bg-[#090909] border border-hive-border rounded-xl p-4 font-mono text-xs text-hive-muted flex flex-col gap-2">
                    <div>
                      <strong className="text-hive-gold font-semibold uppercase tracking-wider text-[10px] block">
                        Zero Storage Math
                      </strong>
                      If we define 10,000 body targets, 150 actions, and 50 means, these three standard sets of blocks combine to dynamically represent:
                      <div className="text-sm font-bold text-hive-paper-text mt-1 text-center sm:text-left">
                        10,000 Targets × 150 Actions × 50 Means = 75,000,000 (75 Million) Potential Procedures
                      </div>
                    </div>
                  </div>

                  <div>
                    <strong className="text-hive-gold uppercase text-xs font-mono tracking-wider block mb-1">
                      Why is it free?
                    </strong>
                    <p>
                      We do not need a database to store every one of these 75 million combinations! Just like a dictionary defines words but doesn't need to store every possible sentence you could ever speak, O.M.N.I. defines the axes. The edge server parses and validates the bracketed grammar (e.g., <code className="text-hive-gold font-mono">[appendix][total excision][percutaneous endoscopic]</code>) on the fly in milliseconds using standard browser/Edge compute tools. Hosting on Cloudflare Pages and GitHub is static and serverless, resulting in exactly **$0.00/mo** in hosting fees!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accordion 2: Why 300 seed codes */}
            <div className="bg-hive-paper border border-hive-border rounded-2xl overflow-hidden transition-all duration-300">
              <button
                onClick={() => setActiveAccordion(activeAccordion === "seed" ? null : "seed")}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-[#161616] transition-colors focus:outline-none touch-target"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg text-hive-gold" role="img" aria-label="Rosetta stone">📜</span>
                  <span className="font-display font-bold text-base md:text-lg text-hive-paper-text tracking-wide">
                    Why do we need 300 seed codes if O.M.N.I. is infinite?
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-hive-gold transition-transform duration-300 ${activeAccordion === "seed" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  activeAccordion === "seed" ? "max-h-[600px] border-t border-hive-border/40 p-5 md:p-8" : "max-h-0"
                }`}
              >
                <div className="flex flex-col gap-6 text-sm md:text-base leading-relaxed text-hive-paper-text/90">
                  <div>
                    <strong className="text-hive-gold uppercase text-xs font-mono tracking-wider block mb-1">
                      The Analogy: A worked instruction manual
                    </strong>
                    <p>
                      Think of the 300 seed codes as the **Rosetta Stone** or **worked instruction manuals**. They represent the real-world link between the old proprietary databases and the new infinite grammatical language of medicine.
                    </p>
                  </div>

                  <div>
                    <strong className="text-hive-gold uppercase text-xs font-mono tracking-wider block mb-1">
                      The Purpose: Old proprietary tongues
                    </strong>
                    <p>
                      While O.M.N.I.'s rules allow for 75 million combinations, legacy electronic health records (EHRs) and insurers currently speak in old proprietary tongues (like CPT, ICD-10, and SNOMED CT). They need a way to verify how the new grammar maps mathematically back to legacy items.
                    </p>
                  </div>

                  <div>
                    <strong className="text-hive-gold uppercase text-xs font-mono tracking-wider block mb-1">
                      The Rosetta Stone Crosswalk
                    </strong>
                    <p>
                      The 300 seed codes represent the most common clinical procedures performed in hospitals globally. They provide a factual, pre-mapped crosswalk between legacy codes and O.M.N.I. blocks. By examining these 300 worked examples, developers, insurers, and EHR systems (like Epic or Cerner) learn exactly how the old codes translate into the new language, making it easy for their computer systems to dynamically translate and compose the other 75 million codes automatically!
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
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
