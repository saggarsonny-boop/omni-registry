// -*- coding: utf-8 -*-
import React from "react";
import OMNILogo from "@/components/OMNILogo";

export default function Governance() {
  return (
    <div className="w-full min-h-screen bg-hive-ink px-4 py-12 md:px-8 md:py-16 fade-in">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-hive-border pb-6">
          <OMNILogo size={52} />
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-3xl text-hive-paper-text tracking-wide leading-tight">
              Project Governance
            </h1>
            <p className="text-sm text-hive-muted font-mono tracking-wider mt-0.5">
              Open-source management roadmap and licensing standards
            </p>
          </div>
        </div>

        {/* Core Statement Box */}
        <div className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-hive-gold/5 rounded-full filter blur-2xl pointer-events-none" />
          
          <h2 className="font-display font-semibold text-xl md:text-2xl text-hive-paper-text">
            OMNI Open Proposal Phase
          </h2>
          
          <p className="text-base text-hive-muted leading-relaxed">
            The OMNI (Open Medical Nomenclature and Interventions) project is currently in its initial proposal stage. As we work to formalize the standard alongside Sonny Saggar MD's SSRN paper, the underlying nomenclature axes (Target, Action, Means) are offered freely for public and clinical use under the Creative Commons Attribution 4.0 International (CC BY 4.0) license. We welcome clinical reviews, system integrations, and codebase forks. In order to safeguard the vocabulary from future private capture, an independent foundation handoff is anticipated as the registry scales to its v1.0 production release.
          </p>

          <div className="border-t border-hive-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono tracking-widest text-hive-muted uppercase">
                Active Discussions Board
              </span>
              <span className="text-xs text-hive-gold font-semibold">
                Join the open nomenclature working group
              </span>
            </div>
            <a
              href="https://github.com/saggarsonny-boop/omni-registry/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-hive-gold hover:bg-[#bfa032] text-hive-ink font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition-colors flex items-center gap-2 touch-target"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              GitHub Discussions
            </a>
          </div>
        </div>

        {/* Sibling Links card */}
        <div className="bg-hive-paper/30 border border-hive-border rounded-xl p-6 text-xs text-hive-muted leading-relaxed">
          <strong className="text-hive-paper-text font-semibold">CC BY 4.0 Attribution Note:</strong> You may reuse and adapt this medical standard in your own clinical databases and software without licensing fees. You must credit Sonny Saggar MD and reference the parent standard universaldocument.org in any public implementations.
        </div>

      </div>
    </div>
  );
}
