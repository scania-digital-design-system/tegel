import { execFile } from 'child_process';
import path from 'path';

function toUnixPath(p) {
  // eslint-disable-next-line no-control-regex
  const isExtendedLengthPath = /^\\\\\?\\/.test(p);
  // eslint-disable-next-line no-control-regex
  const hasNonAscii = /[^\u0000-\u0080]+/.test(p);

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
  'mcr.microsoft.com/playwright:v1.45.1-jammy',
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
