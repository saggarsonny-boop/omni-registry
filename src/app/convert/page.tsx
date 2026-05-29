// -*- coding: utf-8 -*-
"use client";

import React, { useState, useEffect } from "react";
import OMNILogo from "@/components/OMNILogo";
import { convertCode, ConversionResult, DetectedType } from "@/lib/converter";

const TYPE_LABELS: Record<DetectedType, string> = {
  cpt: "CPT (American Medical Association)",
  ichi: "WHO ICHI Stem Code",
  snomed_ct: "SNOMED CT Concept ID",
  icd11: "ICD-11 Classification",
  icd10: "ICD-10-CM / PCS Legacy Code",
  omni_id: "OMNI Registry Code",
  omni_composition: "OMNI Custom Composition",
  unknown: "Unknown Format",
};

export default function Convert() {
  const [inputVal, setInputVal] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);

  // Parse instantly as the user types
  useEffect(() => {
    const res = convertCode(inputVal);
    setResult(res);
  }, [inputVal]);

  const handleSuggestionClick = (suggestion: string) => {
    setInputVal(suggestion);
  };

  const matched = result?.matchedCode;

  return (
    <div className="w-full min-h-screen bg-hive-ink px-4 py-12 md:px-8 md:py-16 fade-in">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-hive-border pb-6">
          <OMNILogo size={52} />
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-3xl text-hive-paper-text tracking-wide leading-tight">
              Universal OMNI Converter
            </h1>
            <p className="text-sm text-hive-muted font-mono tracking-wider mt-0.5">
              Instant, client-side translation between clinical vocabularies
            </p>
          </div>
        </div>

        {/* INPUT PANEL */}
        <div className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-5 hive-glass">
          <div className="flex flex-col gap-2">
            <label htmlFor="converter-input" className="text-[10px] font-mono tracking-widest text-hive-gold uppercase font-bold leading-none">
              Incumbent Code / Stem / Composition Input
            </label>
            <input
              id="converter-input"
              type="text"
              placeholder="e.g. 44970, KBO.JK.AB, 80146002, or [appendix][total excision]..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full bg-[#0a0a0a] border-2 border-hive-border focus:border-hive-gold text-hive-paper-text text-base rounded-xl px-5 py-4 focus:outline-none transition-all font-mono shadow-inner"
              autoFocus
            />
          </div>

          {/* Suggested seeds to test */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-hive-muted font-mono">
            <span>Try testing:</span>
            {result?.suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-[#090909] border border-hive-border hover:border-hive-gold px-2.5 py-1 rounded text-hive-gold hover:text-hive-paper-text transition-colors touch-target"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Real-time Format Detection Badge */}
          {inputVal && result && (
            <div className="flex items-center justify-between border-t border-hive-border/40 pt-4 mt-1">
              <span className="text-xs text-hive-muted font-mono">
                Detected Format:
              </span>
              <span className={`text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full uppercase border ${
                result.detectedType === "unknown" 
                  ? "text-hive-muted border-hive-border/60 bg-hive-paper" 
                  : "text-hive-gold border-hive-gold/40 bg-hive-gold/5"
              }`}>
                {TYPE_LABELS[result.detectedType]}
              </span>
            </div>
          )}
        </div>

        {/* RESULTS PANEL */}
        {inputVal && result && (
          <div className="flex flex-col gap-6">
            
            {/* MATCH FOUND: Show beautiful OMNI structure */}
            {matched ? (
              <div className="bg-hive-paper border border-hive-gold rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass hive-glow fade-in">
                
                {/* ID and Status badge */}
                <div className="flex items-center justify-between border-b border-hive-border/40 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-hive-ink bg-hive-gold px-2.5 py-0.5 rounded uppercase">
                      OMNI Match
                    </span>
                    <span className="font-mono text-sm font-bold text-hive-paper-text">
                      {matched.omni_id}
                    </span>
                  </div>
                  <Link 
                    href={`/code/${matched.omni_id}`}
                    className="text-xs font-mono font-bold text-hive-gold hover:text-hive-paper-text hover:underline uppercase transition-colors touch-target"
                  >
                    View details page →
                  </Link>
                </div>

                {/* Primary Plain Language (English) */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono tracking-widest text-hive-muted uppercase leading-none">
                    Plain Language Description (en)
                  </span>
                  <p className="font-display font-medium text-xl md:text-2xl text-hive-paper-text leading-tight">
                    {matched.plain_language.en}
                  </p>
                </div>

                {/* Axes Stack */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-hive-border/30 py-6 my-2">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono tracking-widest text-hive-muted uppercase mb-1">Target Axis</span>
                    <span className="text-sm font-bold uppercase text-hive-paper-text tracking-wide">{matched.composition.target}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono tracking-widest text-hive-muted uppercase mb-1">Action Axis</span>
                    <span className="text-sm font-bold uppercase text-hive-paper-text tracking-wide">{matched.composition.action}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono tracking-widest text-hive-muted uppercase mb-1">Means Axis</span>
                    <span className="text-sm font-bold uppercase text-hive-paper-text tracking-wide">{matched.composition.means}</span>
                  </div>
                </div>

                {/* Compiled Composition */}
                <div className="bg-[#090909] border border-hive-border rounded-xl p-4 flex items-center justify-between flex-wrap gap-4 text-xs font-mono">
                  <span className="text-hive-muted">OMNI STEM:</span>
                  <span className="text-sm font-bold text-hive-gold select-all">
                    [{matched.composition.target}][{matched.composition.action}][{matched.composition.means}]
                  </span>
                </div>

                {/* Other Crosswalks */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-mono tracking-widest text-hive-muted uppercase leading-none">
                    Incumbent Crosswalk Mappings
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="bg-[#090909] border border-hive-border/50 rounded-lg p-3">
                      <span className="text-hive-muted block mb-1">CPT (AMA):</span>
                      <strong className="text-hive-gold">{matched.crosswalks.cpt || "—"}</strong>
                    </div>
                    <div className="bg-[#090909] border border-hive-border/50 rounded-lg p-3">
                      <span className="text-hive-muted block mb-1">ICHI Stem:</span>
                      <strong className="text-hive-gold">{matched.crosswalks.ichi || "—"}</strong>
                    </div>
                    <div className="bg-[#090909] border border-hive-border/50 rounded-lg p-3">
                      <span className="text-hive-muted block mb-1">SNOMED CT:</span>
                      <strong className="text-hive-gold">{matched.crosswalks.snomed_ct || "—"}</strong>
                    </div>
                    <div className="bg-[#090909] border border-hive-border/50 rounded-lg p-3">
                      <span className="text-hive-muted block mb-1">ICD-11 PCS:</span>
                      <strong className="text-hive-gold">{matched.crosswalks.icd11_pcs || "—"}</strong>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              // NO MATCH FOUND: Show honest diagnostic feedback and manual mapping advice
              <div className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass fade-in">
                <div className="flex items-center gap-3 border-b border-hive-border/40 pb-4">
                  <span className="text-2xl" role="img" aria-label="Warning flag">⚠️</span>
                  <div className="flex flex-col">
                    <h3 className="font-display font-bold text-lg text-hive-paper-text">
                      Code not yet in seed crosswalk
                    </h3>
                    <p className="text-xs text-hive-muted font-mono leading-none mt-0.5">
                      OMNI v0.1 Seed Registry Mapping
                    </p>
                  </div>
                </div>

                {/* Preformatted Diagnostic Message */}
                <div className="bg-[#090909] border border-hive-border rounded-xl p-5 text-sm leading-relaxed text-hive-muted font-mono whitespace-pre-wrap">
                  {result.diagnosticMessage}
                </div>

                {/* Submit Issue CTA */}
                <div className="bg-hive-gold/5 border border-hive-gold/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-hive-muted leading-relaxed text-center sm:text-left">
                    Are you submitting this code as a factual reference for Sonne Saggar MD's SSRN paper? Let us know so we can verifiably include it in the v0.2 registry!
                  </p>
                  <a
                    href="https://github.com/saggarsonny-boop/omni-registry/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-hive-gold hover:bg-[#bfa032] text-hive-ink font-bold text-xs uppercase px-5 py-3 rounded-lg transition-colors shrink-0 text-center touch-target"
                  >
                    File an Issue / Request Code
                  </a>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

// Inline dynamic Link wrapper since we are in client component
function Link({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
