import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import { extractDocsSummary } from 'storybook/internal/toolsets-docs';

const coreDirectory = new URL('../', import.meta.url);

// The component notes use this wrapper to render a generated Stencil README.
// Resolve that known pattern without evaluating MDX or importing component code.
const readmeImport = /^import readme from ['"]\.\/readme\.md\?raw['"];?\r?$/m;
const readmeWrapper = /<Markdown>\s*\{readme\}\s*<\/Markdown>/g;

async function documentationManifests(existing = {}) {
  console.log("======= EXISTING IN DOCS =======");
  console.log(existing);
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
    await glob(['src/tegel-lite/components/**/readme.md', 'src/tegel-lite/components/**/notes/*.md'], {
      cwd: fileURLToPath(coreDirectory),
      ignore: ['**/_beta/**'],
    })
  ).sort();

  const docs = { ...(existing.docs?.docs ?? {}) };
  const notesByReadme = new Map();
  await Promise.all(
    Object.entries(docs).map(async ([id, doc]) => {
      const file = doc.path?.replaceAll('\\', '/').replace(/^\.\//, '');
      if (!file?.startsWith('src/tegel-lite/components/') || !file.endsWith('.notes.mdx')) return;
      if (!doc.content || !readmeImport.test(doc.content) || !doc.content.match(readmeWrapper)) {
        return;
      }
      
      let readmePath = path.posix.join(path.posix.dirname(file), 'readme.md');
      // TODO this is hardcoded and should be fixed
      if(file.includes("tl-dropdown")) {
        readmePath = path.posix.join(path.posix.dirname(file), 'notes', file.includes("-select") ? 'readme-select.md' : 'readme-button.md');
      }
      const readme = await loadReadme(readmePath);
      if (!readme) return;

      const content = doc.content
        .replace(readmeImport, '')
        .replace(readmeWrapper, () => `\n\n${readme.trim()}\n\n`);
      const enriched = {
        ...doc,
        name: doc.title ?? doc.name,
        content,
        summary: extractDocsSummary(content),
      };
      docs[id] = enriched;
      const notes = notesByReadme.get(readmePath) ?? {};
      notes[id] = enriched;
      notesByReadme.set(readmePath, notes);
    }),
  );

  // Some children have a README but no MDX page (for example, popover-menu-item).
  // Give each such README its own discoverable docs entry, even without stories.
  for (const file of readmeFiles) {
    if (notesByReadme.has(file)) continue;
    const content = await loadReadme(file);
    if (!content) continue;
    const relativeDirectory = path.posix.relative('src/tegel-lite/components', path.posix.dirname(file));
    const id = `readme--${relativeDirectory.replaceAll('/', '--')}`;
    const doc = {
      id,
      name: `${relativeDirectory} README`,
      path: file,
      content,
      summary: extractDocsSummary(content),
    };
    docs[id] = doc;
    notesByReadme.set(file, { [id]: doc });
  }

  const components = { ...(existing.components?.components ?? {}) };
  for (const [id, component] of Object.entries(components)) {
    const file = component.path?.replaceAll('\\', '/').replace(/^\.\//, '');
    if (!file?.startsWith('src/tegel-lite/components/')) continue;

    // The story directory defines the family. Using the parent's README directory
    // would miss table siblings; using a tag prefix would miss names like body-cell.
    const familyDirectory = `${path.posix.dirname(file)}/`;
    const documentation = Object.assign(
      {},
      ...readmeFiles
        .filter((readmePath) => readmePath.startsWith(familyDirectory))
        .map((readmePath) => notesByReadme.get(readmePath)),
    );
    components[id] = {
      ...component,
      docs: { ...component.docs, ...documentation },
    };
  }

// FIXME To delete this writeFile
  if(existing.components) {
    writeFile(
     '/Users/unjeo7c/Desktop/Scania/temp-tegel/tegel/packages/core/dummy-file-4.json',
     JSON.stringify(existing.components?.components),
     (err) => {
       if (err) {
         console.error(err);
       } else {
         // file written successfully
       }
     },
   );
  }

  return {
    ...existing,
    ...(existing.components && { components: { ...existing.components, components } }),
    ...(existing.docs && { docs: { ...existing.docs, docs } }),
  };
}

export { documentationManifests as experimental_manifests };
