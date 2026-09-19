import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "am", "so", "pt", "fr", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
});