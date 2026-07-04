import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const requiredFiles = [
  "index.html",
  "dist/bundle.js",
  "dist/styles.css",
  "src/App.tsx",
  "src/data/prototypeData.ts",
  "vendor/framer-motion.js",
  "vendor/react-dom.production.min.js",
  "vendor/react.production.min.js"
];

const missing = requiredFiles.filter(
  (file) => !fs.existsSync(path.resolve(rootDir, file))
);

if (missing.length > 0) {
  console.error("Missing required prototype files:");
  for (const file of missing) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log("Prototype validation passed.");
