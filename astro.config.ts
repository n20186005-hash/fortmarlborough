import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Single source of truth for the public URL. Canonical tags, absolute Open Graph URLs,
// hreflang and the sitemap are only emitted when `site` is set, so the production
// domain is the default and SITE_URL stays available for preview/staging builds.
const site = process.env.SITE_URL?.trim() || "https://fortmarlborough.com";

export default defineConfig({
  site,
  output: "static",
  adapter: cloudflare(),
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "id",
        locales: {
          id: "id",
          en: "en",
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
});
