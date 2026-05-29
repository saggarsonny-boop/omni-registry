// -*- coding: utf-8 -*-
"use client";

import React, { useState } from "react";
import OMNILogo from "@/components/OMNILogo";

export default function ApiDocs() {
  const [testId, setTestId] = useState("OMNI-0044970");
  const [testQuery, setTestQuery] = useState("44970");
  const [activeTab, setActiveTab] = useState<"codes" | "convert">("codes");
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);

  const handleTestCodes = async () => {
    setLoading(true);
    setApiResponse(null);
    try {
      const res = await fetch(`/api/v1/codes/${testId}`);
      const data = await res.json();
      setApiResponse(data);
    } catch (err) {
      setApiResponse({ error: "Failed to fetch. Make sure the server is running." });
    }
    setLoading(false);
  };

  const handleTestConvert = async () => {
    setLoading(true);
    setApiResponse(null);
    try {
      const res = await fetch(`/api/v1/convert?query=${encodeURIComponent(testQuery)}`);
      const data = await res.json();
      setApiResponse(data);
    } catch (err) {
      setApiResponse({ error: "Failed to fetch. Make sure the server is running." });
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-hive-ink px-4 py-12 md:px-8 md:py-16 fade-in">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-hive-border pb-6">
          <OMNILogo size={52} />
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-3xl text-hive-paper-text tracking-wide leading-tight">
              O.M.N.I. Open API
            </h1>
            <p className="text-sm text-hive-muted font-mono tracking-wider mt-0.5">
              CORS-enabled clinical nomenclature and vocabulary endpoints
            </p>
          </div>
        </div>

        {/* Introduction Panel */}
        <div className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-4 hive-glass">
          <h2 className="font-display font-semibold text-lg text-hive-paper-text">
            Developer Integration Guide
          </h2>
          <p className="text-sm text-hive-muted leading-relaxed">
            The O.M.N.I. Registry exposes open, zero-authentication endpoints for software systems, EHR providers, and clinical registries. All responses are encoded as UTF-8 JSON and served with standard CORS headers (`Access-Control-Allow-Origin: *`), enabling pure client-side queries or serverless edge lookups.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 font-mono text-[11px] text-hive-gold leading-none">
            <span>✓ Rate Limit: None</span>
            <span>•</span>
            <span>✓ Auth: None Required</span>
            <span>•</span>
            <span>✓ SSL: Required (HTTPS)</span>
          </div>
        </div>

        {/* EMR Seat-License Loophole & Universal Replicability Assurances */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: EMR Loophole Sales Pitch */}
          <div className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-4 hive-glass relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-hive-gold/15 border border-hive-gold/30 rounded px-2 py-0.5 text-[8px] font-mono font-bold text-hive-gold uppercase tracking-wider">
              Legally Compliant Slash
            </div>
            <h3 className="font-display font-bold text-lg text-hive-paper-text tracking-wide">
              The CPT Seat-License Loophole
            </h3>
            
            <blockquote className="border-l-2 border-hive-gold pl-4 text-xs font-medium text-hive-paper-text italic leading-relaxed">
              "Slash your EMR seat-licensing fees by $120,000/year on Day 1 by routing internal charting through O.M.N.I., while our silent translation bridge emits standard CPT codes to insurers with zero disruption to your billing workflow."
            </blockquote>

            <p className="text-xs text-hive-muted leading-relaxed">
              <strong>The Seat-License Rule:</strong> The AMA charges licensing fees for individual human logins that display, search, or edit CPT data. It does <em>not</em> charge per individual claim submitted. 
            </p>
            <p className="text-xs text-hive-muted leading-relaxed">
              By shifting clinical charting natively to O.M.N.I., 80% of hospital logins (nurses, coordinators, researchers) avoid CPT access entirely. Only the final billing department retains licensed CPT seats, legally cutting licensing costs.
            </p>
          </div>

          {/* Card 2: Replicability & Trust Assurances */}
          <div className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-4 hive-glass relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-green-500/10 border border-green-500/30 rounded px-2 py-0.5 text-[8px] font-mono font-bold text-green-400 uppercase tracking-wider">
              Zero Platform Lock-in
            </div>
            <h3 className="font-display font-bold text-lg text-hive-paper-text tracking-wide">
              100% Replicable & Universal
            </h3>

            <p className="text-xs text-hive-paper-text font-bold">
              Yes. The codes are 100% consistent, replicable, and universal.
            </p>

            <p className="text-xs text-hive-muted leading-relaxed">
              Because O.M.N.I. is a post-coordinated compositional grammar rather than a closed static catalog, the code is generated deterministically by combining structured, open axes:
              <span className="block font-mono text-[10px] text-hive-gold bg-black/40 border border-hive-border/40 p-2 rounded text-center mt-2">
                [Anatomical Target] + [Clinical Action] + [Surgical Means]
              </span>
            </p>

            <p className="text-xs text-hive-muted leading-relaxed">
              Whether a hospital uses our integration software, an open-source tool, or a competitor’s system, if they record a laparoscopic appendectomy, they compile the exact same axes: <code>[appendix] + [total excision] + [percutaneous endoscopic]</code>. This compiles to the identical bracket stem and numerical hash <code>OMNI-0044970</code> globally.
            </p>

            <p className="text-xs text-hive-muted leading-relaxed">
              <strong>The Advantage:</strong> Clinics are never "locked in" to your software, which fosters deep industry trust. Your competitive advantage is first-mover speed, elite serverless latency, and superior clinical LLM translation tools.
            </p>
          </div>
        </div>


        {/* API INTERACTIVE CONSOLE */}
        <div className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass">
          <h2 className="font-display font-semibold text-lg text-hive-paper-text">
            Interactive Query Sandbox
          </h2>

          {/* Endpoint Selector Tabs */}
          <div className="flex border-b border-hive-border/40">
            <button
              onClick={() => { setActiveTab("codes"); setApiResponse(null); }}
              className={`flex-1 pb-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors touch-target border-b-2 ${
                activeTab === "codes" 
                  ? "text-hive-gold border-hive-gold" 
                  : "text-hive-muted border-transparent hover:text-hive-paper-text"
              }`}
            >
              GET /api/v1/codes/[id]
            </button>
            <button
              onClick={() => { setActiveTab("convert"); setApiResponse(null); }}
              className={`flex-1 pb-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors touch-target border-b-2 ${
                activeTab === "convert" 
                  ? "text-hive-gold border-hive-gold" 
                  : "text-hive-muted border-transparent hover:text-hive-paper-text"
              }`}
            >
              GET /api/v1/convert?query=[code]
            </button>
          </div>

          {/* Tab 1: Codes Endpoint */}
          {activeTab === "codes" && (
            <div className="flex flex-col gap-4 fade-in">
              <p className="text-xs text-hive-muted leading-relaxed">
                Returns the Target/Action/Means composition axes, plain-language description in all 7 languages, and verified incumbent crosswalk mappings for a specific O.M.N.I. code ID.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#090909] border border-hive-border p-4 rounded-xl">
                <span className="font-mono text-xs font-bold text-hive-gold sm:shrink-0">
                  ID Parameter:
                </span>
                <input
                  type="text"
                  value={testId}
                  onChange={(e) => setTestId(e.target.value)}
                  placeholder="e.g. OMNI-0044970"
                  className="w-full bg-[#0a0a0a] border border-hive-border focus:border-hive-gold rounded px-3 py-2 text-xs font-mono text-hive-paper-text focus:outline-none transition-colors"
                />
                <button
                  onClick={handleTestCodes}
                  disabled={loading}
                  className="w-full sm:w-auto bg-hive-gold hover:bg-[#bfa032] text-hive-ink font-bold text-xs uppercase px-5 py-3 rounded transition-colors touch-target shrink-0 disabled:opacity-50"
                >
                  {loading ? "Fetching..." : "Send Request"}
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Convert Endpoint */}
          {activeTab === "convert" && (
            <div className="flex flex-col gap-4 fade-in">
              <p className="text-xs text-hive-muted leading-relaxed">
                Translates any legacy clinical nomenclature (CPT, ICHI stem, SNOMED concept ID, ICD-10, ICD-11) or raw composition brackets to its parsed O.M.N.I. standard equivalent.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#090909] border border-hive-border p-4 rounded-xl">
                <span className="font-mono text-xs font-bold text-hive-gold sm:shrink-0">
                  Query String:
                </span>
                <input
                  type="text"
                  value={testQuery}
                  onChange={(e) => setTestQuery(e.target.value)}
                  placeholder="e.g. 44970 or KBO.JK.AB"
                  className="w-full bg-[#0a0a0a] border border-hive-border focus:border-hive-gold rounded px-3 py-2 text-xs font-mono text-hive-paper-text focus:outline-none transition-colors"
                />
                <button
                  onClick={handleTestConvert}
                  disabled={loading}
                  className="w-full sm:w-auto bg-hive-gold hover:bg-[#bfa032] text-hive-ink font-bold text-xs uppercase px-5 py-3 rounded transition-colors touch-target shrink-0 disabled:opacity-50"
                >
                  {loading ? "Fetching..." : "Send Request"}
                </button>
              </div>
            </div>
          )}

          {/* RESPONSES AREA */}
          {apiResponse && (
            <div className="flex flex-col gap-2 mt-2 fade-in">
              <span className="text-[10px] font-mono tracking-widest text-hive-muted uppercase font-bold leading-none">
                Server JSON Response
              </span>
              <pre className="bg-[#090909] border border-hive-border rounded-xl p-4 text-xs font-mono leading-relaxed text-hive-gold/90 max-h-96 overflow-y-auto select-all leading-normal">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
