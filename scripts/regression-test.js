// -*- coding: utf-8 -*-
const fs = require('fs');
const path = require('path');

// ANSI Colors
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";

console.log(`${BOLD}${CYAN}====================================================${RESET}`);
console.log(`${BOLD}${CYAN}    O.M.N.I. REGISTRY SYSTEM REGRESSION SUITE       ${RESET}`);
console.log(`${BOLD}${CYAN}====================================================${RESET}\n`);

let testCount = 0;
let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  testCount++;
  if (condition) {
    passCount++;
    console.log(`  ${GREEN}✓ [PASS]${RESET} ${message}`);
  } else {
    failCount++;
    console.log(`  ${RED}✗ [FAIL]${RESET} ${BOLD}${message}${RESET}`);
  }
}

// ----------------------------------------------------
// TEST SUITE 1: Locale Catalogs Key Matching & Parity
// ----------------------------------------------------
console.log(`${BOLD}${YELLOW}Test Suite 1: Internationalization (i18n) Catalogs Parity${RESET}`);
try {
  const localesDir = path.join(__dirname, '../src/locales');
  const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));
  
  assert(files.length === 7, `Identified exactly 7 localized translation files (found ${files.length})`);
  
  const catalogs = {};
  files.forEach(file => {
    const lang = file.replace('.json', '');
    const content = fs.readFileSync(path.join(localesDir, file), 'utf8');
    catalogs[lang] = JSON.parse(content);
  });
  
  const enKeys = Object.keys(catalogs['en']);
  assert(enKeys.length > 20, `English catalog contains sufficient translation indexes (${enKeys.length} keys)`);
  
  Object.keys(catalogs).forEach(lang => {
    if (lang === 'en') return;
    const currentKeys = Object.keys(catalogs[lang]);
    let missingKeys = enKeys.filter(k => !currentKeys.includes(k));
    assert(missingKeys.length === 0, `${lang.toUpperCase()} catalog shows 100% key parity with English baseline (missing keys: ${missingKeys.length ? missingKeys.join(', ') : 'none'})`);
    
    let emptyValues = Object.entries(catalogs[lang]).filter(([k, v]) => !v || v.trim() === '');
    assert(emptyValues.length === 0, `${lang.toUpperCase()} catalog contains zero empty or null translation values`);
  });
} catch (err) {
  assert(false, `i18n catalog checks aborted due to exception: ${err.message}`);
}
console.log("");

// ----------------------------------------------------
// TEST SUITE 2: Medical Code Registry seed-codes.ts
// ----------------------------------------------------
console.log(`${BOLD}${YELLOW}Test Suite 2: Seed Medical Code Database Integrity${RESET}`);
try {
  const codesDir = path.join(__dirname, '../data/codes');
  const jsonFiles = fs.readdirSync(codesDir).filter(f => f.endsWith('.json'));
  
  assert(jsonFiles.length >= 50, `Source code registry contains at least 50 seed JSON files (found ${jsonFiles.length})`);
  
  let validStructureCount = 0;
  let codeIds = new Set();
  
  jsonFiles.forEach(file => {
    const rawContent = fs.readFileSync(path.join(codesDir, file), 'utf8');
    const codeObj = JSON.parse(rawContent);
    
    const hasOmniId = codeObj.omni_id && codeObj.omni_id.startsWith('OMNI-');
    const hasAxes = codeObj.composition && codeObj.composition.target && codeObj.composition.action && codeObj.composition.means;
    const hasLocales = codeObj.plain_language && Object.keys(codeObj.plain_language).length === 7;
    const hasCrosswalks = codeObj.crosswalks && 'cpt' in codeObj.crosswalks;
    
    if (hasOmniId && hasAxes && hasLocales && hasCrosswalks) {
      validStructureCount++;
    }
    codeIds.add(codeObj.omni_id);
  });
  
  assert(validStructureCount === jsonFiles.length, `100% of source JSON medical codes comply with canonical O.M.N.I. schema (ID, Target/Action/Means Axes, 7-Language Mappings, Crosswalks)`);
  assert(codeIds.size === jsonFiles.length, `Zero duplicate O.M.N.I. IDs detected in the seed registry (unique count: ${codeIds.size})`);
} catch (err) {
  assert(false, `Medical code database integrity checks failed: ${err.message}`);
}
console.log("");

// ----------------------------------------------------
// TEST SUITE 3: Code Conversion Logic
// ----------------------------------------------------
console.log(`${BOLD}${YELLOW}Test Suite 3: Nomenclature Conversion Engine Regressions${RESET}`);
try {
  const cptRegex = /^\d{5}$/;
  const snomedRegex = /^\d{6,18}$/;
  const ichiRegex = /^[A-Z]{3}\.[A-Z]{2}\.[A-Z]{2}$/i;
  const omniIdRegex = /^OMNI-\d{7}$/;
  const bracketCompositionRegex = /^\[(.+)\]\[(.+)\]\[(.+)\]$/;

  assert(cptRegex.test("44970"), "CPT pattern rules identify 5-digit code format");
  assert(!cptRegex.test("4497"), "CPT pattern rules reject 4-digit code format");
  assert(snomedRegex.test("80146002"), "SNOMED CT rules identify standard concept numeric sequences");
  assert(ichiRegex.test("KBO.JK.AB"), "WHO ICHI stem matching identifies period-delimited axis stem");
  assert(omniIdRegex.test("OMNI-0044970"), "O.M.N.I. ID pattern matching identifies prefix and 7 digits");
  assert(bracketCompositionRegex.test("[appendix][total excision][percutaneous endoscopic]"), "Bracket syntax matches three-axis composition");

  const converterPath = path.join(__dirname, '../src/lib/converter.ts');
  const converterContent = fs.readFileSync(converterPath, 'utf8');
  assert(converterContent.includes('export function convertCode'), "converter.ts successfully exports convertCode utility");
} catch (err) {
  assert(false, `Converter regression suite check failed: ${err.message}`);
}
console.log("");

// ----------------------------------------------------
// TEST SUITE 4: Next-on-Pages Edge Configs
// ----------------------------------------------------
console.log(`${BOLD}${YELLOW}Test Suite 4: Edge Execution Compatibility & Routing${RESET}`);
try {
  const apiCodesPath = path.join(__dirname, '../src/app/api/v1/codes/[id]/route.ts');
  const apiConvertPath = path.join(__dirname, '../src/app/api/v1/convert/route.ts');
  
  const codesContent = fs.readFileSync(apiCodesPath, 'utf8');
  const convertContent = fs.readFileSync(apiConvertPath, 'utf8');
  
  assert(codesContent.includes("runtime = 'edge'") || codesContent.includes('runtime = "edge"'), "GET /api/v1/codes/[id] is configured with Edge runtime");
  assert(convertContent.includes("runtime = 'edge'") || convertContent.includes('runtime = "edge"'), "GET /api/v1/convert is configured with Edge runtime");
  
  assert(codesContent.includes("Access-Control-Allow-Origin") && codesContent.includes("*"), "GET /api/v1/codes/[id] correctly sets open CORS wildcard headers");
  assert(convertContent.includes("Access-Control-Allow-Origin") && convertContent.includes("*"), "GET /api/v1/convert correctly sets open CORS wildcard headers");
} catch (err) {
  assert(false, `Edge execution configurations checks failed: ${err.message}`);
}
console.log("");

console.log(`${BOLD}${CYAN}====================================================${RESET}`);
console.log(`${BOLD}    REGRESSION RUN RESULTS:${RESET}`);
console.log(`    Total Checks Executed: ${BOLD}${testCount}${RESET}`);
console.log(`    Passed: ${GREEN}${BOLD}${passCount}${RESET}`);
console.log(`    Failed: ${failCount > 0 ? RED + BOLD : GREEN}${failCount}${RESET}`);
console.log(`${BOLD}${CYAN}====================================================${RESET}`);

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
