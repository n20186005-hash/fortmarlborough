/**
 * Tide Archive build guard: remove adapter-generated development config from public assets.
 * The deployable Worker configuration remains at the project root in wrangler.jsonc.
 */
import { rm } from "node:fs/promises";

await rm(new URL("../dist/client/wrangler.json", import.meta.url), { force: true });
