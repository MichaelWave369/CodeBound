import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";

const ROOT = resolve(process.cwd());
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".json": "application/json", ".webmanifest": "application/manifest+json", ".txt": "text/plain" };
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (pathname.includes("\\") || pathname.includes("\0")) throw new Error("Invalid path");
    const target = resolve(ROOT, "." + (pathname.endsWith("/") ? pathname + "index.html" : pathname));
    if (target !== ROOT && !target.startsWith(ROOT + sep)) throw new Error("Outside repository");
    if ((await stat(target)).isDirectory()) throw new Error("Not a file");
    const bytes = await readFile(target);
    res.writeHead(200, { "Content-Type": TYPES[extname(target)] || "application/octet-stream", "X-Content-Type-Options": "nosniff", "Cache-Control": "no-cache" });
    res.end(bytes);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" }); res.end("Not found");
  }
}).listen(4173, "127.0.0.1", () => console.log("CodeBound at http://localhost:4173"));
