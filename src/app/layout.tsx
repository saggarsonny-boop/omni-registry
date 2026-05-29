// -*- coding: utf-8 -*-
import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import HiveHeader from "../components/HiveHeader";
import HiveFooter from "../components/HiveFooter";
import PwaInstallHint from "../components/PwaInstallHint";

// Load typography in Next.js
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Brand Metadata per Checklist
export const metadata: Metadata = {
  title: "OMNI — Open Medical Nomenclature and Interventions",
  description: "An open, freely licensed standard for coding medical interventions, designed to replace CPT. Proposed as a royalty-free clinical vocabulary by Sonny Saggar MD.",
  keywords: "OMNI medical standard, replace CPT code, Open Medical Nomenclature, WHO ICHI crosswalk, SNOMED CT composition, free medical billing codes, medical coding registry, Sonny Saggar MD",
  metadataBase: new URL("https://omni.universaldocument.org"),
  manifest: "/manifest.json",
  applicationName: "OMNI Registry",
  appleWebApp: {
    capable: true,
    title: "OMNI Registry",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "OMNI — Open Medical Nomenclature and Interventions",
    description: "An open, freely licensed standard for coding medical interventions, designed to replace CPT. Royalty-free open clinical standard by Sonny Saggar MD.",
    url: "https://omni.universaldocument.org",
    siteName: "OMNI Registry",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "OMNI Open Medical Nomenclature and Interventions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OMNI — Open Medical Nomenclature",
    description: "An open, freely licensed standard for coding medical interventions, designed to replace CPT.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Canonical theme viewport mapping
export const viewport: Viewport = {
  themeColor: "#D4AF37",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="bg-hive-ink text-hive-paper-text flex flex-col min-h-screen antialiased">
        {/* Dynamic Nav Header */}
        <HiveHeader />

        {/* Beta Banner */}
        <div className="bg-[#D4AF37] text-hive-ink font-mono text-[10px] md:text-xs font-bold text-center py-2 px-4 uppercase tracking-widest shrink-0">
          ✦ OMNI STANDARD V0.1 · OPEN SOURCE PROPOSAL · FULLY CONVERTIBLE & ROYALTY-FREE ✦
        </div>

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        {/* Guided Add-to-Home-Screen prompt */}
        <PwaInstallHint />

        {/* Canonical Hive Footer & Disclosure */}
        <HiveFooter />

        {/* Ecosystem Tracking Analytics */}
        <script src="https://marketing.hive.baby/hive-track.js" async></script>
      </body>
    </html>
  );
}
