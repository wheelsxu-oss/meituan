import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const startPort = Number(process.env.PORT || 4173);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jsx": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8"
};

function safePath(urlPath) {
  const pathname = decodeURIComponent(urlPath.split("?")[0]);
  const target = pathname === "/" ? "index.html" : pathname.replace(/^\//, "");
  const resolved = path.resolve(rootDir, target);
  if (!resolved.startsWith(rootDir)) {
    return null;
  }
  return resolved;
}

const server = http.createServer(async (request, response) => {
  const filePath = safePath(request.url || "/");
  if (!filePath || !existsSync(filePath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const fileStat = await stat(filePath);
  if (fileStat.isDirectory()) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Directory listing is disabled");
    return;
  }

  response.writeHead(200, {
    "Cache-Control": "no-store",
    "Content-Type":
      contentTypes[path.extname(filePath)] || "application/octet-stream"
  });

  createReadStream(filePath).pipe(response);
});

function listen(candidatePort) {
  server.once("error", (error) => {
    if (error && typeof error === "object" && "code" in error && error.code === "EADDRINUSE") {
      listen(candidatePort + 1);
      return;
    }

    throw error;
  });

  server.listen(candidatePort, "127.0.0.1", () => {
    console.log(`Prototype server running at http://127.0.0.1:${candidatePort}`);
  });
}

listen(startPort);
