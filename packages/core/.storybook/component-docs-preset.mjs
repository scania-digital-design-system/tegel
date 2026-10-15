import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import { extractDocsSummary } from 'storybook/internal/toolsets-docs';

const coreDirectory = new URL('../', import.meta.url);

async function documentationManifests(existing = {}) {
  // Cache within one request, so multiple table stories share a read and later
  // manifest requests still pick up README changes without restarting Storybook.
  const readmes = new Map();
  function loadReadme(file) {
    if (!readmes.has(file)) {
      readmes.set(
        file,
        readFile(new URL(file, coreDirectory), 'utf8').catch((error) => {
          if (error.code === 'ENOENT') return undefined;
          throw error;
        }),
      );
    }
    return readmes.get(file);
  }

  const readmeFiles = (
    await glob(
      ['src/tegel-lite/components/**/readme.md', 'src/tegel-lite/components/**/notes/*.md'],
      {
        cwd: fileURLToPath(coreDirectory),
        ignore: ['**/_beta/**'],
      },
    )
  ).sort();

  // Excludes all MDX files except the ones in /src/stories
  const isManifestDoc = (doc) => {
    const file = (doc.path ?? doc.importPath ?? '').replaceAll('\\', '/').replace(/^\.\//, '');

    // Keep documentation MDX from src/stories.
    if (file.startsWith('src/stories/') && file.endsWith('.mdx')) {
      return true;
    }

    return false;
  };

  const docs = Object.fromEntries(
    Object.entries(existing.docs?.docs ?? {}).filter(([, doc]) => isManifestDoc(doc)),
  );

  const notesByReadme = new Map();
// Iterates over all Tegel Lite's README files to include them in the docs
  for (const file of readmeFiles) {
    if (notesByReadme.has(file)) continue;

    const content = await loadReadme(file);
    if (!content) continue;
    const relativeDirectory = path.posix.relative(
      'src/tegel-lite/components',
      path.posix.dirname(file),
    );
    const id = `readme--${relativeDirectory.replaceAll('/', '--')}`;
    const doc = {
      id,
      name: relativeDirectory,
      path: file,
      content,
      summary: extractDocsSummary(content),
    };
    docs[id] = doc;
    notesByReadme.set(file, { [id]: doc });
  }

  return {
    ...existing,
    ...(existing.docs && { docs: { ...existing.docs, docs } }),
  };
}

export { documentationManifests as experimental_manifests };
