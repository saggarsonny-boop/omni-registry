// -*- coding: utf-8 -*-
"use client";

import React, { useState } from "react";
import OMNILogo from "@/components/OMNILogo";

export default function Paper() {
  const [copiedType, setCopiedType] = useState<"bibtex" | "apa" | null>(null);

  const bibtex = `@article{saggar2026omni,
  title={No One Can Own the Language of Medicine: The O.M.N.I. Standard Proposal},
  author={Saggar, Sonny},
  journal={SSRN Electronic Journal},
  year={2026},
  month={May},
  url={https://omni.universaldocument.org}
}`;

  const apa = `Saggar, S. (2026). No One Can Own the Language of Medicine: The O.M.N.I. Standard Proposal. SSRN Electronic Journal. Retrieved from https://omni.universaldocument.org`;

  const copyToClipboard = (text: string, type: "bibtex" | "apa") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-hive-ink px-4 py-12 md:px-8 md:py-16 fade-in">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-hive-border pb-6">
          <OMNILogo size={52} />
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-3xl text-hive-paper-text tracking-wide leading-tight">
              Research Publication
            </h1>
            <p className="text-sm text-hive-muted font-mono tracking-wider mt-0.5">
              SSRN Paper May 2026 · Peer review preprint publication
            </p>
          </div>
        </div>

        {/* Paper Details Card */}
        <div className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-hive-gold/5 rounded-full filter blur-2xl pointer-events-none" />

          {/* Academic Header */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-hive-gold uppercase font-bold leading-none">
              SSRN PREPRINT ARTICLE
            </span>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-hive-paper-text leading-tight tracking-wide">
              No One Can Own the Language of Medicine
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-hive-muted font-mono mt-1">
              <span>By <strong className="text-hive-paper-text">Sonny Saggar MD</strong></span>
              <span>•</span>
              <span>Published: May 2026</span>
              <span>•</span>
              <span className="text-hive-gold font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-hive-gold inline-block animate-pulse" />
                SSRN Review: Pending Acceptance
              </span>
            </div>
          </div>

          {/* Scientific Abstract */}
          <div className="flex flex-col gap-3 border-t border-b border-hive-border/30 py-6 my-2">
            <h3 className="font-mono text-xs uppercase tracking-widest text-hive-muted font-bold">
              Abstract
            </h3>
            <p className="font-display text-base md:text-lg leading-relaxed text-hive-paper-text/90 text-justify italic pl-4 border-l-2 border-hive-gold">
              Medical coding structures in the United States and globally have been monopolized by copyrighted, proprietary nomenclature frameworks. Current Procedural Terminology (CPT), owned by the American Medical Association, generates substantial licensing revenues, placing financial toll booths on standard clinical dialogue. This paper proposes the Open Medical Nomenclature and Interventions (O.M.N.I.) standard—a royalty-free, public replacement. O.M.N.I. builds directly on the World Health Organization's ICHI axis taxonomy and SNOMED CT compositional grammar. By separating the vocabulary standard from private commercial capture, O.M.N.I. provides a clean, machine-readable, and convertible framework to democratize clinical communication.
            </p>
          </div>

          {/* Actions: Download and View */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <a
              href="https://archive.org/details/omni-ssrn-placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-hive-gold hover:bg-[#bfa032] text-hive-ink font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2 hive-glow touch-target"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF Preprint
            </a>
            <button
              disabled
              className="w-full sm:w-auto bg-transparent border border-hive-border/60 text-hive-muted/50 font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed select-none"
              title="The O.M.N.I. research paper is currently under active peer review on SSRN."
            >
              <svg className="w-5 h-5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              SSRN Index (Pending Review)
            </button>
          </div>
        </div>

        {/* CITATIONS CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* BibTeX */}
          <div className="bg-hive-paper border border-hive-border rounded-2xl p-5 md:p-6 flex flex-col gap-3 hive-glass font-mono">
            <div className="flex items-center justify-between border-b border-hive-border/40 pb-2">
              <span className="text-[10px] tracking-widest text-hive-gold uppercase font-bold">
                BibTeX Citation
              </span>
              <button
                onClick={() => copyToClipboard(bibtex, "bibtex")}
                className="text-[10px] text-hive-muted hover:text-hive-gold uppercase font-bold touch-target"
              >
                {copiedType === "bibtex" ? "Copied! ✓" : "Copy"}
              </button>
            </div>
            <pre className="text-[11px] text-hive-muted bg-[#090909] p-3 rounded-lg overflow-x-auto select-all leading-snug whitespace-pre">
              {bibtex}
            </pre>
          </div>

          {/* APA */}
          <div className="bg-hive-paper border border-hive-border rounded-2xl p-5 md:p-6 flex flex-col gap-3 hive-glass font-mono">
            <div className="flex items-center justify-between border-b border-hive-border/40 pb-2">
              <span className="text-[10px] tracking-widest text-hive-gold uppercase font-bold">
                APA Citation
              </span>
              <button
                onClick={() => copyToClipboard(apa, "apa")}
                className="text-[10px] text-hive-muted hover:text-hive-gold uppercase font-bold touch-target"
              >
                {copiedType === "apa" ? "Copied! ✓" : "Copy"}
              </button>
            </div>
            <p className="text-[11px] text-hive-muted bg-[#090909] p-3 rounded-lg select-all leading-relaxed whitespace-normal h-full">
              {apa}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
