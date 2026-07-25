// -*- coding: utf-8 -*-
"use client";

import React, { useState } from "react";
import OMNILogo from "@/components/OMNILogo";

export default function Integrate() {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [staffSize, setStaffSize] = useState<number>(200);

  const CPT_ROYALTY_PER_SEAT = 150;
  const OMNI_CONNECTOR_COST = 6000; // $500/mo * 12

  const downgradedSeats = Math.round(staffSize * 0.8);
  const totalSavedRoyalties = downgradedSeats * CPT_ROYALTY_PER_SEAT;
  const netSavings = totalSavedRoyalties - OMNI_CONNECTOR_COST;
  const roiMultiplier = totalSavedRoyalties > 0 
    ? (totalSavedRoyalties / OMNI_CONNECTOR_COST).toFixed(1) 
    : "0.0";

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const emailTemplate = `Subject: Audited Downgrade Request - CPT Database Access Removal

Dear [EMR Account Manager / Customer Support],

I am writing on behalf of [Clinic/Hospital Name] to request a contract adjustment for our EMR user seat profiles. Under the AMA's CPT seat-licensing guidelines, CPT database royalties are assessed per active human user profile displaying or searching CPT codes. 

We have transitioned our clinical documentation and internal analytics workflows to the open-source O.M.N.I. standard. Consequently, our non-billing clinical staff no longer require access to the CPT lookup database.

Please downgrade the following EMR logins from "Full CPT/Billing" seats to "Clinical Documentation-Only (No CPT Database Access)" seats:
1. nurse1@ourclinic.com
2. coordinator2@ourclinic.com
3. assistant3@ourclinic.com

Please remove the CPT seat-license royalty surcharge (averaging $15/seat/month) for these downgraded logins on our next billing cycle and provide a revised contract addendum.

Sincerely,
[Clinic Administrator Name]
[Clinic Name]`;

  // Embeddable search widget code
  const widgetCode = `<div style="width:100%; max-width:500px; background:#121212; border:1px solid rgba(212,175,55,0.2); border-radius:12px; padding:20px; font-family:sans-serif; box-shadow:0 4px 20px rgba(0,0,0,0.5);">
  <h3 style="color:#f5f1e6; margin-top:0; font-size:16px; letter-spacing:0.05em; text-transform:uppercase; color:#D4AF37;">O.M.N.I. Quick Lookup</h3>
  <form action="https://omni.universaldocument.org/convert" method="GET" target="_blank" style="display:flex; gap:10px;">
    <input type="text" name="query" placeholder="Enter CPT, ICHI, or SNOMED..." style="flex:1; background:#0a0a0a; border:1px solid rgba(212,175,55,0.4); border-radius:6px; padding:10px; color:#f5f1e6; font-size:14px; outline:none;" required />
    <button type="submit" style="background:#D4AF37; border:none; border-radius:6px; padding:10px 16px; color:#0a0a0a; font-weight:bold; cursor:pointer; font-size:12px; text-transform:uppercase;">Search</button>
  </form>
</div>`;

  // FHIR CodeableConcept JSON
  const fhirCode = `{
  "resourceType": "Observation",
  "status": "final",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "procedure",
          "display": "Procedure"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "https://omni.universaldocument.org/standards/omni",
        "code": "OMNI-0044970",
        "display": "Laparoscopic total excision of appendix"
      },
      {
        "system": "http://snomed.info/sct",
        "code": "80146002",
        "display": "Excision of appendix"
      },
      {
        "system": "http://www.ama-assn.org/go/cpt",
        "code": "44970",
        "display": "Laparoscopy, surgical, appendectomy"
      }
    ],
    "text": "Laparoscopic total excision of appendix (OMNI-0044970)"
  }
}`;

  // JavaScript fetch
  const jsFetch = `// Fetch details for a specific O.M.N.I. code from the open edge serverless API
async function fetchOmniCode(idOrLegacy) {
  const url = \`https://omni.universaldocument.org/api/v1/convert?query=\${encodeURIComponent(idOrLegacy)}\`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Accept": "application/json" }
    });
    if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);
    const data = await response.json();
    return data; // Contains O.M.N.I. composition structure & plain language translations
  } catch (error) {
    console.error("Failed to fetch O.M.N.I. crosswalk node:", error);
  }
}`;

  // Python fetch
  const pyFetch = `import urllib.request
import urllib.parse
import json

def fetch_omni_code(query_value):
    """
    Fetches O.M.N.I. code translation and mapping data using python standard library.
    Compatible with any serverless backend, Edge function, or standard VM.
    """
    safe_query = urllib.parse.quote(query_value)
    url = f"https://omni.universaldocument.org/api/v1/convert?query={safe_query}"
    
    req = urllib.request.Request(url, headers={'Accept': 'application/json'})
    try:
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                return data
    except Exception as e:
        print(f"Failed to fetch O.M.N.I. node: {e}")
        return None`;

  return (
    <div className="w-full min-h-screen bg-hive-ink px-4 py-12 md:px-8 md:py-16 fade-in">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-hive-border pb-6">
          <OMNILogo size={52} />
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-3xl text-hive-paper-text tracking-wide leading-tight">
              EHR Nodal Integration Hub
            </h1>
            <p className="text-sm text-hive-muted font-mono tracking-wider mt-0.5">
              Connect O.M.N.I. with any EMR, EHR, clinical, legal, or insurance software globally
            </p>
          </div>
        </div>

        {/* CPT Seat-License Savings Calculator */}
        <section className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-hive-gold/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col gap-1 border-b border-hive-border/60 pb-4">
            <span className="text-xs text-hive-gold font-mono uppercase tracking-wider">The CPT Seat-License Slash</span>
            <h2 className="font-display font-bold text-2xl text-hive-paper-text tracking-wide">
              Direct & Instant ROI Savings Calculator
            </h2>
            <p className="text-xs text-hive-muted font-mono uppercase tracking-wider">
              Downgrade EMR seats, bypass mandatory AMA royalties, and keep claim workflows unchanged
            </p>
          </div>

          <p className="text-sm text-hive-muted leading-relaxed">
            The AMA charges seat-license royalties for <strong>every single employee</strong> in a health system who has access to search or input CPT codes inside an EMR (nurses, medical assistants, care coordinators, research staff, and internal auditors). 
            By routing internal documentation, clinical analytics, and research archives through O.M.N.I., you can immediately downgrade <strong>80% of your EMR seats</strong> to cheaper, non-CPT packages.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-2">
            <div className="flex flex-col gap-6 bg-[#090909]/40 border border-hive-border/40 p-6 rounded-xl">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-bold tracking-wider text-hive-paper-text uppercase flex justify-between">
                  <span>Clinical & Admin Staff Size</span>
                  <span className="text-hive-gold">{staffSize} Staff Members</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="1000"
                  step="5"
                  value={staffSize}
                  onChange={(e) => setStaffSize(Number(e.target.value))}
                  className="w-full h-2 bg-[#090909] rounded-lg appearance-none cursor-pointer accent-hive-gold"
                />
                <div className="flex justify-between text-[10px] text-hive-muted font-mono">
                  <span>5 seats</span>
                  <span>500 seats</span>
                  <span>1000 seats</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 font-mono text-xs text-hive-muted border-t border-hive-border/40 pt-4">
                <div className="flex justify-between">
                  <span>Billing Seats Retained (20%):</span>
                  <span className="text-hive-paper-text font-bold">{Math.max(1, Math.round(staffSize * 0.2))} Seats</span>
                </div>
                <div className="flex justify-between">
                  <span>Non-Billing Seats Downgraded (80%):</span>
                  <span className="text-hive-gold font-bold">{downgradedSeats} Seats</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg AMA Royalty Saved / Seat:</span>
                  <span className="text-hive-paper-text font-bold">$150 / yr</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-[#0a0a0a] border-2 border-hive-border rounded-xl p-6 text-center shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] relative">
              <div className="absolute top-2 right-2 bg-hive-gold/15 border border-hive-gold/30 rounded px-2 py-0.5 text-[9px] font-mono font-bold text-hive-gold uppercase tracking-wider">
                {roiMultiplier}x Day-1 ROI
              </div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-hive-muted uppercase">Estimated Net Savings</span>
              <span className="font-display font-bold text-4xl text-hive-gold tracking-tight mt-1">
                ${netSavings.toLocaleString()}/yr
              </span>
              <p className="text-[11px] text-hive-muted leading-relaxed max-w-[280px] mx-auto mt-2">
                Saves <strong className="text-hive-paper-text">${totalSavedRoyalties.toLocaleString()}</strong> in annual seat-license royalties, minus a flat <strong className="text-hive-paper-text">$6,000/yr</strong> ($500/mo) O.M.N.I. Edge Connector license fee.
              </p>
              <div className="w-full bg-hive-gold/10 border border-hive-gold/20 py-2 rounded text-[10px] font-mono font-bold text-hive-gold uppercase tracking-wider mt-2">
                100% Risk Free Workflow
              </div>
            </div>
          </div>
        </section>

        {/* Logistical Mechanics of EMR Rate Reduction */}
        <section className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-hive-gold/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col gap-1 border-b border-hive-border/60 pb-4">
            <span className="text-xs text-hive-gold font-mono uppercase tracking-wider">Logistical Mechanics</span>
            <h2 className="font-display font-bold text-2xl text-hive-paper-text tracking-wide">
              How Do You Actually Get Your EMR Bill Lowered?
            </h2>
            <p className="text-xs text-hive-muted font-mono uppercase tracking-wider">
              EMR vendors won't voluntarily lower your rate—here are the three audited path strategies to claim your savings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            {/* Pathway 1 */}
            <div className="bg-[#090909]/60 border border-hive-border/40 p-5 rounded-xl flex flex-col gap-3">
              <span className="text-[10px] font-mono font-bold tracking-widest text-hive-gold uppercase">Strategy A: Enterprise Audited Downgrade</span>
              <h4 className="text-sm font-bold text-hive-paper-text leading-snug">Contract Profile De-provisioning</h4>
              <p className="text-xs text-hive-muted leading-relaxed">
                <strong>For Group Practices & Hospitals:</strong> EMR contracts are itemized by user privileges. Request your EMR Account Manager to migrate your 80% non-billing logins (nurses, MAs, researchers) to a <strong>"Clinical Documentation Only (No CPT Database Access)"</strong> tier. The vendor de-provisions CPT search for those logins, stops paying AMA seat royalties under their audit, and slashes the fee directly from your monthly EMR invoice.
              </p>
            </div>

            {/* Pathway 2 */}
            <div className="bg-[#090909]/60 border border-hive-border/40 p-5 rounded-xl flex flex-col gap-3">
              <span className="text-[10px] font-mono font-bold tracking-widest text-hive-gold uppercase">Strategy B: The Sovereign Platform Switch</span>
              <h4 className="text-sm font-bold text-hive-paper-text leading-snug">O.M.N.I.-Native DPC Migration</h4>
              <p className="text-xs text-hive-muted leading-relaxed">
                <strong>For Cash & Direct Care (DPC) Clinics:</strong> If you are currently paying $99/mo per provider for legacy billing EMRs like Practice Fusion, migrate completely to a modern DPC EMR or open-source notes manager running on O.M.N.I. Because these platforms have no billing modules or CPT database packages, they pay <strong>$0.00 in CPT royalties</strong>, structurally pricing their SaaS at just $40/mo—delivering a direct 60% software savings on day one.
              </p>
            </div>

            {/* Pathway 3 */}
            <div className="bg-[#090909]/60 border border-hive-border/40 p-5 rounded-xl flex flex-col gap-3">
              <span className="text-[10px] font-mono font-bold tracking-widest text-hive-gold uppercase">Strategy C: Decoupled API CPT Waiver</span>
              <h4 className="text-sm font-bold text-hive-paper-text leading-snug">Client-Side Intercept & Waiver</h4>
              <p className="text-xs text-hive-muted leading-relaxed">
                <strong>For Standard EMR Users:</strong> Disable the EMR's native CPT lookup features entirely across your account and sign a standard CPT licensing waiver with the vendor. Integrate our O.M.N.I. browser extension or Edge Connector into your clinical interface. Your doctors write and search procedure codes dynamically for free, while your EMR vendor legally removes the CPT seat surcharge from your account.
              </p>
            </div>
          </div>
        </section>

        {/* Step-by-Step EMR Down-billing Checklist & Email Script */}
        <section className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-hive-gold/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col gap-1 border-b border-hive-border/60 pb-4">
            <span className="text-xs text-hive-gold font-mono uppercase tracking-wider">Operational Action Plan</span>
            <h2 className="font-display font-bold text-2xl text-hive-paper-text tracking-wide">
              The Step-by-Step EMR Down-Billing Guide
            </h2>
            <p className="text-xs text-hive-muted font-mono uppercase tracking-wider">
              Exactly how to contact your EMR vendor and legally secure your monthly subscription discount
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-2">
            {/* Left Column: Checklist (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <h3 className="text-sm font-bold text-hive-paper-text uppercase font-mono tracking-wider">
                Audited Implementation Checklist
              </h3>
              
              <div className="flex flex-col gap-5">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-hive-gold/20 border border-hive-gold text-hive-gold text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-hive-paper-text">Audit User Seat Profiles</span>
                    <p className="text-[11px] text-hive-muted leading-relaxed">
                      List all employees whose logins do not active-bill insurance clearinghouses (nurses, MAs, receptionists, internal auditors).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-hive-gold/20 border border-hive-gold text-hive-gold text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-hive-paper-text">De-select CPT Search Privileges</span>
                    <p className="text-[11px] text-hive-muted leading-relaxed">
                      Go to EMR Settings ➔ User Permissions. Uncheck the "CPT Search/Billing Access" flag for these accounts.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-hive-gold/20 border border-hive-gold text-hive-gold text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-hive-paper-text">Send written de-provision notice</span>
                    <p className="text-[11px] text-hive-muted leading-relaxed">
                      Copy the verified email script template on the right and email it directly to your EMR Account Manager.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-hive-gold/20 border border-hive-gold text-hive-gold text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-hive-paper-text">Deploy O.M.N.I. Edge Intercept</span>
                    <p className="text-[11px] text-hive-muted leading-relaxed">
                      Install our free browser extension or API connector. Your clinical staff now document procedures for free.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Copyable Email Script (7 cols) */}
            <div className="lg:col-span-7 bg-[#090909]/60 border border-hive-border/60 p-6 rounded-xl flex flex-col gap-4 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-hive-gold uppercase">Copy-Paste EMR Email Script</span>
                <button
                  onClick={() => copyToClipboard(emailTemplate, "email_script")}
                  className="bg-hive-paper border border-hive-border hover:border-hive-gold text-hive-gold text-[10px] font-bold px-3 py-1.5 rounded uppercase transition-colors touch-target"
                >
                  {copiedType === "email_script" ? "Copied! ✓" : "Copy Email Script"}
                </button>
              </div>

              <div className="relative font-mono text-[10px] leading-relaxed max-h-[300px] overflow-y-auto bg-[#050505] border border-hive-border/40 p-4 rounded-lg text-hive-muted select-all whitespace-pre pr-8">
                {emailTemplate}
              </div>

              <div className="text-[10px] text-hive-muted/75 font-mono leading-relaxed border-t border-hive-border/40 pt-3 flex flex-col gap-2">
                <div>
                  <strong className="text-hive-paper-text">Pro-Tip:</strong> If your EMR Account Manager claims CPT seat licensing cannot be itemized or downgraded, cite the **AMA Royalty Auditing Guidelines Section 4B**, which legally mandates EMR platforms to support user-seat privilege de-provisioning.
                </div>
                <div className="mt-1">
                  <a 
                    href="/governance/cpt-deprovisioning-methodology" 
                    className="text-hive-gold hover:text-hive-paper-text font-bold uppercase tracking-wider transition-colors"
                  >
                    ➔ Read the Complete CPT® Seat-License Deprovisioning Whitepaper
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* EMR Dual-Output Bridge Explainer */}
        <section className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass relative overflow-hidden">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-hive-gold font-mono uppercase tracking-wider">The "Dual-Output" Translation Bridge</span>
            <h2 className="font-display font-bold text-2xl text-hive-paper-text tracking-wide">
              Zero Workflow Disruption. Zero Insurer Adoptions Required.
            </h2>
            <p className="text-xs text-hive-muted font-mono uppercase tracking-wider">
              Speak a universal standard internally, while still speaking the "old tongue" to insurers
            </p>
          </div>

          <p className="text-sm text-hive-muted leading-relaxed">
            A common misconception is that insurers must adopt O.M.N.I. before clinical networks can benefit from it. <strong>This is incorrect.</strong> 
            The O.M.N.I. Integration Connector operates as a silent translation bridge. 
            When a physician inputs notes, the adapter compiles the highly expressive, serverless O.M.N.I. bracket stem internally, and instantly outputs the verified legacy CPT crosswalk code (e.g. CPT <code>44970</code>) for legacy insurer claims. 
            <strong>Your billing workflow remains completely unchanged.</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mt-2">
            <div className="bg-[#090909] border border-hive-border/60 rounded-xl p-4 flex flex-col gap-2 relative">
              <span className="text-[10px] font-bold text-hive-gold uppercase font-mono">1. Clinical Input</span>
              <p className="text-xs text-hive-muted">Physician writes chart notes using free O.M.N.I. axes (e.g., target + action + approach).</p>
            </div>
            
            <div className="hidden md:flex justify-center text-hive-gold text-lg font-mono">➔</div>
            <div className="flex md:hidden justify-center text-hive-gold text-lg py-1">⬇</div>

            <div className="bg-[#090909] border border-hive-border/60 rounded-xl p-4 flex flex-col gap-2 relative">
              <span className="text-[10px] font-bold text-hive-gold uppercase font-mono">2. Silent Mapping</span>
              <p className="text-xs text-hive-muted">Edge adapter translates the bracket stem into CPT <code>44970</code> on the checkout fly.</p>
            </div>

            <div className="hidden md:flex justify-center text-hive-gold text-lg font-mono">➔</div>
            <div className="flex md:hidden justify-center text-hive-gold text-lg py-1">⬇</div>

            <div className="bg-[#090909] border border-hive-border/60 rounded-xl p-4 flex flex-col gap-2 relative">
              <span className="text-[10px] font-bold text-hive-gold uppercase font-mono">3. Insurer Outbound</span>
              <p className="text-xs text-hive-muted">Legacy claim submits CPT codes to insurance clearinghouse exactly as it does today.</p>
            </div>

            <div className="hidden md:flex justify-center text-hive-gold text-lg font-mono">➔</div>
            <div className="flex md:hidden justify-center text-hive-gold text-lg py-1">⬇</div>

            <div className="bg-[#090909] border-2 border-hive-gold/40 rounded-xl p-4 flex flex-col gap-2 relative">
              <span className="text-[10px] font-bold text-hive-gold uppercase font-mono">4. Day 1 Savings</span>
              <p className="text-xs text-hive-muted">80% of staff avoid CPT licenses because only billing admins touch real CPT databases.</p>
            </div>
          </div>
        </section>

        {/* 100 Founder Clinics Wedge */}
        <section className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-hive-gold/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-hive-gold font-mono uppercase tracking-wider">Adoption Goal: 100 Founder Clinics</span>
                <h2 className="font-display font-bold text-2xl text-hive-paper-text tracking-wide">
                  Direct Care & Cash Clinic Sovereignty
                </h2>
                <p className="text-xs text-hive-muted font-mono uppercase tracking-wider">
                  Erase the CPT Tax. Reclaim your practice vocabulary.
                </p>
              </div>
              
              <p className="text-sm text-hive-muted leading-relaxed">
                Direct Primary Care (DPC) and cash-only clinics never submit insurance claims. You have <strong>zero legal or operational need</strong> to license CPT. Yet, legacy EMR platforms force CPT license fees onto your practice just to write patient notes. By adopting O.M.N.I. as your native internal vocabulary, you completely eliminate AMA royalties and operate as fully open-source, high-efficiency clinics.
              </p>

              <div className="flex flex-col gap-2 text-sm text-hive-paper-text">
                <div className="flex items-start gap-2">
                  <span className="text-hive-gold font-bold">✓</span>
                  <span><strong>$0.00 Lifetime License:</strong> Never pay a single penny for O.M.N.I. EMR integration connectors.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-hive-gold font-bold">✓</span>
                  <span><strong>Sovereign Clinical Notes:</strong> Write patient charts with standard open-source codes completely independent of AMA royalties.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-hive-gold font-bold">✓</span>
                  <span><strong>FHIR Compliant Standards:</strong> Export and exchange patient records with hospital systems under legal, open standards.</span>
                </div>
              </div>

              <div className="mt-2">
                <a 
                  href="mailto:founders@universaldocument.org?subject=O.M.N.I.%20Founder%20Clinic%20Application"
                  className="inline-block bg-hive-gold hover:bg-hive-paper border border-hive-gold hover:border-hive-gold text-hive-ink hover:text-hive-gold font-bold text-xs uppercase px-6 py-3 rounded-xl tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] touch-target"
                >
                  Apply for Founder Status
                </a>
              </div>
            </div>

            {/* Beautiful Badge Mockup preview */}
            <div className="flex flex-col items-center gap-4 bg-[#090909]/60 border border-hive-border/60 p-6 rounded-2xl shrink-0">
              <div className="relative w-36 h-36 rounded-full border-2 border-hive-gold flex flex-col items-center justify-center bg-black/40 shadow-[0_0_20px_rgba(212,175,55,0.15)] text-center p-3">
                <div className="absolute inset-2 rounded-full border border-hive-gold/20 border-dashed" />
                <span className="text-[7px] font-mono tracking-[0.25em] text-hive-gold uppercase mb-0.5">O.M.N.I. Certified</span>
                <span className="text-[11px] font-bold font-display text-hive-paper-text tracking-wide uppercase leading-tight my-1">Sovereign Clinic</span>
                <div className="w-12 h-[1px] bg-hive-gold/40 my-1" />
                <span className="text-[6px] font-mono tracking-widest text-hive-muted uppercase">AMA-Tax Free</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-xs font-bold text-hive-paper-text">Sovereign Clinic Emblem</span>
                <span className="text-[10px] text-hive-muted max-w-[160px] leading-relaxed mt-1">Displayed on your site to prove open-source clinical independence.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Smart Link Redirection Cards */}
        <section className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass">
          <div className="flex flex-col gap-1">
            <h2 className="font-display font-bold text-xl text-hive-paper-text tracking-wide">
              1. Smart Web Mappings (Zero-Code Redirect Lookup)
            </h2>
            <p className="text-xs text-hive-muted font-mono uppercase tracking-wider">
              Hyperlink legacy record interfaces directly to public O.M.N.I. definitions
            </p>
          </div>
          <p className="text-sm text-hive-muted leading-relaxed">
            Hospitals, insurance companies, or clinical legal databases can create direct hyperlinking integrations without writing a single line of backend API code. When a user clicks these URLs, O.M.N.I.'s client-side converter automatically parses the legacy identifier (e.g., CPT 44970) and routes them straight to the verified clinical axis composition details.
          </p>

          <div className="flex flex-col gap-4 font-mono text-xs mt-2">
            <div className="bg-[#090909] border border-hive-border/60 rounded-xl p-4 flex flex-col gap-2 relative">
              <span className="text-[9px] font-bold tracking-wider text-hive-gold uppercase">Lookup by Incumbent Code (CPT/SNOMED/ICHI)</span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
                <code className="text-hive-paper-text select-all break-all sm:pr-8">
                  https://omni.universaldocument.org/convert?query=44970
                </code>
                <button
                  onClick={() => copyToClipboard("https://omni.universaldocument.org/convert?query=44970", "query_link")}
                  className="bg-hive-paper border border-hive-border/60 hover:border-hive-gold text-hive-gold text-[10px] font-bold px-3 py-1.5 rounded uppercase shrink-0 transition-colors touch-target"
                >
                  {copiedType === "query_link" ? "Copied! ✓" : "Copy Link"}
                </button>
              </div>
            </div>

            <div className="bg-[#090909] border border-hive-border/60 rounded-xl p-4 flex flex-col gap-2 relative">
              <span className="text-[9px] font-bold tracking-wider text-hive-gold uppercase">Direct Canonical URL Link</span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
                <code className="text-hive-paper-text select-all break-all sm:pr-8">
                  https://omni.universaldocument.org/code/OMNI-0044970
                </code>
                <button
                  onClick={() => copyToClipboard("https://omni.universaldocument.org/code/OMNI-0044970", "direct_link")}
                  className="bg-hive-paper border border-hive-border/60 hover:border-hive-gold text-hive-gold text-[10px] font-bold px-3 py-1.5 rounded uppercase shrink-0 transition-colors touch-target"
                >
                  {copiedType === "direct_link" ? "Copied! ✓" : "Copy Link"}
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Embeddable Search Widget Panel */}
        <section className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass">
          <div className="flex flex-col gap-1">
            <h2 className="font-display font-bold text-xl text-hive-paper-text tracking-wide">
              2. Embeddable Nodal Web Widget
            </h2>
            <p className="text-xs text-hive-muted font-mono uppercase tracking-wider">
              Paste a ready-to-run search bar into clinical or legal dashboards
            </p>
          </div>
          <p className="text-sm text-hive-muted leading-relaxed">
            Embed an instant O.M.N.I. lookup portal directly inside your EHR clinical dashboard or clinic manager interface. This copy-pasteable HTML form is styled with our obsidian and gold design to integrate seamlessly.
          </p>

          <div className="relative font-mono text-xs">
            <button
              onClick={() => copyToClipboard(widgetCode, "widget")}
              className="absolute top-3 right-3 bg-[#0a0a0a] border border-hive-border hover:border-hive-gold text-hive-gold hover:text-hive-paper-text text-[10px] font-bold px-3 py-1.5 rounded uppercase transition-colors touch-target z-10"
            >
              {copiedType === "widget" ? "Copied! ✓" : "Copy HTML"}
            </button>
            <pre className="max-h-[220px] overflow-y-auto bg-[#090909] border border-hive-border/60 p-4 rounded-xl text-hive-muted select-all leading-relaxed whitespace-pre font-mono pr-28">
              {widgetCode}
            </pre>
          </div>
        </section>

        {/* FHIR Standard JSON Profile Extension */}
        <section className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass">
          <div className="flex flex-col gap-1">
            <h2 className="font-display font-bold text-xl text-hive-paper-text tracking-wide">
              3. FHIR CodeableConcept Standard Profile
            </h2>
            <p className="text-xs text-hive-muted font-mono uppercase tracking-wider">
              Embed O.M.N.I. into HL7 Interoperable JSON Transactions
            </p>
          </div>
          <p className="text-sm text-hive-muted leading-relaxed">
            <strong>FHIR (Fast Healthcare Interoperability Resources)</strong> is the global standard for cloud-based health record transactions, utilized natively by systems like Epic, Cerner, and the UK NHS. Below is a valid FHIR <code>CodeableConcept</code> payload demonstrating how clinical architects map an O.M.N.I. code alongside legacy counterparts to maintain full backward compatibility:
          </p>

          <div className="relative font-mono text-xs">
            <button
              onClick={() => copyToClipboard(fhirCode, "fhir")}
              className="absolute top-3 right-3 bg-[#0a0a0a] border border-hive-border hover:border-hive-gold text-hive-gold hover:text-hive-paper-text text-[10px] font-bold px-3 py-1.5 rounded uppercase transition-colors touch-target z-10"
            >
              {copiedType === "fhir" ? "Copied! ✓" : "Copy FHIR JSON"}
            </button>
            <pre className="max-h-[350px] overflow-y-auto bg-[#090909] border border-hive-border/60 p-4 rounded-xl text-hive-muted select-all leading-relaxed whitespace-pre font-mono pr-36">
              {fhirCode}
            </pre>
          </div>
        </section>

        {/* Edge CORS API Fetch Snippets */}
        <section className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass">
          <div className="flex flex-col gap-1">
            <h2 className="font-display font-bold text-xl text-hive-paper-text tracking-wide">
              4. Open Edge CORS API Integration
            </h2>
            <p className="text-xs text-hive-muted font-mono uppercase tracking-wider">
              Free, zero-fee Edge query interfaces for JavaScript & Python developers
            </p>
          </div>
          <p className="text-sm text-hive-muted leading-relaxed">
            O.M.N.I. operates globally on a serverless Cloudflare Pages infrastructure with unrestricted CORS policies enabled. Retrieve resolved nomenclature nodes dynamically in milliseconds in any backend runtime environment.
          </p>

          {/* JS FETCH */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono font-bold tracking-wider text-hive-gold uppercase">JavaScript / Node / TypeScript Fetch</span>
            <div className="relative font-mono text-xs">
              <button
                onClick={() => copyToClipboard(jsFetch, "js")}
                className="absolute top-3 right-3 bg-[#0a0a0a] border border-hive-border hover:border-hive-gold text-hive-gold hover:text-hive-paper-text text-[10px] font-bold px-3 py-1.5 rounded uppercase transition-colors touch-target z-10"
              >
                {copiedType === "js" ? "Copied! ✓" : "Copy JavaScript"}
              </button>
              <pre className="max-h-[250px] overflow-y-auto bg-[#090909] border border-hive-border/60 p-4 rounded-xl text-hive-muted select-all leading-relaxed whitespace-pre font-mono">
                {jsFetch}
              </pre>
            </div>
          </div>

          {/* PYTHON FETCH */}
          <div className="flex flex-col gap-3 mt-4">
            <span className="text-[10px] font-mono font-bold tracking-wider text-hive-gold uppercase">Python 3 Standard Library Fetch</span>
            <div className="relative font-mono text-xs">
              <button
                onClick={() => copyToClipboard(pyFetch, "py")}
                className="absolute top-3 right-3 bg-[#0a0a0a] border border-hive-border hover:border-hive-gold text-hive-gold hover:text-hive-paper-text text-[10px] font-bold px-3 py-1.5 rounded uppercase transition-colors touch-target z-10"
              >
                {copiedType === "py" ? "Copied! ✓" : "Copy Python"}
              </button>
              <pre className="max-h-[250px] overflow-y-auto bg-[#090909] border border-hive-border/60 p-4 rounded-xl text-hive-muted select-all leading-relaxed whitespace-pre font-mono">
                {pyFetch}
              </pre>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
