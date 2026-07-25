// -*- coding: utf-8 -*-
"use client";

import React, { useState } from "react";

interface CodeExportPanelProps {
  codeData: {
    omni_id: string;
    composition: {
      target: string;
      action: string;
      means: string;
    };
    plain_language: Record<string, string>;
    crosswalks: {
      cpt: string | null;
      ichi: string | null;
      snomed_ct: string | null;
      icd11_pcs: string | null;
      icd10_cm?: string | null;
    };
    version: string;
    added: string;
  };
}

export default function CodeExportPanel({ codeData }: CodeExportPanelProps) {
  const [copied, setCopied] = useState(false);

  // Generate FHIR CodeableConcept & OMNI Specification JSON Schema
  const exportPayload = {
    "$schema": "https://omni.universaldocument.org/schemas/v1/code.json",
    "omni_id": codeData.omni_id,
    "title": codeData.plain_language.en,
    "composition": {
      "target": codeData.composition.target,
      "action": codeData.composition.action,
      "means": codeData.composition.means,
      "stem": `[${codeData.composition.target}][${codeData.composition.action}][${codeData.composition.means}]`
    },
    "crosswalks": {
      "cpt": codeData.crosswalks.cpt,
      "ichi": codeData.crosswalks.ichi,
      "snomed_ct": codeData.crosswalks.snomed_ct,
      "icd11_pcs": codeData.crosswalks.icd11_pcs,
      "icd10_pcs_cm": codeData.crosswalks.icd10_cm || null
    },
    "fhir_concept": {
      "resourceType": "CodeableConcept",
      "coding": [
        {
          "system": "https://omni.universaldocument.org/standards/omni",
          "code": codeData.omni_id,
          "display": codeData.plain_language.en
        },
        ...(codeData.crosswalks.snomed_ct ? [{
          "system": "http://snomed.info/sct",
          "code": codeData.crosswalks.snomed_ct,
          "display": codeData.plain_language.en
        }] : []),
        ...(codeData.crosswalks.cpt ? [{
          "system": "http://www.ama-assn.org/go/cpt",
          "code": codeData.crosswalks.cpt,
          "display": codeData.plain_language.en
        }] : [])
      ]
    },
    "metadata": {
      "version": codeData.version,
      "added": codeData.added,
      "license": "CC-BY-4.0"
    }
  };

  const jsonString = JSON.stringify(exportPayload, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${codeData.omni_id.toLowerCase()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-hive-gold/5 rounded-full filter blur-2xl pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hive-border/40 pb-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-display font-bold text-xl text-hive-paper-text tracking-wide">
            EHR Integration & JSON Export
          </h2>
          <p className="text-xs text-hive-muted font-mono uppercase tracking-wider">
            HL7 / FHIR CodeableConcept & Canonical O.M.N.I. Data Spec
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2 border border-hive-gold/40 hover:border-hive-gold text-hive-gold hover:text-hive-paper-text text-xs font-mono font-bold uppercase rounded-lg transition-colors touch-target flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            {copied ? "Copied! ✓" : "Copy Schema"}
          </button>
          
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-hive-gold hover:bg-[#bfa032] text-hive-ink text-xs font-mono font-bold uppercase rounded-lg transition-colors touch-target flex items-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download JSON
          </button>
        </div>
      </div>

      <div className="relative font-mono text-xs">
        <div className="absolute top-3 right-3 text-[9px] text-hive-muted border border-hive-border/60 bg-[#090909] px-2 py-0.5 rounded uppercase select-none">
          JSON Schema
        </div>
        <pre className="max-h-[350px] overflow-y-auto bg-[#090909] border border-hive-border/60 p-4 rounded-xl text-hive-muted select-all leading-relaxed whitespace-pre font-mono">
          {jsonString}
        </pre>
      </div>

      <div className="bg-[#090909]/60 border border-hive-border/30 rounded-xl p-4 flex flex-col gap-2 text-xs leading-relaxed text-hive-muted">
        <div className="flex items-center gap-1.5 text-hive-gold font-semibold uppercase tracking-wider text-[10px]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Implementation Guidance
        </div>
        <p>
          This JSON layout represents a fully standardized EHR-compliant clinical vocabulary node. The <strong>fhir_concept</strong> payload maps directly to global standard FHIR profiles used natively by Epic, Cerner, and large health systems. The open MIT/CC-BY-4.0 licenses ensure zero fee or commercial encumbrance for database integration.
        </p>
      </div>
    </div>
  );
}
