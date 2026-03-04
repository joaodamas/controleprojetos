const fs = require("fs");
const path = require("path");
const { minify } = require("terser");
const JavaScriptObfuscator = require("javascript-obfuscator");

const SRC = path.resolve(__dirname, "..", "src", "app.js");
const DEST = path.resolve(__dirname, "..", "public", "app.js");

async function build() {
  console.log("[1/3] Lendo source...");
  const source = fs.readFileSync(SRC, "utf8");
  console.log(`     ${(source.length / 1024).toFixed(0)} KB de codigo-fonte`);

  console.log("[2/3] Minificando com Terser...");
  const minified = await minify(source, {
    compress: {
      drop_console: false,
      drop_debugger: true,
      dead_code: true,
      passes: 2,
    },
    mangle: {
      toplevel: false,
      reserved: [
        "firebase", "firebaseConfig", "auth", "db",
        "state", "renderMain", "showSection",
      ],
    },
    format: {
      comments: false,
    },
  });

  if (minified.error) {
    console.error("Erro na minificacao:", minified.error);
    process.exit(1);
  }

  const minSize = (minified.code.length / 1024).toFixed(0);
  console.log(`     ${minSize} KB apos minificacao`);

  console.log("[3/3] Ofuscando com javascript-obfuscator...");
  const obfuscated = JavaScriptObfuscator.obfuscate(minified.code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.3,
    deadCodeInjection: false,
    debugProtection: true,
    debugProtectionInterval: 2000,
    disableConsoleOutput: false,
    identifierNamesGenerator: "hexadecimal",
    renameGlobals: false,
    selfDefending: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayEncoding: ["base64"],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersType: "function",
    stringArrayThreshold: 0.5,
    transformObjectKeys: false,
    unicodeEscapeSequence: false,
  });

  const finalCode = obfuscated.getObfuscatedCode();
  const finalSize = (finalCode.length / 1024).toFixed(0);

  fs.writeFileSync(DEST, finalCode, "utf8");
  console.log(`     ${finalSize} KB apos ofuscacao`);
  console.log(`\n[OK] Build de producao salvo em: public/app.js`);
  console.log(`     Reducao: ${source.length} -> ${finalCode.length} bytes`);
}

build().catch((err) => {
  console.error("Build falhou:", err);
  process.exit(1);
});
