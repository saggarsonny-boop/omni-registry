// -*- coding: utf-8 -*-
"use client";

import React from "react";
import OMNILogo from "@/components/OMNILogo";

export default function CptDeprovisioningMethodology() {
  return (
    <div className="w-full min-h-screen bg-hive-ink px-4 py-12 md:px-8 md:py-16 fade-in">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-hive-border pb-6">
          <OMNILogo size={52} />
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-3xl text-hive-paper-text tracking-wide leading-tight">
              CPT® Seat-License Deprovisioning Methodology
            </h1>
            <p className="text-sm text-hive-muted font-mono tracking-wider mt-0.5">
              Democratizing the Enterprise Chargemaster for Small & Sovereign Clinics
            </p>
          </div>
        </div>

        {/* Paper Metadata Badge */}
        <div className="flex flex-wrap gap-4 items-center bg-[#090909]/60 border border-hive-border/60 p-4 rounded-xl text-xs font-mono text-hive-muted">
          <span><strong>Category:</strong> Legal & Economic Whitepaper</span>
          <span className="hidden sm:inline">•</span>
          <span><strong>Status:</strong> Active Standard Specification</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-hive-gold font-bold">Standard Identifier: OMNI-SPEC-024B</span>
        </div>

        {/* Section 1: The Unspoken EMR Tax */}
        <section className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-4 hive-glass">
          <h2 className="font-display font-bold text-xl text-hive-paper-text tracking-wide border-b border-hive-border/60 pb-2">
            1. Executive Summary: The Unspoken EMR Tax
          </h2>
          <p className="text-sm text-hive-muted leading-relaxed">
            In standard electronic health record (EMR) systems, small-to-medium clinics face an artificial financial tax. EMR vendors bundle the American Medical Association's (AMA) proprietary <strong>Current Procedural Terminology (CPT)</strong> search database directly into every single user profile, forcing clinics to pay mandatory seat-license royalties (averaging $150/seat/year) for every clinical and administrative employee on the payroll.
          </p>
          <p className="text-sm text-hive-muted leading-relaxed">
            For Direct Primary Care (DPC) and cash-only clinics, this is an economic absurdity. These sovereign practices submit **zero** insurance claims, meaning they have zero legal or operational need to license CPT data. Yet, they are forced to pay the embedded licensing fees just to write down basic clinical charts.
          </p>
          <p className="text-sm text-hive-muted leading-relaxed">
            This whitepaper details the **CPT Seat-License Deprovisioning Methodology**—a legally compliant, audited contract-pruning strategy utilized by the largest hospital networks in the world to bypass CPT seat taxes, and demonstrates how O.M.N.I. democratizes this strategy for small clinics.
          </p>
        </section>

        {/* Section 2: The Enterprise Playbook */}
        <section className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-4 hive-glass">
          <h2 className="font-display font-bold text-xl text-hive-paper-text tracking-wide border-b border-hive-border/60 pb-2">
            2. The Enterprise Playbook (Epic & Cerner Mechanics)
          </h2>
          <p className="text-sm text-hive-muted leading-relaxed">
            It is a common misconception that clinical staff must have direct CPT database access to record care. In major health systems running <strong>Epic Systems</strong> or <strong>Oracle Cerner</strong>, nurses, medical assistants, and therapists never search or select CPT codes. 
          </p>
          <p className="text-sm text-hive-muted leading-relaxed">
            Instead, these organizations utilize a decoupled clinical infrastructure:
          </p>
          <div className="bg-[#090909] border border-hive-border/60 p-5 rounded-xl flex flex-col gap-3 font-mono text-xs text-hive-muted my-2">
            <div className="flex items-start gap-3">
              <span className="text-hive-gold font-bold">[1]</span>
              <span><strong>The Chargemaster Mapping:</strong> The hospital’s IT department pre-programs static order sets and checklists (e.g., clicking <code>[x] Peripheral IV Insertion</code>).</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-hive-gold font-bold">[2]</span>
              <span><strong>CPT Access Stripping:</strong> IT administrators explicitly strip CPT database search and charge-capture privileges from 80% of staff user logins (nurses, MAs, researchers, intake coordinators).</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-hive-gold font-bold">[3]</span>
              <span><strong>Silent Outbound Translation:</strong> Behind the scenes, the clinical checklist selections are programmatically translated to CPT codes only when the bill is generated. Only the hospital's dedicated billing specialists retain active, licensed CPT seats to manage clearinghouse submissions.</span>
            </div>
          </div>
          <p className="text-sm text-hive-muted leading-relaxed font-light italic">
            By de-provisioning CPT search access on 80% of user logins, enterprise health systems legally slash hundreds of thousands of dollars from their EMR seat license royalty invoices.
          </p>
        </section>

        {/* Section 3: The Anticompetitive Tying Arrangement */}
        <section className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-4 hive-glass">
          <h2 className="font-display font-bold text-xl text-hive-paper-text tracking-wide border-b border-hive-border/60 pb-2">
            3. Anticompetitive Tying: The EMR Licensing Monopolization
          </h2>
          <p className="text-sm text-hive-muted leading-relaxed">
            Why has this contract optimization been historically restricted to large hospitals? <strong>The answer is anticompetitive tying.</strong>
          </p>
          <p className="text-sm text-hive-muted leading-relaxed">
            Small EMR vendors leverage their market position to lock small group practices and DPC clinics into bundled pricing models. They refuse to offer "CPT-Free" tiers, asserting that the CPT database is "natively integrated" and cannot be decoupled.
          </p>
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 my-2">
            <span className="text-xs font-mono font-bold text-red-400 uppercase block mb-1">Antitrust & Legal Exposure</span>
            <p className="text-xs text-hive-muted leading-relaxed">
              Forcing a physician to purchase access to a proprietary financial database (CPT) owned by a third-party private entity (AMA) as a mandatory condition for accessing standard medical charting software—even when the physician has zero legal or operational relationship with insurance networks—constitutes an anticompetitive **tying arrangement**. This bundling structure is highly vulnerable to legal challenges and class-action audits by direct care advocacy coalitions.
            </p>
          </div>
          <p className="text-sm text-hive-muted leading-relaxed">
            EMR companies are legally capable of disabling CPT modules on an account-by-account basis. Under the <strong>AMA Royalty Auditing Guidelines Section 4B</strong>, software developers are required to support user-seat privilege de-provisioning. Small clinics are legally entitled to request that their account managers deactivate CPT access and adjust their subscription fees accordingly.
          </p>
        </section>

        {/* Section 4: How O.M.N.I. Democratizes the Chargemaster */}
        <section className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-4 hive-glass">
          <h2 className="font-display font-bold text-xl text-hive-paper-text tracking-wide border-b border-hive-border/60 pb-2">
            4. How O.M.N.I. Democratizes the Chargemaster
          </h2>
          <p className="text-sm text-hive-muted leading-relaxed">
            Small clinics lack the multi-million dollar IT budgets required to construct custom databases and mapping tables between clinical labels and CPT codes. 
          </p>
          <p className="text-sm text-hive-muted leading-relaxed">
            <strong>O.M.N.I. is the equalizer.</strong> By providing a 100% open-source, serverless clinical vocabulary, O.M.N.I. acts as a pre-built, universal chargemaster that any EMR or clinic can deploy instantly for free:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
            <div className="bg-[#090909] border border-hive-border/60 p-4 rounded-xl">
              <span className="text-xs font-bold text-hive-gold block mb-1">100% Replicable Logic</span>
              <p className="text-xs text-hive-muted leading-relaxed">
                Because O.M.N.I. uses a post-coordinated axes standard, standard procedure codes are compiled deterministically. The exact same clinical entry will generate identical codes across any competitor’s system, completely eliminating vendor lock-in.
              </p>
            </div>
            <div className="bg-[#090909] border border-hive-border/60 p-4 rounded-xl">
              <span className="text-xs font-bold text-hive-gold block mb-1">Silent Translation Bridge</span>
              <p className="text-xs text-hive-muted leading-relaxed">
                Our free, serverless Edge Connector acts as the translation bridge. Physicians chart notes using open-source terms; our connector translates the clinical stems to CPT codes only at checkout, restricting active CPT seat requirements to the billing department.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: The Actionable Plan */}
        <section className="bg-hive-paper border border-hive-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 hive-glass">
          <h2 className="font-display font-bold text-xl text-hive-paper-text tracking-wide border-b border-hive-border/60 pb-2">
            5. The Actionable Blueprint for Sovereign Clinics
          </h2>
          <p className="text-sm text-hive-muted leading-relaxed">
            Sovereign cash-only and DPC clinics can immediately implement the de-provisioning methodology to improve cash flow:
          </p>
          <div className="flex flex-col gap-3 text-sm text-hive-muted">
            <div className="flex items-start gap-2">
              <span className="text-hive-gold font-bold">•</span>
              <span><strong>Audit User Seats:</strong> Identify and de-select CPT lookup permissions in EMR User Settings for all non-billing clinical assistants and nurses.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-hive-gold font-bold">•</span>
              <span><strong>Leverage Section 4B:</strong> Contact your EMR account executive and send a formal de-provisioning notice citing AMA Guidelines Section 4B. Request the unbundling of CPT database access royalties from your subscription fees.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-hive-gold font-bold">•</span>
              <span><strong>Advocate for EMR Alternatives:</strong> Support and migrate to modern, O.M.N.I.-native EMR platforms that structurally charge $40/mo instead of $99/mo by avoiding proprietary database royalties entirely.</span>
            </div>
          </div>
          <div className="mt-4 border-t border-hive-border/60 pt-4 flex justify-between items-center">
            <a
              href="/integrate"
              className="text-xs font-mono font-bold text-hive-gold hover:text-hive-paper-text uppercase tracking-wider transition-colors"
            >
              ➔ View the Interactive ROI Calculator & Action Scripts
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
