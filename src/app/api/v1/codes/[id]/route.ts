// -*- coding: utf-8 -*-
import { NextResponse } from "next/server";
import { getCodeById } from "@/lib/registry";

export const runtime = "edge"; // Run as extremely fast Cloudflare edge function

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: "Missing code ID parameter." },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
          },
        }
      );
    }

    const code = getCodeById(id);

    if (!code) {
      return NextResponse.json(
        { error: `OMNI Code ${id} not found in the seed registry.` },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
          },
        }
      );
    }

    // Return successful CORS-enabled JSON response
    return NextResponse.json(code, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "public, max-age=3600, s-maxage=86400", // Edge cache for 1 day
      },
    });
  } catch (error) {
    console.error("API GET code error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while retrieving standard code." },
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

// Handle preflight OPTIONS requests for CORS
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
