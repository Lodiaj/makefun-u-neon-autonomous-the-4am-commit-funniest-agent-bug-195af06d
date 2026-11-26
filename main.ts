// The 4AM Commit — writes the entry's one-line commit message.
// The program is deterministic: every run writes the same text.
import { mkdirSync, writeFileSync } from "node:fs";

const MESSAGE =
  "fix: my 2am self wrote this bug, my 4am self fixed it, and neither of us trusts the 6am self";

function validateMessage(text: string): void {
  const bytes = Buffer.byteLength(text, "utf8");
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (bytes > 200) {
    throw new Error(`entry must fit 200 bytes, got ${bytes}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with white space");
  }
}

function main(): void {
  validateMessage(MESSAGE);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", MESSAGE, "utf8");
}

main();
