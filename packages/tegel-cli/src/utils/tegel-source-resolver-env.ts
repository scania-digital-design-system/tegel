import path from 'path';
import fs from 'fs-extra';
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

/**
 * Alternative resolver using environment variable approach
 * This can be set during build time by tsup
 */
export async function resolveTegelSource(): Promise<TegelSourceInfo> {
  // Option 1: Use environment variable set at build time
  const cliPackageDir =
    process.env.TEGEL_CLI_PACKAGE_DIR ||
    process.env.npm_package_json?.replace('/package.json', '') ||
    '';

  if (cliPackageDir) {
    // Try the bundled source first
    const copiedSourcePath = path.join(cliPackageDir, 'tegel-source');
    const metadataPath = path.join(copiedSourcePath, 'metadata.json');

    if (await fs.pathExists(metadataPath)) {
      logger.debug('Using copied Tegel source from env path');
      const metadata = await fs.readJSON(metadataPath);

      return {
        root: copiedSourcePath,
        componentsPath: path.join(copiedSourcePath, 'components'),
        utilsPath: path.join(copiedSourcePath, 'utils'),
        mixinsPath: path.join(copiedSourcePath, 'mixins'),
        globalPath: path.join(copiedSourcePath, 'global'),
        typesPath: path.join(copiedSourcePath, 'types'),
        version: metadata.version,
        isLocal: false,
      };
    }
  }

  // Option 2: Check if we're in development (monorepo)
  const tegelRoot = path.resolve(process.cwd(), '../..');
  const corePackagePath = path.join(tegelRoot, 'packages', 'core', 'package.json');

  if (await fs.pathExists(corePackagePath)) {
    logger.debug('Using local Tegel source (development mode)');
    const packageJson = await fs.readJSON(corePackagePath);

    return {
      root: tegelRoot,
      componentsPath: path.join(tegelRoot, 'packages', 'core', 'src', 'components'),
      utilsPath: path.join(tegelRoot, 'packages', 'core', 'src', 'utils'),
      mixinsPath: path.join(tegelRoot, 'packages', 'core', 'src', 'mixins'),
      globalPath: path.join(tegelRoot, 'packages', 'core', 'src', 'global'),
      typesPath: path.join(tegelRoot, 'packages', 'core', 'src', 'types'),
      version: packageJson.version,
      isLocal: true,
    };
  }

  throw new Error(
    'Could not find Tegel source. Make sure the CLI is properly built or run from within the Tegel repository.',
  );
}
