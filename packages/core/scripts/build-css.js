import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const files = [
  ['src/global/core.scss', 'dist-styles/core.css'],
  ['src/global/scania.scss', 'dist-styles/scania.css'],
  ['src/global/scania-variables.scss', 'dist-styles/scania-variables.css'],
  ['src/global/traton.scss', 'dist-styles/traton.css'],
  ['src/global/traton-variables.scss', 'dist-styles/traton-variables.css'],
];

const watch = process.argv.includes('--watch');
const sassCmd = process.platform === 'win32' ? 'sass.cmd' : 'sass';

const generateSourceMaps = false; // Toggle for CSS source maps

const args = [];
if (!generateSourceMaps) args.push('--no-source-map');
files.forEach(([src, dest]) => {
  args.push(`${path.join(dirname, '..', src)}:${path.join(dirname, '..', dest)}`);
});
if (watch) args.unshift('--watch');

const sass = spawn(sassCmd, args, { stdio: 'inherit' });

sass.on('close', (code) => {
  process.exit(code ?? 0);
});
