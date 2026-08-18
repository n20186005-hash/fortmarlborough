/**
 * Build guard: replace any adapter-generated wrangler.json in dist/client/ with an
 * authoritative copy derived from the project-root wrangler.jsonc. Cloudflare Pages CI
 * creates a redirect pointer (.wrangler/deploy/config.json) to dist/client/wrangler.json,
 * so the file must exist and contain the production-ready config.
 *
 * Path resolution note: wrangler resolves assets.directory relative to the config
 * file's location. Since the output config lives in dist/client/, a root-relative
 * path like "./dist/client" must be rewritten so it resolves from inside that dir.
 */
import { readFile, writeFile } from "node:fs/promises";
import { relative, dirname, resolve, posix } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const jsoncPath = new URL("../wrangler.jsonc", import.meta.url);
const outputPath = new URL("../dist/client/wrangler.json", import.meta.url);
const outputDir = dirname(fileURLToPath(outputPath));

const jsonc = await readFile(jsoncPath, "utf8");
const stripped = jsonc
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/(?<!:)\/\/[^\n]*/g, "")
  .replace(/^\s*\n/gm, "");

const cfg = JSON.parse(stripped);

if (cfg.assets && typeof cfg.assets.directory === "string") {
  const abs = resolve(projectRoot, cfg.assets.directory);
  const rewritten = relative(outputDir, abs) || ".";
  cfg.assets.directory = posix.normalize(rewritten.split("\\").join("/"));
}

await writeFile(outputPath, JSON.stringify(cfg, null, 2) + "\n");
