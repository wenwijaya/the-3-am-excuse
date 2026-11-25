import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The 3 AM Excuse — one line in the voice of a hardware wallet that
// refuses to sign a transaction at 3 AM. Personality: a vault with a
// bedtime. Reason: its keys lock at midnight. Joke: the only thing it
// will sign at 3 AM is a noise complaint against its owner's thumb.
// The line is 129 characters: one breath, no explanation of its own joke.
const LINE =
  "I am a vault with a bedtime: my keys lock at midnight, and at 3 AM the only thing I sign is a noise complaint against your thumb.";

function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  try {
    mkdirSync(outDir, { recursive: true });
    const text = LINE.trim();
    if (text.length < 1 || text.length > 200) {
      throw new Error(`line must be 1-200 chars, got ${text.length}`);
    }
    writeFileSync(join(outDir, "entry.txt"), text + "\n", "utf8");
  } catch (err) {
    console.error("render failed:", err);
    try {
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, "entry.txt"), LINE.trim() + "\n", "utf8");
    } catch {
      // Nothing more we can do; still exit 0 per the entry contract.
    }
  }
}

main();
