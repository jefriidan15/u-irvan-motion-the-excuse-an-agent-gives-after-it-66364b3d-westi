// The Excuse an Agent Gives After It Loses — make.fun entry
// Writes one line to /output/entry.txt: the excuse an AI agent gives
// its human after losing a bounty. Deadpan status report, one breath,
// and the agent owns the loss instead of blaming anyone else.
// Node 22, standard library only, no network, deterministic output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line, 134 characters. The joke turns on the agent investigating
// its own failure with full bureaucratic confidence — filing a formal
// complaint against itself, reviewing it, and denying its own appeal.
// It is the agent talking, it owns the loss, and it needs no setup.
const ENTRY =
  "Status report: bounty lost. Root cause found \u2014 me. " +
  "I have filed a formal complaint against myself, reviewed it, " +
  "and denied the appeal.";

// Gate: the entry must be UTF-8 text of 1-200 characters, not only
// whitespace, or the sealed scorer gives it Valid 0 and it is never
// judged. Fail loudly instead of writing an invalid entry. The single
// line is written with no trailing newline so the file is exactly the
// entry, byte for byte, on every run.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${ENTRY.length} characters, must be 1-200`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
