import { copyFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { getCatalogsFromWorkspaceManifest } from '@pnpm/catalogs.config';
import { createExportableManifest } from '@pnpm/exportable-manifest';
import { findWorkspaceDir } from '@pnpm/find-workspace-dir';
import { readProjectManifestOnly } from '@pnpm/read-project-manifest';
import { readWorkspaceManifest } from '@pnpm/workspace.read-manifest';

const [projectDir, exportableDir] = process.argv.slice(2);

if (!projectDir || !exportableDir) {
  console.error('Usage: node create-exportable-manifest.mjs <projectDir> <exportableDir>');
  process.exit(1);
}

const cwd = process.cwd();
const workspaceDir = await findWorkspaceDir(cwd);

if (!workspaceDir) {
  console.error('Could not find a pnpm workspace');
  process.exit(1);
}

const workspaceManifest = await readWorkspaceManifest(workspaceDir);
const catalogs = getCatalogsFromWorkspaceManifest(workspaceManifest);

const projectPath = path.resolve(cwd, projectDir);
const exportablePath = path.resolve(cwd, exportableDir);

const projectManifestPath = path.join(projectPath, 'package.json');
const exportableManifestPath = path.join(exportablePath, 'package.json');
const backupManifestPath = path.join(projectPath, 'package.json.bak');

// Backup the original project manifest
await copyFile(projectManifestPath, backupManifestPath);

try {
  // Temporarily replace the project manifest with the exportable manifest,
  // so pnpm can resolve workspace dependencies / catalogs correctly
  await copyFile(exportableManifestPath, projectManifestPath);

  const projectManifest = await readProjectManifestOnly(projectPath);
  const exportableManifest = await createExportableManifest(projectPath, projectManifest, {
    catalogs,
  });

  // Write the exportable manifest back to the generated package
  await writeFile(exportableManifestPath, JSON.stringify(exportableManifest, null, 2));
} finally {
  // Restore the original project manifest and remove the backup
  await copyFile(backupManifestPath, projectManifestPath);
  await rm(backupManifestPath, { force: true });
}
