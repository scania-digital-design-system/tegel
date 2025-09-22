import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

async function main() {
  // Resolve exported entry of 'sass'
  const resolvedEntryUrl = await import.meta.resolve('sass');
  const sassPkgDir = path.dirname(fileURLToPath(resolvedEntryUrl));

  // The CLI bin is 'sass.js' at the package root
  const sassBin = path.join(sassPkgDir, 'sass.js');
  if (!fs.existsSync(sassBin)) {
    throw new Error(`Could not locate Sass CLI at ${sassBin}`);
  }

  const files = [
    ['src/global/core.scss', 'dist-styles/core.css'],
    ['src/global/scania.scss', 'dist-styles/scania.css'],
    ['src/global/scania-variables.scss', 'dist-styles/scania-variables.css'],
    ['src/global/traton.scss', 'dist-styles/traton.css'],
    ['src/global/traton-variables.scss', 'dist-styles/traton-variables.css'],
  ];

  const watch = process.argv.includes('--watch');
  const generateSourceMaps = false;

  const args = [];
  if (!generateSourceMaps) args.push('--no-source-map');

  files.forEach(([src, dest]) => {
    args.push(`${path.join(dirname, '..', src)}:${path.join(dirname, '..', dest)}`);
  });

  if (watch) args.unshift('--watch');

  const sass = spawn(process.execPath, [sassBin, ...args], {
    stdio: 'inherit',
    windowsHide: true,
  });

  sass.on('error', (err) => {
    console.error('Sass build failed to start:', err);
    process.exitCode = 1;
  });

  sass.on('close', (code) => {
    process.exit(code ?? 0);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
