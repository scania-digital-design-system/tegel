import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const corePackagePath = join(__dirname, '../../core/package.json');
const distPackagePath = join(__dirname, '../dist/components/package.json');

const corePackage = JSON.parse(await readFile(corePackagePath, 'utf8'));
const distPackage = JSON.parse(await readFile(distPackagePath, 'utf8'));

distPackage.peerDependencies = {
  ...distPackage.peerDependencies,
  '@scania/tegel': corePackage.version,
};

await writeFile(distPackagePath, `${JSON.stringify(distPackage, undefined, 2)}\n`);
console.log(`patch-dist-package: rewrote @scania/tegel peer dependency to ${corePackage.version}`);
