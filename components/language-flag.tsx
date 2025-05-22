import { cn } from "@/lib/utils"

interface LanguageFlagProps {
  languageCode: string
  className?: string
}

export function LanguageFlag({ languageCode, className }: LanguageFlagProps) {
  const flagEmoji = getLanguageFlag(languageCode)

  return <div className={cn("text-2xl", className)}>{flagEmoji}</div>
}

function getLanguageFlag(code: string): string {
  const flags: Record<string, string> = {
    en: "🇬🇧",
    hi: "🇮🇳",
    mr: "🇮🇳",
    gu: "🇮🇳",
    ta: "🇮🇳",
    te: "🇮🇳",
    kn: "🇮🇳",
    bn: "🇮🇳",
    // Add more language codes and their corresponding flag emojis
  }

  return flags[code] || "🌐"
}
