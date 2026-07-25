// -*- coding: utf-8 -*-
"use client";

import React, { useEffect, useState } from "react";
import { detectLocale, t, Locale } from "../lib/locales";

export default function PwaInstallHint() {
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop" | "hidden">("hidden");
  const [locale, setLocale] = useState<Locale>("en");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    setLocale(detectLocale());

    // Check if already dismissed
    const isDismissed = localStorage.getItem("omni-pwa-dismissed");
    if (isDismissed === "true") {
      return;
    }

    // Check if already running as PWA (standalone)
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes("android-app://");
      
    if (isStandalone) {
      return;
    }

    // Detect platform
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    if (isIOS) {
      setPlatform("ios");
    } else if (isAndroid) {
      // Listen for the standard install prompt
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setPlatform("android");
      };
      
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      
      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      };
    } else {
      // Show desktop install hint after 5 seconds if not dismissed
      const timer = setTimeout(() => {
        setPlatform("desktop");
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleInstallClick = async () => {
    if (platform === "android" && deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        localStorage.setItem("omni-pwa-dismissed", "true");
        setPlatform("hidden");
      }
      setDeferredPrompt(null);
    } else if (platform === "desktop") {
      // For desktop, show instructions to click the browser address bar icon
      alert("To install OMNI: Click the Install icon (computer with down arrow) in your browser address bar.");
      localStorage.setItem("omni-pwa-dismissed", "true");
      setPlatform("hidden");
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("omni-pwa-dismissed", "true");
    setPlatform("hidden");
  };

  if (platform === "hidden") {
    return null;
  }

  return (
    <div 
      className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[9999] fade-in"
      role="dialog"
      aria-label="PWA install hint"
    >
      <div className="bg-[#121212] border-2 border-hive-gold rounded-xl p-5 shadow-2xl relative hive-glass hive-glow">
        {/* Dismiss Button */}
        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-hive-muted hover:text-hive-gold text-lg font-mono focus:outline-none touch-target"
          aria-label={t("pwa_btn_dismiss", locale)}
        >
          ✕
        </button>

        {/* Brand badge */}
        <div className="inline-block text-[9px] font-mono font-bold tracking-widest text-[#0a0a0a] bg-hive-gold px-2.5 py-0.5 rounded-full mb-3 uppercase">
          Ecosystem Application
        </div>

        {/* Header */}
        <h3 className="font-display font-bold text-hive-paper-text text-base md:text-lg mb-1">
          {t("pwa_hint_title", locale)}
        </h3>

        {/* Body Text: specifically naming "no wifi and no cell service" per Hive Checklist */}
        <p className="text-xs text-hive-muted leading-relaxed mb-4">
          Install the OMNI Registry to your home screen for lightning-fast access to codes and crosswalks, <strong>even when you have no wifi and no cell service</strong>.
        </p>

        {/* Conditional instructions */}
        {platform === "ios" && (
          <div className="bg-[#090909] border border-hive-border rounded-lg p-3 text-xs leading-relaxed text-hive-gold-dim">
            <span className="text-hive-gold font-bold">iOS Guided Install:</span> {t("pwa_ios_safari", locale)}
          </div>
        )}

        {(platform === "android" || platform === "desktop") && (
          <div className="flex gap-3 mt-4">
            <button 
              onClick={handleInstallClick}
              className="flex-1 bg-hive-gold hover:bg-hive-gold-dim text-hive-ink font-bold text-xs py-3 px-4 rounded-lg transition-colors touch-target"
            >
              {t("pwa_btn_install", locale)}
            </button>
            <button 
              onClick={handleDismiss}
              className="flex-1 bg-transparent hover:bg-hive-paper-2 border border-hive-border text-hive-paper-text font-bold text-xs py-3 px-4 rounded-lg transition-colors touch-target"
            >
              {t("pwa_btn_dismiss", locale)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
