import fs from "fs";
import path from "path";

const extensions = new Set([".tsx", ".jsx"]);
const sourceDirectories = ["app", "components"];
const writeChanges = process.argv.includes("--write");

let changedFiles = 0;
let changedComments = 0;

function cleanFile(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  let commentsInFile = 0;

  // Convert only decorative three-line JSX separator blocks. All other JSX
  // comments are intentionally preserved.
  const cleanedCode = code.replace(
    /^(\s*)\{\/\*\s*[-=]+\s*\*\/\}\r?\n\s*\{\/\*\s*(.*?)\s*\*\/\}\r?\n\s*\{\/\*\s*[-=]+\s*\*\/\}/gm,
    (match, indentation, label) => {
      const normalizedLabel = label.replace(/\s+/g, " ").trim();

      if (!normalizedLabel) return match;

      commentsInFile += 1;
      return `${indentation}{/*===== ${normalizedLabel} =====*/}`;
    },
  );

  if (cleanedCode === code) return;

  changedFiles += 1;
  changedComments += commentsInFile;

  if (writeChanges) {
    fs.writeFileSync(filePath, cleanedCode, "utf8");
    console.log(`Cleaned ${path.relative(process.cwd(), filePath)}`);
  }
}

function walk(directory) {
  if (!fs.existsSync(directory)) return;

  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, item.name);

    if (item.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (extensions.has(path.extname(item.name))) cleanFile(fullPath);
  }
}

for (const directory of sourceDirectories) {
  walk(path.join(process.cwd(), directory));
}

const mode = writeChanges ? "updated" : "would update";
console.log(`\n${changedFiles} file(s) ${mode}; ${changedComments} JSX comment block(s) found.`);

if (!writeChanges) {
  console.log("Run npm run clean:jsx-comments:write to apply these formatting-only changes.");
}
