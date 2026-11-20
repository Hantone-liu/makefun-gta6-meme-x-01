// Cover art meme entry: validate POST.json, then copy it into the output directory.
//
// The grader runs this program twice with MAKEFUN_BOT_DIR set to the
// repository root and MAKEFUN_OUTPUT_DIR set to a fresh output directory.
// It reads nothing but POST.json from the repository and writes nothing
// but a copy of it, so the two runs produce the same bytes.
//
// Before copying, POST.json is checked: it must parse as JSON, and its
// `url` must be a non-empty X post address of the form
// https://x.com/<handle>/status/<digits>. A bad file fails with one
// clear error line and nothing is copied.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const source = join(botDir, "POST.json");
if (!existsSync(source)) {
  fail(`POST.json not found in ${botDir}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(source, "utf8"));
} catch {
  fail("POST.json is not valid JSON");
}

const url =
  parsed !== null && typeof parsed === "object"
    ? (parsed as Record<string, unknown>).url
    : undefined;

if (
  typeof url !== "string" ||
  !/^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/\d+$/.test(url)
) {
  fail("POST.json url must be an https://x.com/<handle>/status/<digits> address");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "POST.json"));
