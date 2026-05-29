# OMNI Registry (Open Medical Nomenclature and Interventions)

The OMNI Registry is the canonical home for the OMNI medical coding standard, shipped alongside the SSRN paper:
**"No One Can Own the Language of Medicine"** by **Sonny Saggar MD** (SSRN, May 2026).

Paper Link (SSRN Preprint): [https://archive.org/details/omni-ssrn-placeholder](https://archive.org/details/omni-ssrn-placeholder) (Temporary Archive link; live SSRN link pending)

## What is OMNI?

OMNI (Open Medical Nomenclature and Interventions) is an open, freely licensed standard for coding medical interventions, designed as a public, royalty-free replacement for CPT (Current Procedural Terminology).

It builds directly upon:
1. **World Health Organization's ICHI** (International Classification of Health Interventions) featuring a clean three-axis taxonomy: **Target**, **Action**, and **Means** (seven-character stem codes).
2. **SNOMED CT compositional grammar** to enable machine-readable, precise, and expressive clinical semantics.

OMNI operates as a sibling standard to the **Universal Document** envelope standard ([universaldocument.org](https://universaldocument.org)). Both standards are entirely open, public, and charge no licensing fees.
*   **OMNI** is the universal vocabulary.
*   **Universal Document** is the universal envelope.

## Licensing

This repository features split licensing terms to protect both the code implementation and the standard's accessibility:
*   **Software Implementation (Next.js/TS):** Licensed under the open-source [MIT License](LICENSE).
*   **Medical Standard Data (JSON codes & mappings):** Licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](LICENSE-STANDARD). You are free to copy, adapt, and build upon the medical terminology mappings for any purpose, with proper attribution to the author.

## Stack & Architecture

*   **Framework:** Next.js 14 (App Router) with TypeScript & Tailwind CSS.
*   **Hosting & Deployment:** Cloudflare Pages with edge execution APIs via `@cloudflare/next-on-pages`.
*   **Data Storage:** Fully static and local database-free. All medical codes and crosswalk mappings are stored as raw static JSON files inside `data/codes/` so that the standard is itself the source of truth, and its deployment constitutes its open publication.
