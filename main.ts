// The Meeting That Should Have Been an Email — make.fun entry
// Writes one single-line joke (1-200 chars) to /output/entry.txt.
//
// The joke: a meeting about an email ends by producing an email about
// the meeting about the email — the loop closes on itself, which is
// exactly how those meetings feel. The punchline lands on the last
// word: the email we were trying to escape is the meeting's only output.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const ENTRY =
  "We spent an hour in a meeting about the email, then agreed to send an email summarizing the meeting about the email.";

const outArg = process.argv[2];
const outDir = outArg ? resolve(outArg) : "/output";
const outFile = outArg && outArg.endsWith(".txt") ? outDir : resolve(outDir, "entry.txt");

if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}
// Gate check: one line only — a second line would fail the scorer.
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, ENTRY, "utf8");
console.log(`wrote ${outFile} (${ENTRY.length} characters)`);
