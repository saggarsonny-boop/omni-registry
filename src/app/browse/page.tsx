// -*- coding: utf-8 -*-
"use client";

import React, { useState, useMemo, useEffect } from "react";
import OMNILogo from "@/components/OMNILogo";
import { seedCodes } from "@/lib/seed-codes";
import { OMNICode } from "@/lib/registry";
import { detectLocale, t, Locale } from "@/lib/locales";

const ITEMS_PER_PAGE = 12;

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedMeans, setSelectedMeans] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  // Reset pagination on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTarget, selectedAction, selectedMeans]);

  // Extract unique filters from seed dataset dynamically
  const { targets, actions, means } = useMemo(() => {
    const tSet = new Set<string>();
    const aSet = new Set<string>();
    const mSet = new Set<string>();

    for (const code of seedCodes) {
      tSet.add(code.composition.target);
      aSet.add(code.composition.action);
      mSet.add(code.composition.means);
    }

    return {
      targets: Array.from(tSet).sort(),
      actions: Array.from(aSet).sort(),
      means: Array.from(mSet).sort(),
    };
  }, []);

  // Filter & Search Logic
  const filteredCodes = useMemo(() => {
    return seedCodes.filter((code) => {
      const comp = code.composition;
      const desc = code.plain_language.en.toLowerCase();
      const query = searchQuery.toLowerCase();

      // Text Match
      const matchesSearch =
        code.omni_id.toLowerCase().includes(query) ||
        comp.target.toLowerCase().includes(query) ||
        comp.action.toLowerCase().includes(query) ||
        comp.means.toLowerCase().includes(query) ||
        desc.includes(query) ||
        (code.crosswalks.cpt && code.crosswalks.cpt.includes(query)) ||
        (code.crosswalks.snomed_ct && code.crosswalks.snomed_ct.includes(query)) ||
        (code.crosswalks.ichi && code.crosswalks.ichi.toLowerCase().includes(query));

      // Dropdown Select Matches
      const matchesTarget = !selectedTarget || comp.target === selectedTarget;
      const matchesAction = !selectedAction || comp.action === selectedAction;
      const matchesMeans = !selectedMeans || comp.means === selectedMeans;

      return matchesSearch && matchesTarget && matchesAction && matchesMeans;
    });
  }, [searchQuery, selectedTarget, selectedAction, selectedMeans]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredCodes.length / ITEMS_PER_PAGE);
  const paginatedCodes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCodes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCodes, currentPage]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedTarget("");
    setSelectedAction("");
    setSelectedMeans("");
  };

  return (
    <div className="w-full min-h-screen bg-hive-ink px-4 py-12 md:px-8 md:py-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-hive-border pb-6">
          <div className="flex items-center gap-4">
            <OMNILogo size={52} />
            <div className="flex flex-col">
              <h1 className="font-display font-bold text-3xl text-hive-paper-text tracking-wide leading-tight">
                OMNI Code Browser
              </h1>
              <p className="text-sm text-hive-muted font-mono tracking-wider mt-0.5">
                Seed Standard Publication v0.1.0 · {seedCodes.length} codes verified
              </p>
            </div>
          </div>
          {/* Sibling Badge */}
          <div className="self-start md:self-auto text-[10px] font-mono font-bold tracking-widest text-[#0a0a0a] bg-hive-gold px-3.5 py-1 rounded-full uppercase">
            CC BY 4.0 Standard Content
          </div>
        </div>

        {/* SEARCH & FILTERS GRID */}
        <div className="bg-hive-paper border border-hive-border rounded-2xl p-5 md:p-6 flex flex-col gap-4 hive-glass">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-1 flex flex-col gap-1.5">
              <label htmlFor="search-input" className="text-[10px] font-mono tracking-widest text-hive-muted uppercase">
                Search Term / Crosswalk
              </label>
              <div className="relative">
                <input
                  id="search-input"
                  type="text"
                  placeholder="e.g. CPT, SNOMED, appendix..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-hive-border focus:border-hive-gold text-hive-paper-text text-sm rounded-lg px-4 py-3 focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-3 text-hive-muted hover:text-hive-gold text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Target Select */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="target-select" className="text-[10px] font-mono tracking-widest text-hive-muted uppercase">
                Anatomic Axis (Target)
              </label>
              <select
                id="target-select"
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-hive-border focus:border-hive-gold text-hive-paper-text text-sm rounded-lg px-3 py-3 focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="">All Targets ({targets.length})</option>
                {targets.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Select */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="action-select" className="text-[10px] font-mono tracking-widest text-hive-muted uppercase">
                Clinical Axis (Action)
              </label>
              <select
                id="action-select"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-hive-border focus:border-hive-gold text-hive-paper-text text-sm rounded-lg px-3 py-3 focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="">All Actions ({actions.length})</option>
                {actions.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            {/* Means Select */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="means-select" className="text-[10px] font-mono tracking-widest text-hive-muted uppercase">
                Procedural Axis (Means)
              </label>
              <select
                id="means-select"
                value={selectedMeans}
                onChange={(e) => setSelectedMeans(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-hive-border focus:border-hive-gold text-hive-paper-text text-sm rounded-lg px-3 py-3 focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="">All Means ({means.length})</option>
                {means.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Status Panel */}
          {(searchQuery || selectedTarget || selectedAction || selectedMeans) && (
            <div className="flex items-center justify-between border-t border-hive-border/40 pt-4 mt-2">
              <span className="text-xs text-hive-gold font-mono">
                ✦ Filtered down to {filteredCodes.length} matching OMNI stem codes
              </span>
              <button
                onClick={handleClearFilters}
                className="text-xs font-mono font-bold text-hive-muted hover:text-hive-gold uppercase transition-colors flex items-center gap-1.5 touch-target"
              >
                Clear all filters ✕
              </button>
            </div>
          )}
        </div>

        {/* CODE RESULTS GRID */}
        {paginatedCodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCodes.map((code) => {
              const comp = code.composition;
              return (
                <a
                  key={code.omni_id}
                  href={`/code/${code.omni_id}`}
                  className="bg-hive-paper border border-hive-border hover:border-hive-gold rounded-2xl p-6 flex flex-col justify-between gap-6 hive-glass hive-hover group"
                >
                  <div className="flex flex-col gap-4">
                    {/* Top Row: OMNI ID & Provisional indicator */}
                    <div className="flex items-center justify-between border-b border-hive-border/40 pb-3">
                      <span className="font-mono text-xs font-bold text-hive-gold group-hover:text-hive-paper-text transition-colors">
                        {code.omni_id}
                      </span>
                      {code.provisional ? (
                        <span className="text-[9px] font-mono font-bold tracking-widest text-hive-danger border border-hive-danger/40 px-2.5 py-0.5 rounded-full uppercase bg-hive-danger/5">
                          Provisional
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono font-bold tracking-widest text-[#1d9e75] border border-[#1d9e75]/40 px-2.5 py-0.5 rounded-full uppercase bg-[#1d9e75]/5">
                          Verified
                        </span>
                      )}
                    </div>

                    {/* Plain Language English (fallback/default for browsing grid) */}
                    <h3 className="font-display font-medium text-lg leading-tight text-hive-paper-text group-hover:text-hive-gold transition-colors duration-200">
                      {code.plain_language.en}
                    </h3>

                    {/* Axis Composition Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="text-[10px] font-mono bg-[#090909] border border-hive-border hover:border-hive-gold/40 px-2.5 py-1 rounded text-hive-paper-text/80">
                        Alvo: {comp.target}
                      </span>
                      <span className="text-[10px] font-mono bg-[#090909] border border-hive-border hover:border-hive-gold/40 px-2.5 py-1 rounded text-hive-paper-text/80">
                        Ação: {comp.action}
                      </span>
                      <span className="text-[10px] font-mono bg-[#090909] border border-hive-border hover:border-hive-gold/40 px-2.5 py-1 rounded text-hive-paper-text/80">
                        Meio: {comp.means}
                      </span>
                    </div>
                  </div>

                  {/* Crosswalk metadata row */}
                  <div className="bg-[#090909] border border-hive-border/60 rounded-xl px-4 py-3 flex items-center justify-between text-[11px] font-mono leading-none">
                    <span className="text-hive-muted">
                      CPT: <strong className="text-hive-paper-text">{code.crosswalks.cpt || "—"}</strong>
                    </span>
                    <span className="text-hive-muted/40">|</span>
                    <span className="text-hive-muted">
                      ICHI: <strong className="text-hive-paper-text">{code.crosswalks.ichi || "—"}</strong>
                    </span>
                    <span className="text-hive-muted/40">|</span>
                    <span className="text-hive-muted">
                      SNOMED: <strong className="text-hive-paper-text">{code.crosswalks.snomed_ct ? "✓" : "—"}</strong>
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="bg-hive-paper border border-hive-border rounded-2xl p-12 text-center hive-glass flex flex-col items-center gap-4">
            <span className="text-4xl">🔍</span>
            <h3 className="font-display font-bold text-xl text-hive-paper-text">
              No matching OMNI codes found
            </h3>
            <p className="max-w-md text-sm text-hive-muted leading-relaxed">
              We couldn't find any code matching your queries in our v0.1 seed list. Try converting this code in the universal converter page instead!
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-hive-gold hover:bg-[#bfa032] text-hive-ink font-bold text-xs uppercase px-6 py-3 rounded-lg transition-colors mt-2 touch-target"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* PAGINATION PANEL */}
        {totalPages > 1 && (
          <nav className="flex items-center justify-center gap-2 border-t border-hive-border/40 pt-8" aria-label="Code browser pagination">
            {/* Prev Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-hive-border rounded-lg text-xs font-mono font-bold uppercase transition-colors hover:border-hive-gold disabled:opacity-30 disabled:hover:border-hive-border touch-target"
            >
              ← Prev
            </button>

            {/* Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-lg text-xs font-mono font-bold transition-all touch-target ${
                      currentPage === pageNum
                        ? "bg-hive-gold text-hive-ink font-bold"
                        : "bg-transparent border border-hive-border hover:border-hive-gold text-hive-muted hover:text-hive-paper-text"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-hive-border rounded-lg text-xs font-mono font-bold uppercase transition-colors hover:border-hive-gold disabled:opacity-30 disabled:hover:border-hive-border touch-target"
            >
              Next →
            </button>
          </nav>
        )}

      </div>
    </div>
  );
}
