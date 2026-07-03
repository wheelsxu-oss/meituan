import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { transform } = require("sucrase");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "src", "runtime-app.jsx");
const outputPath = path.join(root, "dist", "app.js");

const source = fs.readFileSync(sourcePath, "utf8");
const result = transform(source, {
  transforms: ["jsx"]
});

fs.writeFileSync(outputPath, result.code, "utf8");
