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
