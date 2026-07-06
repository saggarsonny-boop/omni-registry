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
  title: "O.M.N.I. — Open Medical Nomenclature & Interventions",
  description: "An open, freely licensed standard for coding medical interventions, designed to replace CPT. Proposed as a royalty-free clinical vocabulary by Sonny Saggar MD.",
  keywords: "OMNI medical standard, replace CPT code, Open Medical Nomenclature, WHO ICHI crosswalk, SNOMED CT composition, free medical billing codes, medical coding registry, Sonny Saggar MD",
  metadataBase: new URL("https://omni.universaldocument.org"),
  manifest: "/manifest.json",
  applicationName: "O.M.N.I. Registry",
  appleWebApp: {
    capable: true,
    title: "O.M.N.I. Registry",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "O.M.N.I. — Open Medical Nomenclature & Interventions",
    description: "An open, freely licensed standard for coding medical interventions, designed to replace CPT. Royalty-free open clinical standard by Sonny Saggar MD.",
    url: "https://omni.universaldocument.org",
    siteName: "O.M.N.I. Registry",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "OMNI Open Medical Nomenclature & Interventions",
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
          ✦ O.M.N.I. STANDARD V0.2 · OPEN SOURCE PROPOSAL · FULLY CONVERTIBLE & ROYALTY-FREE ✦
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
      
<!-- Stripe Checkout Block -->
<div id="stripe-checkout-cta" style="margin: 2rem auto; padding: 2rem; border-radius: 12px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.2); text-align: center; font-family: sans-serif; max-width: 600px;">
    <h3 style="margin-top: 0; color: #fff;">Activate Premium License</h3>
    <p style="color: #9ca3af; font-size: 0.95rem; margin-bottom: 1.5rem;">Get instant access to all advanced capabilities and integration features.</p>
    <a href="https://buy.stripe.com/8x2cN70o73sR67E3730RG0K" target="_blank" style="display: inline-block; padding: 0.8rem 2rem; background: #3b82f6; color: #fff; font-weight: bold; border-radius: 8px; text-decoration: none; transition: background 0.2s;">Unlock Now</a>
</div>

</body>
    </html>
  );
}
