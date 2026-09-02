import { rm } from "node:fs/promises";
import path from "node:path";

const workspace = process.cwd();
const nextDirectory = path.join(workspace, ".next");
const devDirectory = path.join(nextDirectory, "dev");

if (path.dirname(devDirectory) !== nextDirectory) {
  throw new Error("Invalid Next.js development cache path");
}

try {
  await rm(devDirectory, { recursive: true, force: true });
} catch (error) {
  if (error instanceof Error && "code" in error && error.code === "EPERM") {
    throw new Error(
      "Unable to clean .next/dev. Stop the Next.js development server before building.",
    );
  }

  throw error;
}
