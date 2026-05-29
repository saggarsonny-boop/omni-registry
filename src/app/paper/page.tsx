// -*- coding: utf-8 -*-
"use client";

import React, { useState } from "react";
import OMNILogo from "@/components/OMNILogo";

export default function Paper() {
  const [copiedType, setCopiedType] = useState<"bibtex" | "apa" | null>(null);
  const [showDraft, setShowDraft] = useState(false);

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

  const handlePrint = () => {
    window.print();
  };

  const paperText = (
    <div className="print-container flex flex-col gap-8 bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-10 hive-glass text-hive-paper-text/95 fade-in">
      {/* Top Banner (No-print) */}
      <div className="no-print flex items-center justify-between border-b border-hive-border/40 pb-4 mb-2">
        <span className="text-xs font-mono font-bold text-hive-gold uppercase tracking-wider">
          ✦ O.M.N.I. Academic Draft Reader ✦
        </span>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="bg-hive-gold hover:bg-[#bfa032] text-hive-ink font-bold text-xs uppercase px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 touch-target"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / Save to PDF
          </button>
          <button
            onClick={() => setShowDraft(false)}
            className="bg-hive-paper-2 hover:bg-hive-paper-light border border-hive-border text-hive-paper-text font-bold text-xs uppercase px-4 py-2 rounded-lg transition-colors touch-target"
          >
            Close Reader ✕
          </button>
        </div>
      </div>

      {/* Printed Academic Title Lockup */}
      <div className="text-center flex flex-col gap-4">
        <h1 className="print-title font-display font-extrabold text-3xl md:text-5xl text-hive-paper-text tracking-wide leading-snug">
          No One Can Own the Language of Medicine
        </h1>
        <p className="font-mono text-hive-gold text-sm md:text-base uppercase tracking-[0.25em] font-semibold no-print">
          The O.M.N.I. Standard Proposal
        </p>
        <div className="flex flex-col items-center justify-center font-mono text-xs text-hive-muted gap-1">
          <span className="text-hive-paper-text font-bold text-sm">Sonny Saggar, MD</span>
          <span>May 2026 · SSRN Peer Review Preprint Proposal</span>
          <span>Ecosystem Directory: omni.universaldocument.org</span>
        </div>
      </div>

      {/* Printable Abstract */}
      <div className="print-abstract bg-[#090909] border-l-4 border-hive-gold p-5 rounded-r-xl italic leading-relaxed text-sm md:text-base">
        <h3 className="font-mono text-xs uppercase font-bold tracking-widest text-hive-gold not-italic mb-2 leading-none">
          Abstract
        </h3>
        "Medical coding structures in the United States and globally have been monopolized by copyrighted, proprietary nomenclature frameworks. Current Procedural Terminology (CPT), owned by the American Medical Association, generates substantial licensing revenues, placing financial toll booths on standard clinical dialogue. This paper proposes the Open Medical Nomenclature and Interventions (O.M.N.I.) standard—a royalty-free, public replacement. O.M.N.I. builds directly on the World Health Organization's ICHI axis taxonomy and SNOMED CT compositional grammar. By separating the vocabulary standard from private commercial capture, O.M.N.I. provides a clean, machine-readable, and convertible framework to democratize clinical communication."
      </div>

      {/* Two-column Academic Content */}
      <div className="print-content flex flex-col gap-8 text-sm md:text-base leading-relaxed text-hive-paper-text/90 text-justify font-serif">
        <div className="flex flex-col gap-4">
          <h2 className="font-display font-bold text-lg md:text-xl text-hive-gold tracking-wide border-b border-hive-border/40 pb-2 uppercase">
            1. Introduction
          </h2>
          <p>
            Language is the fundamental substrate of clinical practice. Every diagnosis formulated, every therapeutic action executed, and every diagnostic pathway chosen must be communicated clearly across medical ecosystems. However, the medium through which clinical interventions are encoded is heavily copyrighted and commercially locked. In the United States, Current Procedural Terminology (CPT) acts as the mandatory billing vocabulary, yet it remains private property. This structure imposes significant licensing fees on hospitals, innovators, and medical billing agencies, creating artificial friction in patient care and software interoperability.
          </p>
          <p>
            This paper presents the Open Medical Nomenclature and Interventions (O.M.N.I.) standard. O.M.N.I. is designed as a direct, royalty-free, public-domain clinical vocabulary proposal to replace the proprietary grip of CPT. By ensuring that no private entity can own the vocabulary of clinical medicine, O.M.N.I. guarantees free, open-source interoperability across healthcare software, electronic health records (EHRs), and universal insurance databases.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-display font-bold text-lg md:text-xl text-hive-gold tracking-wide border-b border-hive-border/40 pb-2 uppercase">
            2. The Commercial Capture of Medical Vocabulary
          </h2>
          <p>
            The American Medical Association (AMA) holds the exclusive copyright over CPT. Any software developer building medical billing systems, clinical registries, or insurance verification portals must pay substantial annual royalty fees to include CPT codes. This commercial capture generates hundreds of millions of dollars in annual licensing revenues.
          </p>
          <p>
            The ethical implications of this monopoly are profound. When doctors cannot write down what they did to a patient without a private third party charging a licensing fee, the nomenclature of medicine ceases to be a public infrastructure and becomes a toll road. O.M.N.I. resolves this capture by leveraging the Creative Commons Attribution 4.0 International (CC BY 4.0) license, providing a royalty-free clinical vocabulary open to anyone worldwide.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-display font-bold text-lg md:text-xl text-hive-gold tracking-wide border-b border-hive-border/40 pb-2 uppercase">
            3. The O.M.N.I. Architectural Taxonomy
          </h2>
          <p>
            Technically, O.M.N.I. avoids inventing a redundant structure. Instead, it synthesizes two powerful, open clinical standards: the World Health Organization's International Classification of Health Interventions (ICHI) and SNOMED CT compositional grammar.
          </p>
          <p>
            Every O.M.N.I. code is a clean, multi-axial composite statement constructed upon three distinct axes:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 font-sans text-xs md:text-sm text-hive-muted">
            <li><strong>Target Axis:</strong> Specifies the exact organ, tissue, or anatomical structure operated upon (e.g., [appendix], [gallbladder], [hernia site]).</li>
            <li><strong>Action Axis:</strong> Formulates the specific surgical, therapeutic, or diagnostic action executed (e.g., [total excision], [partial excision], [repair]).</li>
            <li><strong>Means Axis:</strong> Defines the surgical approach, imaging modality, or instrumental guidance utilized (e.g., [percutaneous endoscopic], [open], [ultrasound]).</li>
          </ul>
          <p>
            This multi-axial composition is machine-readable and highly expressive. Instead of static 5-digit CPT integers, O.M.N.I. leverages a dynamic bracket grammar (e.g., <code>[appendix][total excision][percutaneous endoscopic]</code>) that maps perfectly to ICHI stem codes (e.g., <code>KBO.JK.AB</code>) and SNOMED CT Concept IDs (e.g., <code>80146002</code>).
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-display font-bold text-lg md:text-xl text-hive-gold tracking-wide border-b border-hive-border/40 pb-2 uppercase">
            4. Discussion & Global Interoperability
          </h2>
          <p>
            As medical software moves toward AI orchestration, serverless health records, and decentralized ledgers, coding standards must operate as a public utility. O.M.N.I. functions as the vocabulary standard, operating as a sibling standard to the Universal Document envelope standard (universaldocument.org). While Universal Document provides the secure, open envelope for packaging clinical assets, O.M.N.I. provides the universal, freely convertible vocabulary inside.
          </p>
          <p>
            By offering a seed database of 53 verified clinical procedures with automatic backward-compatibility to CPT, O.M.N.I. offers a realistic migration pathway toward royalty-free healthcare administration.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-display font-bold text-lg md:text-xl text-hive-gold tracking-wide border-b border-hive-border/40 pb-2 uppercase">
            5. References & Bibliography
          </h2>
          <ol className="list-decimal pl-5 flex flex-col gap-2 font-mono text-[10px] md:text-xs text-hive-muted">
            <li>World Health Organization. (2025). <em>International Classification of Health Interventions (ICHI) Reference Guide</em>. Geneva: WHO.</li>
            <li>SNOMED International. (2026). <em>SNOMED CT Compositional Grammar and Expression Constraint Language v2.4</em>. London: SNOMED.</li>
            <li>Universal Document Standards. (2026). <em>The Universal Envelope Standard Specification (v0.8)</em>. Retrieved from universaldocument.org.</li>
            <li>Saggar, S. (2026). <em>No One Can Own the Language of Medicine: The O.M.N.I. Standard Proposal</em>. SSRN Electronic Journal.</li>
          </ol>
        </div>
      </div>

      {/* Bottom Close Button (No-print) */}
      <div className="no-print border-t border-hive-border/40 pt-6 flex justify-end gap-3">
        <button
          onClick={handlePrint}
          className="bg-hive-gold hover:bg-[#bfa032] text-hive-ink font-bold text-xs uppercase px-6 py-3 rounded-lg transition-all duration-200 hive-glow touch-target flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print & Save to PDF
        </button>
        <button
          onClick={() => setShowDraft(false)}
          className="bg-hive-paper-2 hover:bg-hive-paper-light border border-hive-border text-hive-paper-text font-bold text-xs uppercase px-6 py-3 rounded-lg transition-colors touch-target"
        >
          Close Reader ✕
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-hive-ink px-4 py-12 md:px-8 md:py-16 fade-in">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="no-print flex items-center gap-4 border-b border-hive-border pb-6">
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

        {showDraft ? (
          /* FULL ACADEMIC PREPRINT READER */
          paperText
        ) : (
          /* STANDARD DETAILS VIEW */
          <>
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

              {/* Actions: View Draft and View SSRN */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                <button
                  onClick={() => setShowDraft(true)}
                  className="w-full sm:w-auto bg-hive-gold hover:bg-[#bfa032] text-hive-ink font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2 hive-glow touch-target"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.168.477-4.5 1.253" />
                  </svg>
                  Read & Print Proposal Draft
                </button>
                <button
                  disabled
                  className="w-full sm:w-auto bg-transparent border border-hive-border/60 text-hive-muted/50 font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed select-none animate-pulse"
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
          </>
        )}

      </div>
    </div>
  );
}
