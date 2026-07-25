// -*- coding: utf-8 -*-
"use client";

import React, { useState, useEffect } from "react";
import OMNILogo from "@/components/OMNILogo";
import { convertCode, ConversionResult, DetectedType } from "@/lib/converter";
import { seedCodes } from "@/lib/seed-codes";

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

const STANDARDIZED_TARGETS = [
  { value: "appendix", label: "Appendix (阑尾 / Apéndice)" },
  { value: "gallbladder", label: "Gallbladder (胆囊 / Vesícula Biliar)" },
  { value: "hernia site", label: "Hernia Site (疝部位 / Sitio de Hernia)" },
  { value: "stomach", label: "Stomach (胃 / Estómago)" },
  { value: "colon", label: "Colon (结肠 / Colon)" },
  { value: "lung", label: "Lung (肺 / Pulmón)" },
  { value: "heart", label: "Heart (心脏 / Corazón)" },
  { value: "kidney", label: "Kidney (肾脏 / Riñón)" },
  { value: "prostate", label: "Prostate (前列腺 / Próstata)" },
  { value: "uterus", label: "Uterus (子宫 / Útero)" },
  { value: "thyroid", label: "Thyroid (甲状腺 / Tiroides)" },
  { value: "brain", label: "Brain (大脑 / Cerebro)" },
  { value: "skin", label: "Skin (皮肤 / Piel)" },
  { value: "breast", label: "Breast (乳房 / Seno)" }
];

const STANDARDIZED_ACTIONS = [
  { value: "total excision", label: "Total Excision (全切除术 / Escisión Total)" },
  { value: "partial excision", label: "Partial Excision (部分切除术 / Escisión Parcial)" },
  { value: "repair", label: "Repair (修复术 / Reparación)" },
  { value: "bypass", label: "Bypass (旁路/分流术 / Derivación)" },
  { value: "destruction", label: "Destruction (毁损术 / Destrucción)" },
  { value: "extraction", label: "Extraction (拔除/提取术 / Extracción)" },
  { value: "insertion", label: "Insertion (置入/植入术 / Inserción)" },
  { value: "inspection", label: "Inspection (检查/镜检 / Inspeção)" },
  { value: "transplantation", label: "Transplantation (移植术 / Trasplante)" }
];

const STANDARDIZED_MEANS = [
  { value: "percutaneous endoscopic", label: "Percutaneous Endoscopic (经皮内镜 / Endoscópico Percutáneo)" },
  { value: "open", label: "Open (开放性 / Abierto)" },
  { value: "percutaneous", label: "Percutaneous (经皮 / Percutáneo)" },
  { value: "external", label: "External (外部 / Externo)" },
  { value: "ultrasound", label: "Ultrasound Guidance (超声引导 / Guía por Ultrasonido)" },
  { value: "computed tomography", label: "CT Guidance (CT引导 / Guía por TC)" },
  { value: "fluoroscopy", label: "Fluoroscopy Guidance (透视引导 / Guía por Fluoroscopia)" },
  { value: "magnetic resonance", label: "MRI Guidance (核磁引导 / Guía por RM)" }
];

export default function Convert() {
  const [activeTab, setActiveTab] = useState<"converter" | "sandbox">("converter");
  const [inputVal, setInputVal] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);

  // Sandbox composition state
  const [sandboxTarget, setSandboxTarget] = useState("appendix");
  const [sandboxAction, setSandboxAction] = useState("total excision");
  const [sandboxMeans, setSandboxMeans] = useState("percutaneous endoscopic");
  const [copiedDynamic, setCopiedDynamic] = useState(false);

  // Automatically load query from URL parameters if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const query = params.get("query");
      if (query) {
        setInputVal(query);
        setActiveTab("converter");
      }
    }
  }, []);

  // Parse instantly as the user types
  useEffect(() => {
    const res = convertCode(inputVal);
    setResult(res);
  }, [inputVal]);

  const handleSuggestionClick = (suggestion: string) => {
    setInputVal(suggestion);
  };

  const matched = result?.matchedCode;

  // Sandbox axis match logic
  const exactMatch = seedCodes.find(
    (code) =>
      code.composition.target.toLowerCase() === sandboxTarget.toLowerCase() &&
      code.composition.action.toLowerCase() === sandboxAction.toLowerCase() &&
      code.composition.means.toLowerCase() === sandboxMeans.toLowerCase()
  );

  const sandboxStem = `[${sandboxTarget}][${sandboxAction}][${sandboxMeans}]`;

  // Dynamic JSON structure generation for sandbox compositions
  const getDynamicJSON = () => {
    const matchedData = exactMatch || {
      omni_id: "OMNI-DYNAMIC",
      composition: {
        target: sandboxTarget,
        action: sandboxAction,
        means: sandboxMeans,
      },
      plain_language: {
        en: `Dynamic composition: ${sandboxAction} of ${sandboxTarget} via ${sandboxMeans}`,
        es: `Composición dinámica: ${sandboxAction} de ${sandboxTarget} vía ${sandboxMeans}`,
        fr: `Composition dynamique: ${sandboxAction} de ${sandboxTarget} via ${sandboxMeans}`,
        zh: `动态组合：通过 ${sandboxMeans} 进行 ${sandboxTarget} 的 ${sandboxAction}`,
        ar: `تركيب ديناميكي: ${sandboxAction} لـ ${sandboxTarget} عبر ${sandboxMeans}`,
        hi: `गतिशील संयोजन: ${sandboxMeans} के माध्यम से ${sandboxTarget} का ${sandboxAction}`,
        pt: `Composição dinâmica: ${sandboxAction} de ${sandboxTarget} via ${sandboxMeans}`
      },
      crosswalks: {
        cpt: null,
        ichi: null,
        snomed_ct: null,
        icd11_pcs: null
      },
      version: "0.2.0-synthesized",
      added: new Date().toISOString().split("T")[0]
    };

    return {
      "$schema": "https://omni.universaldocument.org/schemas/v1/code.json",
      "omni_id": matchedData.omni_id,
      "title": matchedData.plain_language.en,
      "composition": {
        "target": matchedData.composition.target,
        "action": matchedData.composition.action,
        "means": matchedData.composition.means,
        "stem": sandboxStem
      },
      "crosswalks": matchedData.crosswalks,
      "fhir_concept": {
        "resourceType": "CodeableConcept",
        "coding": [
          {
            "system": "https://omni.universaldocument.org/standards/omni",
            "code": matchedData.omni_id,
            "display": matchedData.plain_language.en
          }
        ]
      },
      "metadata": {
        "version": matchedData.version,
        "added": matchedData.added,
        "license": "CC-BY-4.0",
        "synthesis": !exactMatch ? "dynamic_post_coordinated" : "catalog_match"
      }
    };
  };

  const dynamicJSONString = JSON.stringify(getDynamicJSON(), null, 2);

  const handleCopyDynamic = () => {
    navigator.clipboard.writeText(dynamicJSONString);
    setCopiedDynamic(true);
    setTimeout(() => setCopiedDynamic(false), 2000);
  };

  const handleDownloadDynamic = () => {
    const blob = new Blob([dynamicJSONString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `omni_${sandboxTarget}_${sandboxAction}_${sandboxMeans}`.replace(/\s+/g, "_").toLowerCase() + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-screen bg-hive-ink px-4 py-12 md:px-8 md:py-16 fade-in">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-hive-border pb-6">
          <OMNILogo size={52} />
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-3xl text-hive-paper-text tracking-wide leading-tight">
              O.M.N.I. Interactive Workspace
            </h1>
            <p className="text-sm text-hive-muted font-mono tracking-wider mt-0.5">
              Translate legacy vocabularies or mathematically assemble custom medical codes
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-hive-border/60 self-start w-full gap-2">
          <button
            onClick={() => setActiveTab("converter")}
            className={`px-6 py-3 font-display font-semibold text-sm tracking-wide transition-all border-b-2 touch-target ${
              activeTab === "converter"
                ? "border-hive-gold text-hive-gold"
                : "border-transparent text-hive-muted hover:text-hive-paper-text"
            }`}
          >
            Universal Crosswalk Converter
          </button>
          <button
            onClick={() => setActiveTab("sandbox")}
            className={`px-6 py-3 font-display font-semibold text-sm tracking-wide transition-all border-b-2 touch-target ${
              activeTab === "sandbox"
                ? "border-hive-gold text-hive-gold"
                : "border-transparent text-hive-muted hover:text-hive-paper-text"
            }`}
          >
            O.M.N.I. Composition Sandbox
          </button>
        </div>

        {/* TAB 1: CONVERTER PANEL */}
        {activeTab === "converter" && (
          <div className="flex flex-col gap-10">
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
                          OMNI v0.2 Seed Registry Mapping
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
                        Are you submitting this code as a factual reference for Sonny Saggar MD's SSRN paper? Let us know so we can verifiably include it in the v0.2 registry!
                      </p>
                      <a
                        href="https://github.com/saggarsonny-boop/omni-registry/discussions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-hive-gold hover:bg-[#bfa032] text-hive-ink font-bold text-xs uppercase px-5 py-3 rounded-lg transition-colors shrink-0 text-center touch-target flex items-center justify-center font-sans"
                      >
                        File an Issue / Request Code
                      </a>
                    </div>

                  </div>
                )}

              </div>
            )}
          </div>
        )}

        {/* TAB 2: COMPOSITION SANDBOX PANEL */}
        {activeTab === "sandbox" && (
          <div className="flex flex-col gap-8">
            
            {/* INSTRUCTIONS */}
            <div className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 hive-glass text-hive-paper-text flex flex-col gap-3">
              <span className="text-[10px] font-mono tracking-widest text-hive-gold uppercase font-bold leading-none">
                Interactive Axis Builder
              </span>
              <h2 className="font-display font-bold text-xl tracking-wide">
                Build Custom Post-Coordinated Interventions
              </h2>
              <p className="text-sm text-hive-muted leading-relaxed">
                Rather than storing trillions of codes, O.M.N.I. defines three independent axes that combine on the fly. Select the Target, Action, and Means below to synthesize a completely valid O.M.N.I. coding stem.
              </p>
            </div>

            {/* SELECTION GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Target Axis */}
              <div className="bg-hive-paper border border-hive-border rounded-2xl p-5 flex flex-col gap-3 hive-glass justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono tracking-widest text-hive-gold uppercase font-bold">1. Target Axis</span>
                  <span className="text-xs text-hive-muted">What anatomical part is operated on?</span>
                </div>
                <select
                  value={sandboxTarget}
                  onChange={(e) => setSandboxTarget(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-hive-border hover:border-hive-gold text-hive-paper-text text-sm rounded-lg p-3 outline-none transition-colors cursor-pointer font-mono"
                >
                  {STANDARDIZED_TARGETS.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.value.toUpperCase()}
                    </option>
                  ))}
                </select>
                <div className="text-[10px] font-mono text-hive-muted bg-[#0a0a0a] p-2.5 rounded border border-hive-border/40 select-none">
                  Sourced from SNOMED CT body structures
                </div>
              </div>

              {/* Action Axis */}
              <div className="bg-hive-paper border border-hive-border rounded-2xl p-5 flex flex-col gap-3 hive-glass justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono tracking-widest text-hive-gold uppercase font-bold">2. Action Axis</span>
                  <span className="text-xs text-hive-muted">What clinical action is performed?</span>
                </div>
                <select
                  value={sandboxAction}
                  onChange={(e) => setSandboxAction(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-hive-border hover:border-hive-gold text-hive-paper-text text-sm rounded-lg p-3 outline-none transition-colors cursor-pointer font-mono"
                >
                  {STANDARDIZED_ACTIONS.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.value.toUpperCase()}
                    </option>
                  ))}
                </select>
                <div className="text-[10px] font-mono text-hive-muted bg-[#0a0a0a] p-2.5 rounded border border-hive-border/40 select-none">
                  Derived from WHO ICHI actions
                </div>
              </div>

              {/* Means Axis */}
              <div className="bg-hive-paper border border-hive-border rounded-2xl p-5 flex flex-col gap-3 hive-glass justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono tracking-widest text-hive-gold uppercase font-bold">3. Means Axis</span>
                  <span className="text-xs text-hive-muted">What approach or guidance is used?</span>
                </div>
                <select
                  value={sandboxMeans}
                  onChange={(e) => setSandboxMeans(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-hive-border hover:border-hive-gold text-hive-paper-text text-sm rounded-lg p-3 outline-none transition-colors cursor-pointer font-mono"
                >
                  {STANDARDIZED_MEANS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.value.toUpperCase()}
                    </option>
                  ))}
                </select>
                <div className="text-[10px] font-mono text-hive-muted bg-[#0a0a0a] p-2.5 rounded border border-hive-border/40 select-none">
                  Derived from WHO ICHI means
                </div>
              </div>

            </div>

            {/* LIVE DYNAMIC COMPOSITION CARD */}
            <div className="bg-hive-paper border border-hive-gold rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass hive-glow relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-hive-gold/5 rounded-full filter blur-2xl pointer-events-none" />

              {/* Status Header */}
              <div className="flex items-center justify-between border-b border-hive-border/40 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className={`text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded uppercase ${
                    exactMatch ? "text-hive-ink bg-hive-gold" : "text-[#1d9e75] border border-[#1d9e75]/40 bg-[#1d9e75]/5"
                  }`}>
                    {exactMatch ? "Catalog Match Found" : "Mathematically Synthesized"}
                  </span>
                  <span className="font-mono text-xs text-hive-paper-text">
                    {exactMatch ? exactMatch.omni_id : "OMNI-DYNAMIC"}
                  </span>
                </div>
                
                {exactMatch && (
                  <Link 
                    href={`/code/${exactMatch.omni_id}`}
                    className="text-xs font-mono font-bold text-hive-gold hover:text-hive-paper-text hover:underline uppercase transition-colors touch-target"
                  >
                    View details page →
                  </Link>
                )}
              </div>

              {/* Assembled Stem */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono tracking-widest text-hive-muted uppercase leading-none">
                  Assembled O.M.N.I. Code Stem
                </span>
                <div className="font-mono text-xl sm:text-2xl font-extrabold text-hive-gold tracking-widest bg-[#090909] border border-hive-border/60 p-4 rounded-xl select-all break-all text-center">
                  {sandboxStem}
                </div>
              </div>

              {/* Dynamic Translations / Description */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono tracking-widest text-hive-muted uppercase leading-none">
                  Plain-English Dynamic Synthesis Translation
                </span>
                <p className="font-display font-medium text-lg md:text-xl text-hive-paper-text/90 leading-tight">
                  {exactMatch ? exactMatch.plain_language.en : `Dynamic clinical composition: ${sandboxAction} of ${sandboxTarget} via ${sandboxMeans}.`}
                </p>
              </div>

              {/* Crosswalk metadata */}
              {exactMatch ? (
                <div className="flex flex-col gap-2 border-t border-hive-border/30 pt-4 mt-1">
                  <span className="text-[10px] font-mono tracking-widest text-hive-muted uppercase leading-none">
                    Verified Legacy Crosswalks
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono mt-1">
                    <div className="bg-[#090909] border border-hive-border/50 rounded-lg p-2.5">
                      <span className="text-[9px] text-hive-muted block mb-0.5">CPT:</span>
                      <strong className="text-hive-gold">{exactMatch.crosswalks.cpt || "—"}</strong>
                    </div>
                    <div className="bg-[#090909] border border-hive-border/50 rounded-lg p-2.5">
                      <span className="text-[9px] text-hive-muted block mb-0.5">ICHI:</span>
                      <strong className="text-hive-gold">{exactMatch.crosswalks.ichi || "—"}</strong>
                    </div>
                    <div className="bg-[#090909] border border-hive-border/50 rounded-lg p-2.5">
                      <span className="text-[9px] text-hive-muted block mb-0.5">SNOMED:</span>
                      <strong className="text-hive-gold">{exactMatch.crosswalks.snomed_ct || "—"}</strong>
                    </div>
                    <div className="bg-[#090909] border border-hive-border/50 rounded-lg p-2.5">
                      <span className="text-[9px] text-hive-muted block mb-0.5">ICD-11:</span>
                      <strong className="text-hive-gold">{exactMatch.crosswalks.icd11_pcs || "—"}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#090909]/60 border border-hive-border rounded-xl p-4 text-xs text-hive-muted leading-relaxed mt-1 flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  <p>
                    <strong>Post-Coordinated Proof:</strong> This code is fully legal under the O.M.N.I. schema specification. Insurers, EHR systems (like Epic or Cerner), and edge networks translate and compile it automatically on the fly using standard browser tools with exactly <strong>$0.00</strong> central storage and licensing cost!
                  </p>
                </div>
              )}

              {/* JSON Export and Schema Downloads */}
              <div className="border-t border-hive-border/30 pt-6 mt-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-hive-muted uppercase font-bold">
                    HL7 FHIR & O.M.N.I. JSON Node
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyDynamic}
                      className="px-3.5 py-1.5 border border-hive-gold/40 hover:border-hive-gold text-hive-gold hover:text-hive-paper-text text-[10px] font-mono font-bold uppercase rounded-lg transition-colors touch-target"
                    >
                      {copiedDynamic ? "Copied! ✓" : "Copy Schema"}
                    </button>
                    <button
                      onClick={handleDownloadDynamic}
                      className="px-3.5 py-1.5 bg-hive-gold hover:bg-[#bfa032] text-hive-ink text-[10px] font-mono font-bold uppercase rounded-lg transition-colors touch-target flex items-center gap-1 shadow"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download JSON
                    </button>
                  </div>
                </div>
                
                <pre className="max-h-[220px] overflow-y-auto bg-[#090909] border border-hive-border/60 p-4 rounded-xl text-hive-muted text-[10px] leading-relaxed whitespace-pre font-mono select-all">
                  {dynamicJSONString}
                </pre>
              </div>

            </div>

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
