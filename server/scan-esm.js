const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

function scanDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scanDir(filePath);
    } else if (file.endsWith('.js')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, i) => {
        if (/\b(import|export)\b/.test(line)) {
          console.log(`${filePath}:${i + 1} → ${line.trim()}`);
        }
      });
    }
  });
}

console.log('🔍 Scan des fichiers JS pour syntaxe ESM...\n');
scanDir(rootDir);
console.log('\n✅ Scan terminé.');
