import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { logger } from '../core/logger';

export interface TegelSourceInfo {
  root: string;
  componentsPath: string;
  utilsPath: string;
  mixinsPath: string;
  globalPath: string;
  typesPath: string;
  version: string;
  isLocal: boolean;
}

export async function resolveTegelSource(): Promise<TegelSourceInfo> {
  const filename = fileURLToPath(import.meta.url);
  const dirName = path.dirname(filename);

  logger.debug(`Resolver filename: ${filename}`);
  logger.debug(`Resolver dirName: ${dirName}`);

  // We must be running from the dist directory
  // The file structure should be:
  // dist/
  //   ├── cli.js
  //   ├── chunk-*.js (this file after bundling)
  //   └── tegel-source/

  // Find the dist directory by looking for cli.js in the same directory or parent
  let distDir: string | null = null;

  // Check if we're directly in dist
  if (await fs.pathExists(path.join(dirName, 'cli.js'))) {
    distDir = dirName;
  } else if (await fs.pathExists(path.join(dirName, '..', 'cli.js'))) {
    // We might be in a subdirectory of dist (unlikely with current build)
    distDir = path.join(dirName, '..');
  }

  if (!distDir) {
    throw new Error(
      'CLI must be run from the built dist directory. ' +
        `Current directory: ${dirName}. ` +
        'Please run "npm run build" and use the CLI from the dist folder.',
    );
  }

  // Only look for tegel-source in the dist directory
  const bundledSourcePath = path.join(distDir, 'tegel-source');
  const metadataPath = path.join(bundledSourcePath, 'metadata.json');

  logger.debug(`Checking for bundled source at: ${bundledSourcePath}`);

  if (!(await fs.pathExists(bundledSourcePath))) {
    throw new Error(
      `Tegel source not found in dist directory at ${bundledSourcePath}. ` +
        'The CLI must be properly built. Please run "npm run build" to bundle the Tegel source files.',
    );
  }

  if (!(await fs.pathExists(metadataPath))) {
    throw new Error(
      `Tegel source metadata not found at ${metadataPath}. ` +
        'The bundled source appears to be incomplete. Please run "npm run build" again.',
    );
  }

  logger.debug('Using bundled Tegel source from dist');
  const metadata = await fs.readJSON(metadataPath);

  return {
    root: bundledSourcePath,
    componentsPath: path.join(bundledSourcePath, 'components'),
    utilsPath: path.join(bundledSourcePath, 'utils'),
    mixinsPath: path.join(bundledSourcePath, 'mixins'),
    globalPath: path.join(bundledSourcePath, 'global'),
    typesPath: path.join(bundledSourcePath, 'types'),
    version: metadata.version,
    isLocal: false,
  };
}
