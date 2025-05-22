"use client"

import { useState } from "react"
import { Check, Globe } from "lucide-react"
import { useLanguage } from "./language-context-provider"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { LanguageFlag } from "./language-flag"

export default function LanguageSettings() {
  const { currentLanguage, setLanguage, availableLanguages, t } = useLanguage()
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage.code)
  const { toast } = useToast()

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
  }

  const handleSave = () => {
    const language = availableLanguages.find((lang) => lang.code === selectedLanguage)
    if (language) {
      setLanguage(language)
      toast({
        title: t("settings.saved"),
        description: `${t("settings.language")}: ${language.name}`,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("settings.language")}</h3>
        <p className="text-sm text-muted-foreground">{t("settings.language.description")}</p>
      </div>
      <RadioGroup value={selectedLanguage} onValueChange={handleLanguageChange} className="space-y-3">
        <div className="flex items-center space-x-2 rounded-md border p-4">
          <RadioGroupItem value="system" id="system" />
          <Label htmlFor="system" className="flex-1">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span>{t("settings.language.system")}</span>
            </div>
          </Label>
        </div>

        {availableLanguages.map((language) => (
          <div key={language.code} className="flex items-center space-x-2 rounded-md border p-4">
            <RadioGroupItem value={language.code} id={language.code} />
            <Label htmlFor={language.code} className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LanguageFlag languageCode={language.code} />
                  <span>{language.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{language.nativeName}</span>
              </div>
            </Label>
            {currentLanguage.code === language.code && <Check className="h-5 w-5 text-primary" />}
          </div>
        ))}
      </RadioGroup>

      <Button onClick={handleSave} className="w-full">
        {t("settings.save")}
      </Button>
    </div>
  )
}
