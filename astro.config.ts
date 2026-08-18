import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Single source of truth for the public URL. Leave SITE_URL empty until a domain is assigned.
const site = process.env.SITE_URL?.trim() || undefined;

export default defineConfig({
  site,
  output: "static",
  adapter: cloudflare(),
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
});
