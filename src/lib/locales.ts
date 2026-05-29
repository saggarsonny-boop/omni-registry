// -*- coding: utf-8 -*-
import en from "../locales/en.json";
import es from "../locales/es.json";
import fr from "../locales/fr.json";
import ar from "../locales/ar.json";
import hi from "../locales/hi.json";
import zh from "../locales/zh.json";
import pt from "../locales/pt.json";

export type Locale = "en" | "es" | "fr" | "ar" | "hi" | "zh" | "pt";

const localeCatalogs: Record<Locale, Record<string, string>> = {
  en,
  es,
  fr,
  ar,
  hi,
  zh,
  pt,
};

export const SUPPORTED_LOCALES: Locale[] = ["en", "es", "fr", "ar", "hi", "zh", "pt"];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  ar: "العربية",
  hi: "हिन्दी",
  zh: "简体中文",
  pt: "Português",
};

/**
 * Detects the best matching locale based on browser settings.
 * Falls back to "en" if no match is found or when running on the server.
 */
export function detectLocale(): Locale {
  if (typeof window === "undefined" || !navigator) {
    return "en";
  }

  const browserLang = navigator.language.split("-")[0].toLowerCase();
  if (SUPPORTED_LOCALES.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }

  // Fallback check for any matching language in languages array
  if (navigator.languages) {
    for (const lang of navigator.languages) {
      const parsed = lang.split("-")[0].toLowerCase();
      if (SUPPORTED_LOCALES.includes(parsed as Locale)) {
        return parsed as Locale;
      }
    }
  }

  return "en";
}

/**
 * Returns the translation for a key in the specified locale.
 * Falls back to "en" catalog if the key is missing in the requested locale.
 */
export function translate(key: string, locale: Locale = "en"): string {
  const catalog = localeCatalogs[locale] || en;
  const translation = catalog[key];
  if (translation !== undefined) {
    return translation;
  }
  // Fall back to English catalog
  return en[key as keyof typeof en] || key;
}

// Shortcut alias
export const t = translate;
