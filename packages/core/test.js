import { execSync } from 'child_process';
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
const command = `docker run --rm --network host -v ${pwd}:/work/ -w /work/ mcr.microsoft.com/playwright:v1.39.0-jammy /bin/bash -c "npm install && npx playwright test && exit"`;

execSync(command, { stdio: 'inherit' });
