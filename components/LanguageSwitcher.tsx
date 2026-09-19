"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { FiGlobe } from "react-icons/fi";

interface LanguageSwitcherProps {
  compact?: boolean;
}

const languages = [
  { code: "en", label: "English" },
  { code: "am", label: "Amharic" },
  { code: "so", label: "Somali" },
  { code: "pt", label: "Portuguese" },
  { code: "fr", label: "French" },
  { code: "ar", label: "Arabic" },
];

const LanguageSwitcher = ({ compact = false }: LanguageSwitcherProps) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage =
    languages.find((language) => language.code === locale) ?? languages[0];

  const handleChange = (nextLocale: string) => {
    setIsOpen(false);
    router.replace(pathname, { locale: nextLocale });
  };

  if (compact) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-label="Select language"
          aria-expanded={isOpen}
          title="Select language"
          className="flex h-10 w-10 items-center justify-center rounded-full text-secondary-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95"
        >
          <FiGlobe
            size={21}
            className="transition-transform duration-200 hover:rotate-12"
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-14 z-[110] min-w-[160px] overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-lg">
            {languages.map((language) => {
              const isActive = language.code === locale;

              return (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => handleChange(language.code)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span>{language.label}</span>

                  {isActive && (
                    <span className="text-xs text-primary">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Select language"
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-secondary-foreground transition-all hover:bg-muted hover:text-foreground"
      >
        <span className="flex items-center gap-3">
          <FiGlobe
            size={21}
            className="shrink-0 transition-transform duration-200 group-hover:rotate-12"
          />

          <span>{currentLanguage.label}</span>
        </span>

        <span className="text-xs text-muted-foreground">
          {locale.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="mt-1 space-y-1 rounded-xl border border-border bg-muted/30 p-1.5">
          {languages.map((language) => {
            const isActive = language.code === locale;

            return (
              <button
                key={language.code}
                type="button"
                onClick={() => handleChange(language.code)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-background font-medium text-foreground"
                    : "text-muted-foreground hover:bg-background hover:text-foreground"
                }`}
              >
                <span>{language.label}</span>

                {isActive && (
                  <span className="text-xs text-primary">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;