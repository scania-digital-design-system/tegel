import { writeFile } from 'node:fs/promises';
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

const projectManifest = await readProjectManifestOnly(projectPath);
const exportableManifest = await createExportableManifest(projectPath, projectManifest, {
  catalogs,
});

await writeFile(
  path.join(exportablePath, 'package.json'),
  JSON.stringify(exportableManifest, null, 2),
);
