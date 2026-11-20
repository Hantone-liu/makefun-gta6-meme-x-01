// Cover art meme entry: copy POST.json into the output directory.
//
// The grader runs this program twice with MAKEFUN_BOT_DIR set to the
// repository root and MAKEFUN_OUTPUT_DIR set to a fresh output directory.
// It reads nothing but POST.json from the repository and writes nothing
// but a copy of it, so the two runs produce the same bytes.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

const source = join(botDir, "POST.json");
if (!existsSync(source)) {
  throw new Error(`POST.json not found in ${botDir}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "POST.json"));
