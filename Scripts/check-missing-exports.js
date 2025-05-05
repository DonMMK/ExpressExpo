const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../ExpressExpo-1/app'); // Update if your folder is different
const filesChecked = [];

function findTSXFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      findTSXFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      filesChecked.push(fullPath);
    }
  }
}

function checkDefaultExport(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content.includes('export default');
}

function main() {
  findTSXFiles(rootDir);

  const filesMissingExport = filesChecked.filter(file => !checkDefaultExport(file));

  if (filesMissingExport.length > 0) {
    console.log('⚠️  These files are missing a `export default`:\n');
    filesMissingExport.forEach(file => console.log(' -', file));
  } else {
    console.log('✅ All .tsx files have a default export.');
  }
}

main();
