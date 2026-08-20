import fs from "fs";
import path from "path";

const extensions = new Set([".tsx", ".ts", ".jsx", ".js"]);
const sourceDirectories = ["app", "components", "hooks", "lib"];
const writeChanges = process.argv.includes("--write");

let changedFiles = 0;
let changedClassNames = 0;

function cleanFile(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  let classNamesInFile = 0;

  // Only normalize static, multiline className strings. Dynamic expressions,
  // template literals, and all non-className content are intentionally left as-is.
  const cleanedCode = code.replace(
    /className="([^"\r\n]*(?:\r?\n)[^"]*)"/g,
    (match, classes) => {
      const normalizedClasses = classes.replace(/\s+/g, " ").trim();

      if (normalizedClasses === classes) return match;

      classNamesInFile += 1;
      return `className="${normalizedClasses}"`;
    },
  );

  if (cleanedCode === code) return;

  changedFiles += 1;
  changedClassNames += classNamesInFile;

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
console.log(`\n${changedFiles} file(s) ${mode}; ${changedClassNames} multiline className value(s) found.`);

if (!writeChanges) {
  console.log("Run npm run clean:classes:write to apply these formatting-only changes.");
}
