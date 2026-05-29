"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCodeIds = getAllCodeIds;
exports.getCodeById = getCodeById;
exports.getAllCodes = getAllCodes;
// -*- coding: utf-8 -*-
const seed_codes_1 = require("./seed-codes");
/**
 * Returns a list of all OMNI Code IDs (e.g. OMNI-0044970) based on seedCodes.
 */
function getAllCodeIds() {
    return seed_codes_1.seedCodes.map((code) => code.omni_id);
}
/**
 * Reads and parses a specific OMNI code by ID.
 * Returns null if the code is not found in seed dataset.
 */
function getCodeById(id) {
    if (!id)
        return null;
    const safeId = id.trim().toLowerCase();
    return seed_codes_1.seedCodes.find((code) => code.omni_id.toLowerCase() === safeId) || null;
}
/**
 * Returns all OMNI codes from the static seed bundle.
 */
function getAllCodes() {
    // Sort alphabetically by OMNI ID
    return [...seed_codes_1.seedCodes].sort((a, b) => a.omni_id.localeCompare(b.omni_id));
}
