import fs from "fs";
import path from "path";

const extensions = new Set([".tsx", ".jsx"]);
const sourceDirectories = ["app", "components"];
const writeChanges = process.argv.includes("--write");

let changedFiles = 0;
let changedTags = 0;

function cleanFile(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  let tagsInFile = 0;

  // Collapse only opening tags whose sole prop is a static className. Tags with
  // any other props, spread props, or dynamic className expressions stay intact.
  const cleanedCode = code.replace(
    /^(\s*)<([A-Za-z][\w.]*)\r?\n\s+(className="[^"]*")\r?\n\s*(\/?>)/gm,
    (match, indentation, tagName, className, closing) => {
      tagsInFile += 1;
      return `${indentation}<${tagName} ${className}${closing}`;
    },
  );

  if (cleanedCode === code) return;

  changedFiles += 1;
  changedTags += tagsInFile;

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
console.log(`\n${changedFiles} file(s) ${mode}; ${changedTags} JSX opening tag(s) found.`);

if (!writeChanges) {
  console.log("Run npm run clean:jsx-tags:write to apply these formatting-only changes.");
}
