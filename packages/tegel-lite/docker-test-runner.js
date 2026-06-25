import { execFile } from 'child_process';
import path from 'path';

// Runs the tegel-lite Playwright screenshot tests inside the pinned Playwright
// container, mirroring packages/core/docker-test-runner.js. The baselines are
// generated on Linux with maxDiffPixels: 0, so the tests must run in the
// container — running them on the host (macOS) produces sub-pixel diffs.
// dist/ must already be built (npm run build:tegel-lite).

function toUnixPath(p) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(p);
  const hasNonAscii = [...p].some((ch) => ch.charCodeAt(0) > 0x80);

  if (isExtendedLengthPath || hasNonAscii) {
    return p;
  }

  return p
    .replace(/\\/g, '/')
    .replace(/^(.*?):\//, '/$1/')
    .replace(/\/\/+/g, '/');
}

const pwd = toUnixPath(path.resolve(process.cwd()));
const command = 'docker';
const args = [
  'run',
  '--rm',
  '--network',
  'host',
  '-v',
  `${pwd}:/work/`,
  '-w',
  '/work/',
  'mcr.microsoft.com/playwright:v1.60.0-jammy',
  '/bin/bash',
  '-c',
  'npx playwright test && exit',
];

// Check if Docker is running
execFile('docker', ['info'], (infoError) => {
  if (infoError) {
    console.error('It looks like Docker is not running. Please start Docker and try again.');
    process.exit(1);
  } else {
    // Docker is running, proceed with the original command
    execFile(command, args, (runError, stdout) => {
      if (runError) {
        console.error(stdout);
        process.exit(1);
      }
      console.log(stdout);
    });
  }
});
