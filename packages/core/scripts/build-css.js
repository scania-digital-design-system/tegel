import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  ['src/global/core.scss', 'dist/tegel/core.css'],
  ['src/global/scania.scss', 'dist/tegel/scania.css'],
  ['src/global/scania-variables.scss', 'dist/tegel/scania-variables.css'],
  ['src/global/traton.scss', 'dist/tegel/traton.css'],
  ['src/global/traton-variables.scss', 'dist/tegel/traton-variables.css'],
];

const watch = process.argv.includes('--watch');
const sassCmd = process.platform === 'win32' ? 'sass.cmd' : 'sass';

const generateSourceMaps = false; // Toggle for CSS source maps

const args = [];
if (!generateSourceMaps) args.push('--no-source-map');
files.forEach(([src, dest]) => {
  args.push(path.join(__dirname, '..', src) + ':' + path.join(__dirname, '..', dest));
});
if (watch) args.unshift('--watch');

const sass = spawn(sassCmd, args, { stdio: 'inherit' });

sass.on('close', (code) => {
  process.exit(code ?? 0);
}); 