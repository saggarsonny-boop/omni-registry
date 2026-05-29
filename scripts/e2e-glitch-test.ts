// -*- coding: utf-8 -*-
/**
 * O.M.N.I. Registry — E2E Glitch & SWIM Protocol Resilience Testing Suite
 * Validates the edge converter against security exploits, malformed inputs, 
 * extreme bounds, and character noise to guarantee zero runtime failures.
 */

import { convertCode } from "../src/lib/converter";

// ANSI Colors
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";

console.log(`${BOLD}${CYAN}====================================================${RESET}`);
console.log(`${BOLD}${CYAN}    O.M.N.I. SWIM PROTOCOL E2E GLITCH SUITE        ${RESET}`);
console.log(`${BOLD}${CYAN}====================================================${RESET}\n`);

let glitchTestCount = 0;
let glitchPassCount = 0;
let glitchFailCount = 0;

function assertGlitch(condition: boolean, message: string) {
  glitchTestCount++;
  if (condition) {
    glitchPassCount++;
    console.log(`  ${GREEN}✓ [SAFE]${RESET} ${message}`);
  } else {
    glitchFailCount++;
    console.log(`  ${RED}✗ [FAIL]${RESET} ${BOLD}${message}${RESET}`);
  }
}

// ----------------------------------------------------
// GLITCH SUITE 1: Null, Empty, and Spacing Exploits
// ----------------------------------------------------
console.log(`${BOLD}${YELLOW}Glitch Test Set 1: Boundary & Input Whitespace Resilience${RESET}`);
try {
  const r1 = convertCode("");
  assertGlitch(r1.detectedType === "unknown" && r1.matchedCode === null, "Empty string input gracefully returns 'unknown' type with zero exceptions");

  const r2 = convertCode("    ");
  assertGlitch(r2.detectedType === "unknown" && r2.matchedCode === null, "Multiple whitespaces input correctly parsed as empty");

  const r3 = convertCode("\t\n\r   44970   \n");
  assertGlitch(r3.detectedType === "cpt" && r3.matchedCode !== null, "Leading and trailing tabs/newlines trimmed, successfully matching laparoscopic appendectomy (44970)");
} catch (err: any) {
  assertGlitch(false, `Boundary spacing failed: ${err.message}`);
}
console.log("");

// ----------------------------------------------------
// GLITCH SUITE 2: Security Exploits & SQL Injections
// ----------------------------------------------------
console.log(`${BOLD}${YELLOW}Glitch Test Set 2: Security Injection Defense${RESET}`);
try {
  const sqlInjectionInput = "44970' OR '1'='1 --";
  const r1 = convertCode(sqlInjectionInput);
  assertGlitch(r1.matchedCode === null, "SQL injection attempt blocked; safely fails matching with zero SQL/code side effects");

  const xssInput = "<script>alert('OMNI_EXPLOIT')</script>";
  const r2 = convertCode(xssInput);
  assertGlitch(r2.matchedCode === null, "Cross-site scripting (XSS) markup safely processed without execution or crashes");

  const pathTraversalInput = "../../../etc/passwd";
  const r3 = convertCode(pathTraversalInput);
  assertGlitch(r3.matchedCode === null, "Directory path traversal input safely rejected as unknown");
} catch (err: any) {
  assertGlitch(false, `Security injection testing crashed: ${err.message}`);
}
console.log("");

// ----------------------------------------------------
// GLITCH SUITE 3: Buffer Overflow & Extreme Inputs
// ----------------------------------------------------
console.log(`${BOLD}${YELLOW}Glitch Test Set 3: Extreme Input Size & Buffer Overflow Safety${RESET}`);
try {
  const hugeString = "A".repeat(50000);
  const startTime = Date.now();
  const r1 = convertCode(hugeString);
  const duration = Date.now() - startTime;
  
  assertGlitch(r1.matchedCode === null, "50,000 character string successfully processed and returns null match");
  assertGlitch(duration < 50, `Extreme input size parsed instantly in ${duration}ms (well below 50ms edge timeout budget)`);
} catch (err: any) {
  assertGlitch(false, `Buffer overflow testing crashed: ${err.message}`);
}
console.log("");

// ----------------------------------------------------
// GLITCH SUITE 4: Unicode, Emojis, and Accent Noises
// ----------------------------------------------------
console.log(`${BOLD}${YELLOW}Glitch Test Set 4: Accent & Emoji Character Resilience${RESET}`);
try {
  const emojiInput = "💉 44970 🩹";
  const r1 = convertCode(emojiInput);
  assertGlitch(r1.matchedCode === null, "Input with emojis does not crash the parser and returns null safely");

  const mixedAccents = "[appèndix][tôtal excisïon][percutanêous endoscopîc]";
  const r2 = convertCode(mixedAccents);
  assertGlitch(r2.matchedCode === null, "Accents mismatch fails to match catalog seeds but completes diagnostic evaluation cleanly");
} catch (err: any) {
  assertGlitch(false, `Unicode character testing failed: ${err.message}`);
}
console.log("");

// ----------------------------------------------------
// GLITCH SUITE 5: Malformed Bracket Syntax
// ----------------------------------------------------
console.log(`${BOLD}${YELLOW}Glitch Test Set 5: Malformed Multi-axial Bracket Grammars${RESET}`);
try {
  const missingBracket = "[appendix][total excision";
  const r1 = convertCode(missingBracket);
  assertGlitch(r1.detectedType === "omni_composition" && r1.matchedCode === null, "Incomplete bracket syntax safely identified as OMNI composition format with no regex infinite loop");

  const nestedBrackets = "[[appendix]][[total excision]][[percutaneous endoscopic]]";
  const r2 = convertCode(nestedBrackets);
  assertGlitch(r2.matchedCode === null, "Double nested bracket noise parsed gracefully without stack overflow");

  const invertedBrackets = "]appendix[]total excision[]percutaneous endoscopic[";
  const r3 = convertCode(invertedBrackets);
  assertGlitch(r3.matchedCode === null, "Inverted bracket patterns rejected as unknown/unmatched composition");
} catch (err: any) {
  assertGlitch(false, `Bracket syntax testing crashed: ${err.message}`);
}
console.log("");

console.log(`${BOLD}${CYAN}====================================================${RESET}`);
console.log(`${BOLD}    SWIM RESILIENCE RUN RESULTS:${RESET}`);
console.log(`    Total Glitch Controls Tested: ${BOLD}${glitchTestCount}${RESET}`);
console.log(`    Passed (Safe): ${GREEN}${BOLD}${glitchPassCount}${RESET}`);
console.log(`    Failed (Vulnerable): ${glitchFailCount > 0 ? RED + BOLD : GREEN}${glitchFailCount}${RESET}`);
console.log(`${BOLD}${CYAN}====================================================${RESET}`);

if (glitchFailCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
