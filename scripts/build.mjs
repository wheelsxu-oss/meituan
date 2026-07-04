import path from "node:path";
import { fileURLToPath } from "node:url";
import { rollup } from "rollup";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const runtimeAliasPlugin = {
  name: "runtime-alias",
  resolveId(source) {
    if (source === "react/jsx-runtime" || source === "react/jsx-dev-runtime") {
      return path.join(root, "dist", "vendor", "react-jsx-runtime.js");
    }

    return null;
  }
};

const bundle = await rollup({
  input: path.join(root, "dist", "main.js"),
  plugins: [runtimeAliasPlugin]
});

await bundle.write({
  file: path.join(root, "dist", "bundle.js"),
  format: "iife",
  name: "MeituanPrototype"
});

await bundle.close();
