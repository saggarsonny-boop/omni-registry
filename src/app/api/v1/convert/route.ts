// -*- coding: utf-8 -*-
import { NextResponse } from "next/server";
import { convertCode } from "@/lib/converter";

export const runtime = "edge"; // Deploy as edge function for instant execution

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || searchParams.get("q") || "";

    if (!query.trim()) {
      return NextResponse.json(
        { error: "Missing required query string parameter 'query' or 'q'." },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
          },
        }
      );
    }

    const conversionResult = convertCode(query);

    // Return the match, detected format, and any diagnostic instructions if empty
    return NextResponse.json(
      {
        detected_format: conversionResult.detectedType,
        matched: conversionResult.matchedCode,
        diagnostic: conversionResult.diagnosticMessage || null,
        version: "0.1.0",
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Cache-Control": "public, max-age=60, s-maxage=600", // Cache at edge for 10 min
        },
      }
    );
  } catch (error) {
    console.error("API GET convert error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred during nomenclature conversion." },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
