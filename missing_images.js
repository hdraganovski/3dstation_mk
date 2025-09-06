const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csv = fs.readFileSync('./src/data/products_mk.csv', 'utf8');
const { data: records } = Papa.parse(csv, {
  header: true,
  skipEmptyLines: true,
  trimHeaders: true,
});

const publicDir = path.resolve('./public');
const missing = [];

for (const row of records) {
  const mainImage = row.mainImage;
  const code = row.code;
  if (mainImage && !fs.existsSync(path.join(publicDir, mainImage))) {
    missing.push({ code, mainImage });
  }
}

console.log('Missing images:', missing);