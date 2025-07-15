import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

interface PrepareSourceOptions {
  sourceRoot: string;
  outputDir: string;
  version: string;
}

async function countComponents(componentsDir: string): Promise<number> {
  if (!(await fs.pathExists(componentsDir))) {
    return 0;
  }

  const entries = await fs.readdir(componentsDir, { withFileTypes: true });

  const dirEntries = entries.filter((entry) => entry.isDirectory());

  const counts = await Promise.all(
    dirEntries.map(async (entry) => {
      const componentDir = path.join(componentsDir, entry.name);
      const tsxFiles = await fs
        .readdir(componentDir)
        .then((files) => files.filter((file) => file.endsWith('.tsx')))
        .catch(() => []);
      return tsxFiles.length > 0 ? 1 : 0;
    }),
  );

  return counts.reduce((sum, val) => sum + val, 0);
}

async function copySourceFiles(options: PrepareSourceOptions): Promise<void> {
  const { sourceRoot, outputDir, version } = options;

  console.log(`📦 Preparing Tegel source v${version} for CLI package...`);

  // Ensure output directory exists
  await fs.ensureDir(outputDir);

  // Source paths in the core package
  const sourcePaths = {
    components: path.join(sourceRoot, 'src', 'components'),
    utils: path.join(sourceRoot, 'src', 'utils'),
    mixins: path.join(sourceRoot, 'src', 'mixins'),
    global: path.join(sourceRoot, 'src', 'global'),
    types: path.join(sourceRoot, 'src', 'types'),
  };

  // Copy each source directory
  await Promise.all(
    Object.entries(sourcePaths).map(async ([name, sourcePath]) => {
      if (await fs.pathExists(sourcePath)) {
        const destPath = path.join(outputDir, name);
        console.log(`  📁 Copying ${name}...`);

        await fs.copy(sourcePath, destPath, {
          filter: (src) => {
            const relativePath = path.relative(sourcePath, src);

            // Skip test directories and files
            if (relativePath.includes('/test/') || relativePath.includes('\\test\\')) {
              return false;
            }

            // Skip story files
            if (relativePath.endsWith('.stories.ts') || relativePath.endsWith('.stories.tsx')) {
              return false;
            }

            // Skip readme files (but keep the top-level one in mixins)
            if (relativePath.toLowerCase().includes('readme') && name !== 'mixins') {
              return false;
            }

            return true;
          },
        });
      } else {
        console.log(`  ⚠️ Source path not found: ${sourcePath}`);
      }
    }),
  );

  // Create metadata file
  const metadata = {
    version,
    generatedAt: new Date().toISOString(),
    componentCount: await countComponents(path.join(outputDir, 'components')),
  };

  await fs.writeJSON(path.join(outputDir, 'metadata.json'), metadata, { spaces: 2 });

  console.log(`✅ Source preparation complete!`);
  console.log(`  📦 Version: ${version}`);
  console.log(`  🧩 Components: ${metadata.componentCount}`);
}

async function main(): Promise<void> {
  try {
    // Get CLI package directory
    const cliPackageDir = path.resolve(dirName, '..');

    // Locate the core package (assuming monorepo structure)
    const corePackageDir = path.resolve(cliPackageDir, '..', 'core');
    const corePackageJson = path.join(corePackageDir, 'package.json');

    if (!(await fs.pathExists(corePackageJson))) {
      throw new Error(`Core package not found at: ${corePackageDir}`);
    }

    // Read core package version
    const corePackage = await fs.readJSON(corePackageJson);
    const { version } = corePackage;

    // Prepare source files
    const outputDir = path.join(cliPackageDir, 'tegel-source');

    await copySourceFiles({
      sourceRoot: corePackageDir,
      outputDir,
      version,
    });
  } catch (error) {
    console.error('❌ Failed to prepare Tegel source:', error);
    process.exit(1);
  }
}

main();
