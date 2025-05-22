"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = {
  code: string
  name: string
  nativeName: string
}

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  availableLanguages: Language[]
  translations: Record<string, Record<string, string>>
  t: (key: string) => string
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
]

// Sample translations for demonstration
const translations: Record<string, Record<string, string>> = {
  en: {
    "settings.language": "Language",
    "settings.language.description": "Choose your preferred language",
    "settings.language.system": "Use system language",
    "settings.save": "Save Changes",
    "settings.saved": "Settings saved successfully",
    "nav.home": "Home",
    "nav.explore": "Explore",
    "nav.mymess": "My Mess",
    "nav.settings": "Settings",
  },
  hi: {
    "settings.language": "भाषा",
    "settings.language.description": "अपनी पसंदीदा भाषा चुनें",
    "settings.language.system": "सिस्टम भाषा का उपयोग करें",
    "settings.save": "परिवर्तन सहेजें",
    "settings.saved": "सेटिंग्स सफलतापूर्वक सहेजी गईं",
    "nav.home": "होम",
    "nav.explore": "एक्सप्लोर",
    "nav.mymess": "मेरा मेस",
    "nav.settings": "सेटिंग्स",
  },
  mr: {
    "settings.language": "भाषा",
    "settings.language.description": "तुमची पसंतीची भाषा निवडा",
    "settings.language.system": "सिस्टम भाषेचा वापर करा",
    "settings.save": "बदल जतन करा",
    "settings.saved": "सेटिंग्ज यशस्वीरित्या जतन केले",
    "nav.home": "होम",
    "nav.explore": "एक्सप्लोर",
    "nav.mymess": "माझे मेस",
    "nav.settings": "सेटिंग्ज",
  },
}

const defaultLanguage = languages[0]

// Export the context directly so it can be imported elsewhere
export const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: defaultLanguage,
  setLanguage: () => {},
  availableLanguages: languages,
  translations,
  t: (key) => key,
})

export const useLanguage = () => useContext(LanguageContext)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLanguage)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("userLanguage")
    if (savedLanguage) {
      try {
        const parsedLanguage = JSON.parse(savedLanguage)
        setCurrentLanguage(parsedLanguage)
      } catch (e) {
        console.error("Error parsing saved language", e)
      }
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0]
      const detectedLanguage = languages.find((lang) => lang.code === browserLang)
      if (detectedLanguage) {
        setCurrentLanguage(detectedLanguage)
        localStorage.setItem("userLanguage", JSON.stringify(detectedLanguage))
      }
    }
  }, [])

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem("userLanguage", JSON.stringify(language))
    // You could also set a cookie here for server-side language detection
  }

  // Translation function
  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage.code] || translations.en
    return langTranslations[key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        availableLanguages: languages,
        translations,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
