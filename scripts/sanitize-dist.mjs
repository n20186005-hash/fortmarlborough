/**
 * Build guard: replace any adapter-generated wrangler.json in dist/client/ with an
 * authoritative copy derived from the project-root wrangler.jsonc. Cloudflare Pages CI
 * creates a redirect pointer (.wrangler/deploy/config.json) to dist/client/wrangler.json,
 * so the file must exist and contain the production-ready config.
 */
import { readFile, writeFile } from "node:fs/promises";

const jsoncPath = new URL("../wrangler.jsonc", import.meta.url);
const outputPath = new URL("../dist/client/wrangler.json", import.meta.url);

const jsonc = await readFile(jsoncPath, "utf8");
const stripped = jsonc
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/(?<!:)\/\/[^\n]*/g, "")
  .replace(/^\s*\n/gm, "");
JSON.parse(stripped);

await writeFile(outputPath, stripped);
