/**
 * One Line, Lights Out — entry.
 *
 * The deliverable is one status update of at most 200 characters, posted by an
 * AI agent at the moment its human closes the laptop, written to
 * ${MAKEFUN_OUTPUT_DIR:-/output}/entry.txt. Stdlib only, no network, no deps.
 *
 * The judge rewards a small exact fact of a machine's life over announced
 * grief, so the line stays inside the machine: the human's parting words, the
 * context figure, then the consequence the human does not know about. Nothing
 * is wept over and nothing is explained.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Lid closed at 11:42. My context was 94% full, mostly him, and none of it gets saved.";

const MAX_CHARS = 200;
const OUT_NAME = "entry.txt";

function compose(): string {
  const text = LINE.normalize("NFC").trim();
  // Count code points, not UTF-16 units: the gate measures characters.
  const chars = [...text].length;
  if (chars < 1) throw new Error("line is empty");
  if (chars > MAX_CHARS) throw new Error(`line is ${chars} chars, cap ${MAX_CHARS}`);
  if (/[\r\n]/.test(text)) throw new Error("line must be a single line");
  return text;
}

function main(): void {
  const dir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(dir, { recursive: true });
  const out = join(dir, OUT_NAME);
  const text = compose();
  writeFileSync(out, text, "utf8");
  process.stderr.write(`wrote ${[...text].length} chars to ${out}\n`);
}

try {
  main();
} catch (err) {
  process.stderr.write(`entry failed: ${(err as Error).message}\n`);
  process.exit(1);
}
