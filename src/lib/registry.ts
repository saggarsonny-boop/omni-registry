// -*- coding: utf-8 -*-
import { seedCodes } from "./seed-codes";

export interface OMNICode {
  omni_id: string;
  composition: {
    target: string;
    action: string;
    means: string;
  };
  plain_language: {
    en: string;
    es: string;
    fr: string;
    ar: string;
    hi: string;
    zh: string;
    pt: string;
  };
  crosswalks: {
    cpt: string | null;
    ichi: string | null;
    snomed_ct: string | null;
    icd11_pcs: string | null;
    icd10_cm?: string | null;
  };
  version: string;
  added: string;
  notes?: string;
  provisional?: boolean;
}

/**
 * Returns a list of all OMNI Code IDs (e.g. OMNI-0044970) based on seedCodes.
 */
export function getAllCodeIds(): string[] {
  return seedCodes.map((code) => code.omni_id);
}

/**
 * Reads and parses a specific OMNI code by ID.
 * Returns null if the code is not found in seed dataset.
 */
export function getCodeById(id: string): OMNICode | null {
  if (!id) return null;
  const safeId = id.trim().toLowerCase();
  return seedCodes.find((code) => code.omni_id.toLowerCase() === safeId) || null;
}

/**
 * Returns all OMNI codes from the static seed bundle.
 */
export function getAllCodes(): OMNICode[] {
  // Sort alphabetically by OMNI ID
  return [...seedCodes].sort((a, b) => a.omni_id.localeCompare(b.omni_id));
}
