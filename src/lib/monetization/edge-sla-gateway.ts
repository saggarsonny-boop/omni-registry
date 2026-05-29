// -*- coding: utf-8 -*-
/**
 * O.M.N.I. Managed Edge SLA & Nodal Gateway (Strategy B Engine)
 * Handles Cloudflare-Pages/Worker serverless whitelists, API key authorization,
 * token-bucket rate-limiting, and sub-millisecond edge SLA compliance logs.
 */

export interface EdgeSLARequest {
  apiKey: string;
  originDomain: string;
  timestamp: number;
}

export interface EdgeSLAResponse {
  isAuthorized: boolean;
  rateLimitRemaining: number;
  latencyMs: number;
  slaCompliant: boolean;
  errorMessage?: string;
}

export class EdgeSLAGateway {
  private static SLA_TIMEOUT_BUDGET_MS = 50; // 50ms Edge timeout SLA
  private static MAX_TOKENS = 1000;
  private static REFILL_RATE_SEC = 50;

  // Simple in-memory mock store for tokens & whitelists (Edge Workers usually fetch this from KV Store)
  private static whitelistDomains = new Set([
    "epic.ourhospital.org",
    "cerner.healthnetwork.com",
    "athena.clinicnet.org",
    "hint.dpcgroup.com",
    "localhost"
  ]);

  private static apiKeys = new Map<string, { tokens: number; lastRefill: number }>([
    ["omni-pro-key-hospital-1", { tokens: 1000, lastRefill: Date.now() }],
    ["omni-sovereign-key-clinic-2", { tokens: 500, lastRefill: Date.now() }]
  ]);

  /**
   * Evaluates Edge SLA compliance, whitelists, and rate limits in sub-milliseconds.
   */
  public static processRequest(req: EdgeSLARequest): EdgeSLAResponse {
    const startTime = Date.now();
    
    // 1. Whitelist domain check
    if (!this.whitelistDomains.has(req.originDomain)) {
      return {
        isAuthorized: false,
        rateLimitRemaining: 0,
        latencyMs: Date.now() - startTime,
        slaCompliant: true,
        errorMessage: "Origin domain is not whitelisted on official O.M.N.I. Edge Nodes."
      };
    }

    // 2. API Key authorization
    const keyData = this.apiKeys.get(req.apiKey);
    if (!keyData) {
      return {
        isAuthorized: false,
        rateLimitRemaining: 0,
        latencyMs: Date.now() - startTime,
        slaCompliant: true,
        errorMessage: "Invalid Edge Nodal API Key."
      };
    }

    // 3. Token bucket rate-limiting (Edge-safe, zero database dependency)
    const now = Date.now();
    const elapsedSec = (now - keyData.lastRefill) / 1000;
    const tokensToAdd = Math.floor(elapsedSec * this.REFILL_RATE_SEC);
    
    keyData.tokens = Math.min(this.MAX_TOKENS, keyData.tokens + tokensToAdd);
    keyData.lastRefill = now;

    if (keyData.tokens <= 0) {
      return {
        isAuthorized: false,
        rateLimitRemaining: 0,
        latencyMs: Date.now() - startTime,
        slaCompliant: true,
        errorMessage: "Edge Nodal API rate limit exceeded (Token Bucket Exhausted)."
      };
    }

    // Consume 1 token
    keyData.tokens -= 1;
    this.apiKeys.set(req.apiKey, keyData);

    const latency = Date.now() - startTime;
    const isSlaCompliant = latency <= this.SLA_TIMEOUT_BUDGET_MS;

    return {
      isAuthorized: true,
      rateLimitRemaining: keyData.tokens,
      latencyMs: latency,
      slaCompliant: isSlaCompliant
    };
  }
}
