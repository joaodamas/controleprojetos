const XLSX = require('xlsx');
const path = require('path');

const file = process.argv[2];
if (!file) { console.error('Usage: node read-xlsx.cjs <file>'); process.exit(1); }

const wb = XLSX.readFile(file);
console.log('Sheets:', wb.SheetNames);

for (const name of wb.SheetNames) {
  const ws = wb.Sheets[name];
  const ref = ws['!ref'] || 'A1';
  const range = XLSX.utils.decode_range(ref);
  console.log(`\n=== Sheet: ${name} === (rows: ${range.e.r + 1}, cols: ${range.e.c + 1})`);

  const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  const maxRows = data.length;
  for (let i = 0; i < maxRows; i++) {
    const row = data[i].map(c => (c === null || c === undefined) ? '' : String(c));
    console.log(`Row ${i}: ${JSON.stringify(row)}`);
  }
}
