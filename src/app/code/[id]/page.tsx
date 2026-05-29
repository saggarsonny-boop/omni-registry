// -*- coding: utf-8 -*-
import React from "react";
import Link from "next/link";
import OMNILogo from "@/components/OMNILogo";
import { getCodeById, getAllCodeIds, OMNICode } from "@/lib/registry";
import { LOCALE_NAMES } from "@/lib/locales";
import { notFound } from "next/navigation";

interface CodeDetailsProps {
  params: {
    id: string;
  };
}

// Generate static routes at build time for all 50+ JSON seed codes
export async function generateStaticParams() {
  const ids = getAllCodeIds();
  return ids.map((id) => ({
    id,
  }));
}

/**
 * 3D-like Axis Hexagon Card component.
 */
function AxisHexagon({
  axis,
  value,
  colorClass,
}: {
  axis: "Target" | "Action" | "Means";
  value: string;
  colorClass: string;
}) {
  return (
    <div className="bg-[#121212] border border-hive-border hover:border-hive-gold rounded-2xl p-6 flex items-center gap-5 hive-glass hive-hover group">
      {/* Mini Icon Hexagon */}
      <div className={`shrink-0 w-12 h-12 flex items-center justify-center font-mono font-bold text-xs uppercase rounded-xl border border-hive-gold/30 bg-[#090909] text-hive-gold ${colorClass}`}>
        {axis[0]}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-mono tracking-widest text-hive-muted uppercase leading-none mb-1">
          {axis} Axis
        </span>
        <span className="text-base font-semibold text-hive-paper-text group-hover:text-hive-gold transition-colors duration-200 uppercase tracking-wide">
          {value}
        </span>
      </div>
    </div>
  );
}

export default async function CodeDetails({ params }: CodeDetailsProps) {
  const code = getCodeById(params.id);

  if (!code) {
    notFound();
  }

  const comp = code.composition;
  const cross = code.crosswalks;

  return (
    <div className="w-full min-h-screen bg-hive-ink px-4 py-12 md:px-8 md:py-16 fade-in">
      {/* Schema.org MedicalCode JSON-LD Metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalCode",
            "codeValue": code.omni_id,
            "codingSystem": "O.M.N.I. (Open Medical Nomenclature and Interventions)",
            "name": code.plain_language.en,
            "description": code.plain_language.en,
            "inLanguage": "en",
            "sameAs": code.crosswalks.ichi ? `https://ichi.who.int/code/${code.crosswalks.ichi}` : undefined,
          })
        }}
      />

      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Back Link */}
        <Link
          href="/browse"
          className="text-xs font-mono font-bold text-hive-muted hover:text-hive-gold uppercase tracking-wider flex items-center gap-1.5 transition-colors self-start touch-target"
        >
          ← Back to code browser
        </Link>

        {/* HEADER SECTION */}
        <div className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hive-glass relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-hive-gold/5 rounded-full filter blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
            <OMNILogo size={72} />
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-sm font-bold text-hive-gold leading-none">
                {code.omni_id}
              </span>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-hive-paper-text tracking-wide leading-tight">
                {code.plain_language.en}
              </h1>
              <span className="text-[10px] font-mono text-hive-muted uppercase tracking-wider">
                Added: {code.added} · Standard Specification v{code.version}
              </span>
            </div>
          </div>

          {/* Badge */}
          {code.provisional ? (
            <div className="text-[10px] font-mono font-bold tracking-widest text-hive-danger border-2 border-hive-danger/40 px-4 py-1.5 rounded-full uppercase bg-hive-danger/5 select-none shrink-0 animate-pulse">
              ⚠️ Provisional Mapping
            </div>
          ) : (
            <div className="text-[10px] font-mono font-bold tracking-widest text-[#1d9e75] border-2 border-[#1d9e75]/40 px-4 py-1.5 rounded-full uppercase bg-[#1d9e75]/5 select-none shrink-0">
              ✓ Verified Mapping
            </div>
          )}
        </div>

        {/* AXES COMPOSITION SECTION */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[10px] font-mono tracking-widest text-hive-muted uppercase">
            Composition Axis Descriptors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AxisHexagon axis="Target" value={comp.target} colorClass="group-hover:bg-hive-gold/10" />
            <AxisHexagon axis="Action" value={comp.action} colorClass="group-hover:bg-hive-gold/10" />
            <AxisHexagon axis="Means" value={comp.means} colorClass="group-hover:bg-hive-gold/10" />
          </div>
          {/* STEM Grammar Preview */}
          <div className="bg-[#090909] border border-hive-border rounded-xl p-4 flex items-center justify-between flex-wrap gap-4 mt-2">
            <span className="text-xs text-hive-muted font-mono uppercase tracking-wider">
              OMNI Stem Composition:
            </span>
            <span className="font-mono text-base font-bold text-hive-gold tracking-widest bg-hive-paper border border-hive-border/60 px-4 py-2 rounded-lg select-all">
              [{comp.target}][{comp.action}][{comp.means}]
            </span>
          </div>
        </div>

        {/* LOCALIZED TRANSLATIONS SECTION */}
        <div className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass">
          <h2 className="text-[10px] font-mono tracking-widest text-hive-muted uppercase">
            Plain Language Descriptions (7 Locales)
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(code.plain_language).map(([lang, text]) => (
              <div
                key={lang}
                className="bg-[#090909] border border-hive-border/40 rounded-xl p-4 flex flex-col gap-1.5 hover:border-hive-gold/40 transition-colors"
              >
                <span className="text-[10px] font-mono tracking-widest text-hive-gold uppercase leading-none">
                  {LOCALE_NAMES[lang as keyof typeof LOCALE_NAMES] || lang}
                </span>
                <p className="text-sm font-medium text-hive-paper-text/90 leading-snug">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* VERIFIED CROSSWALKS TABLE */}
        <div className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass">
          <h2 className="text-[10px] font-mono tracking-widest text-hive-muted uppercase">
            Incumbent Coding System Crosswalks
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-hive-border/40 text-hive-muted text-[10px] uppercase tracking-wider">
                  <th className="py-3 px-2">Vocabulary Standard</th>
                  <th className="py-3 px-2">Crosswalk Code</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Relationship</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hive-border/20 text-hive-paper-text">
                
                {/* CPT */}
                <tr className="hover:bg-hive-paper-light transition-colors">
                  <td className="py-3.5 px-2 font-bold">CPT (AMA)</td>
                  <td className="py-3.5 px-2 text-hive-gold">{cross.cpt || "—"}</td>
                  <td className="py-3.5 px-2">
                    {cross.cpt ? (
                      <span className="text-[9px] px-2 py-0.5 rounded-full border border-[#1d9e75]/40 text-[#1d9e75] bg-[#1d9e75]/5">Verified</span>
                    ) : "—"}
                  </td>
                  <td className="py-3.5 px-2 text-right text-hive-muted">Factual Equivalent</td>
                </tr>

                {/* WHO ICHI */}
                <tr className="hover:bg-hive-paper-light transition-colors">
                  <td className="py-3.5 px-2 font-bold">WHO ICHI Stem</td>
                  <td className="py-3.5 px-2 text-hive-gold">{cross.ichi || "—"}</td>
                  <td className="py-3.5 px-2">
                    {cross.ichi ? (
                      <span className="text-[9px] px-2 py-0.5 rounded-full border border-[#1d9e75]/40 text-[#1d9e75] bg-[#1d9e75]/5">Verified</span>
                    ) : "—"}
                  </td>
                  <td className="py-3.5 px-2 text-right text-hive-muted">Anatomic Substrate</td>
                </tr>

                {/* SNOMED CT */}
                <tr className="hover:bg-hive-paper-light transition-colors">
                  <td className="py-3.5 px-2 font-bold">SNOMED CT</td>
                  <td className="py-3.5 px-2 text-hive-gold">{cross.snomed_ct || "—"}</td>
                  <td className="py-3.5 px-2">
                    {cross.snomed_ct ? (
                      <span className="text-[9px] px-2 py-0.5 rounded-full border border-[#1d9e75]/40 text-[#1d9e75] bg-[#1d9e75]/5">Verified</span>
                    ) : "—"}
                  </td>
                  <td className="py-3.5 px-2 text-right text-hive-muted">Semantic Equivalent</td>
                </tr>

                {/* ICD-11 */}
                <tr className="hover:bg-hive-paper-light transition-colors">
                  <td className="py-3.5 px-2 font-bold">ICD-11 PCS</td>
                  <td className="py-3.5 px-2 text-hive-gold">{cross.icd11_pcs || "—"}</td>
                  <td className="py-3.5 px-2">
                    {cross.icd11_pcs ? (
                      <span className="text-[9px] px-2 py-0.5 rounded-full border border-[#1d9e75]/40 text-[#1d9e75] bg-[#1d9e75]/5">Verified</span>
                    ) : "—"}
                  </td>
                  <td className="py-3.5 px-2 text-right text-hive-muted">Procedural Group</td>
                </tr>

                {/* ICD-10-CM */}
                <tr className="hover:bg-hive-paper-light transition-colors">
                  <td className="py-3.5 px-2 font-bold">ICD-10-PCS / CM</td>
                  <td className="py-3.5 px-2 text-hive-gold">{cross.icd10_cm || "—"}</td>
                  <td className="py-3.5 px-2">
                    {cross.icd10_cm ? (
                      <span className="text-[9px] px-2 py-0.5 rounded-full border border-[#1d9e75]/40 text-[#1d9e75] bg-[#1d9e75]/5">Verified</span>
                    ) : "—"}
                  </td>
                  <td className="py-3.5 px-2 text-right text-hive-muted">Legacy Equivalent</td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Provisional Disclaimer if needed */}
          {code.provisional && (
            <div className="bg-hive-danger/5 border border-hive-danger/20 rounded-xl p-4 text-xs leading-relaxed text-hive-danger">
              ⚠️ <strong>Provisional Warning:</strong> This mapping is currently flagged as provisional. Individual clinical registries should consult standard composition axes directly to confirm equivalencies before programmatically exchanging billing files.
            </div>
          )}
          {code.notes && (
            <div className="bg-[#090909] border border-hive-border/60 rounded-xl p-4 text-xs leading-relaxed text-hive-muted font-mono">
              <strong className="text-hive-gold">Standard Notes:</strong> {code.notes}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
