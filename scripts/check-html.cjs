const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const IGNORE_DIRS = new Set(["node_modules", ".git", "dist", "build", ".next"]);

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);

    if (st.isDirectory()) {
      if (!IGNORE_DIRS.has(name)) walk(p, out);
      continue;
    }

    if (p.toLowerCase().endsWith(".html")) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
let ok = true;

for (const f of files) {
  const c = fs.readFileSync(f, "utf8");
  const matches = c.match(/<!doctype\\s+html\\b/gi) || [];
  if (matches.length > 1) {
    console.error(`ERRO: ${path.relative(ROOT, f)} tem ${matches.length} <!DOCTYPE html>`);
    ok = false;
  }
}

if (!ok) process.exit(1);
console.log(`OK: ${files.length} HTML(s) verificados — nenhum com múltiplos <!DOCTYPE html>.`);

