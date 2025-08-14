import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const require = createRequire(import.meta.url);

const files = [
  ['src/global/core.scss', 'dist-styles/core.css'],
  ['src/global/scania.scss', 'dist-styles/scania.css'],
  ['src/global/scania-variables.scss', 'dist-styles/scania-variables.css'],
  ['src/global/traton.scss', 'dist-styles/traton.css'],
  ['src/global/traton-variables.scss', 'dist-styles/traton-variables.css'],
];

const watch = process.argv.includes('--watch');
const nodeBin = process.execPath;
const sassBin = require.resolve('sass/bin/sass.js'); // resolve from local node_modules

const generateSourceMaps = false; // Toggle for CSS source maps

const args = [];
if (!generateSourceMaps) args.push('--no-source-map');

files.forEach(([src, dest]) => {
  const srcPath = path.join(dirname, '..', src);
  const destPath = path.join(dirname, '..', dest);
  args.push(`${srcPath}:${destPath}`);
});

if (watch) args.unshift('--watch');

// No shell: avoids injection; still works on Windows
const sass = spawn(nodeBin, [sassBin, ...args], {
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
