import { OMNICode } from "./registry";
import { seedCodes } from "./seed-codes";

export type DetectedType = "cpt" | "ichi" | "snomed_ct" | "icd11" | "icd10" | "omni_id" | "omni_composition" | "unknown";

export interface ConversionResult {
  detectedType: DetectedType;
  matchedCode: OMNICode | null;
  suggestions: string[];
  diagnosticMessage?: string;
}

/**
 * Detects the medical coding standard type from a raw text input.
 */
export function detectCodeType(input: string): DetectedType {
  const clean = input.trim();
  if (!clean) return "unknown";

  // OMNI ID
  if (/^OMNI-[0-9A-Z]+$/i.test(clean)) {
    return "omni_id";
  }

  // CPT: 5 digits
  if (/^\d{5}$/.test(clean)) {
    return "cpt";
  }

  // SNOMED CT: 6 to 18 digits
  if (/^\d{6,18}$/.test(clean)) {
    return "snomed_ct";
  }

  // ICHI Stem: 3 chars + period + 2 chars + period + 2 chars (e.g. KBO.JK.AB)
  if (/^[A-Z0-9]{3}\.[A-Z0-9]{2}\.[A-Z0-9]{2}$/i.test(clean)) {
    return "ichi";
  }

  // ICD-11: letter + number + two digits + period + digit/character (e.g. LA24.0)
  if (/^[A-Z][A-Z0-9]\d{2}(?:\.[A-Z0-9]+)?$/i.test(clean)) {
    return "icd11";
  }

  // ICD-10: e.g. 0DTJ4ZZ (7 characters PCS) or M54.5 (3-7 characters CM)
  if (/^[A-Z0-9]{7}$/i.test(clean) || /^[A-Z]\d[0-9A-Z](?:\.[0-9A-Z]{1,4})?$/i.test(clean)) {
    return "icd10";
  }

  // OMNI Composition: e.g. [appendix][total excision][percutaneous endoscopic]
  if (clean.includes("[") && clean.includes("]")) {
    return "omni_composition";
  }

  // OMNI Composition text: e.g. appendix total excision percutaneous endoscopic
  if (clean.split(/\s+/).length >= 3) {
    return "omni_composition";
  }

  return "unknown";
}

/**
 * Searches the static client-side bundle for a match on the input code.
 */
export function convertCode(input: string): ConversionResult {
  const clean = input.trim();
  const detectedType = detectCodeType(clean);

  if (detectedType === "unknown" || !clean) {
    return {
      detectedType: "unknown",
      matchedCode: null,
      suggestions: ["44970", "KBO.JK.AB", "80146002", "OMNI-0044970"],
      diagnosticMessage: "Invalid or empty input. Try inputting a 5-digit CPT code, a SNOMED CT concept ID, or an ICHI stem code.",
    };
  }

  // Search through pre-bundled static seed codes
  const query = clean.toLowerCase();
  let matchedCode: OMNICode | null = null;

  for (const code of seedCodes) {
    const cross = code.crosswalks;
    if (detectedType === "omni_id" && code.omni_id.toLowerCase() === query) {
      matchedCode = code;
      break;
    }
    if (detectedType === "cpt" && cross.cpt === clean) {
      matchedCode = code;
      break;
    }
    if (detectedType === "snomed_ct" && cross.snomed_ct === clean) {
      matchedCode = code;
      break;
    }
    if (detectedType === "ichi" && cross.ichi?.toLowerCase() === query) {
      matchedCode = code;
      break;
    }
    if (detectedType === "icd11" && cross.icd11_pcs?.toLowerCase() === query) {
      matchedCode = code;
      break;
    }
    if (detectedType === "icd10" && (cross.icd10_cm?.toLowerCase() === query || cross.icd11_pcs?.toLowerCase() === query)) {
      matchedCode = code;
      break;
    }

    // Match composition fields
    if (detectedType === "omni_composition") {
      const comp = code.composition;
      const combined = `${comp.target} ${comp.action} ${comp.means}`.toLowerCase();
      // Check if query matches target, action, means keywords
      if (query.includes(comp.target.toLowerCase()) && query.includes(comp.action.toLowerCase()) && query.includes(comp.means.toLowerCase())) {
        matchedCode = code;
        break;
      }
      // Bracketed match
      const bracketed = `[${comp.target}][${comp.action}][${comp.means}]`.toLowerCase();
      if (bracketed.includes(query) || query.includes(bracketed)) {
        matchedCode = code;
        break;
      }
    }
  }

  if (matchedCode) {
    return {
      detectedType,
      matchedCode,
      suggestions: [],
    };
  }

  // Construct honest diagnostic help messages for missing codes
  let diagnosticMessage = "";
  if (detectedType === "cpt") {
    diagnosticMessage = `We detected CPT code "${clean}", but it is not yet in our seed crosswalk database.
In OMNI, you can represent this procedure by building a target/action/means composition. For example:
1. Target: Identify the specific anatomic organ or body system (e.g. "gallbladder", "appendix").
2. Action: Determine the clinical action (e.g. "total excision", "repair").
3. Means: Identify the surgical method or approach (e.g. "percutaneous endoscopic", "open").
Once formulated, combine them as [target][action][means] to generate a standard OMNI stem descriptor.`;
  } else if (detectedType === "ichi") {
    diagnosticMessage = `We detected WHO ICHI stem code "${clean}", but it is not yet in our seed crosswalk database.
ICHI stem codes feature a three-axis structure corresponding to OMNI's Target/Action/Means taxonomy.
You can read this ICHI code directly: the first segment denotes the target organ, the middle is the action, and the last is the approach.
Feel free to submit a GitHub Issue to have this crosswalk added to the official v0.2 OMNI publication.`;
  } else if (detectedType === "snomed_ct") {
    diagnosticMessage = `We detected SNOMED CT concept ID "${clean}", but it is not yet in our seed crosswalk database.
SNOMED CT compositional grammar allows post-coordination of concepts.
You can post-coordinate this concept using OMNI's open terminology rules. Please check the sibling standard universaldocument.org for formatting details.`;
  } else {
    diagnosticMessage = `We detected a code of type "${detectedType.toUpperCase()}" ("${clean}"), but it is not yet in our seed crosswalk database.
OMNI Registry is currently in its v0.1 seed publication phase with 50+ common interventions.
You can help expand the standard by submitting an issue to crosswalk this code.`;
  }

  return {
    detectedType,
    matchedCode: null,
    suggestions: ["44970", "KBO.JK.AB", "80146002", "OMNI-0044970"],
    diagnosticMessage,
  };
}
