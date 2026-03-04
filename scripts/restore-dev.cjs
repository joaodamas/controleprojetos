const fs = require("fs");
const path = require("path");

const SRC = path.resolve(__dirname, "..", "src", "app.js");
const DEST = path.resolve(__dirname, "..", "public", "app.js");

console.log("Restaurando app.js de desenvolvimento (sem ofuscacao)...");
fs.copyFileSync(SRC, DEST);
console.log("[OK] public/app.js restaurado a partir de src/app.js");
