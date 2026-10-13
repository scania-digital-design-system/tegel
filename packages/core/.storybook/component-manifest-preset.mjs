import { readFile, writeFile } from 'node:fs/promises';

// Explicitly associate story files with custom elements.
// Paths are relative to packages/core.
const tegelComponents = [
  'tds-accordion',
  'tds-accordion-item',
  'tds-badge',
  'tds-banner',
  'tds-block',
  'tds-breadcrumbs',
  'tds-breadcrumb',
  'tds-button',
  'tds-card',
  'tds-checkbox',
  'tds-chip',
  'tds-datetime',
  'tds-divider',
  'tds-dropdown',
  'tds-dropdown-option',
  'tds-footer-group',
  'tds-footer-item',
  'tds-footer',
  'tds-header',
  'tds-core-header-item',
  'tds-header-brand-symbol',
  'tds-header-dropdown',
  'tds-header-dropdown-list',
  'tds-header-dropdown-list-item',
  'tds-header-dropdown-list-user',
  'tds-header-hamburger',
  'tds-header-item',
  'tds-header-launcher',
  'tds-header-launcher-button',
  'tds-header-launcher-grid',
  'tds-header-launcher-grid-item',
  'tds-header-launcher-grid-title',
  'tds-header-launcher-list',
  'tds-header-launcher-list-item',
  'tds-header-launcher-list-title',
  'tds-header-title',
  'tds-icon',
  'tds-link',
  'tds-message',
  'tds-modal',
  'tds-popover-canvas',
  'tds-popover-menu',
  'tds-popover-menu-item',
  'tds-radio-button',
  'tds-side-menu',
  'tds-side-menu-close-button',
  'tds-side-menu-collapse-button',
  'tds-side-menu-dropdown',
  'tds-side-menu-dropdown-list',
  'tds-side-menu-dropdown-list-item',
  'tds-side-menu-item',
  'tds-side-menu-overlay',
  'tds-side-menu-user',
  'tds-side-menu-user-image',
  'tds-side-menu-user-label',
  'tds-slider',
  'tds-slider',
  'tds-spinner',
  'tds-stepper',
  'tds-table',
  'tds-table-body',
  'tds-body-cell',
  'tds-table-body-input-wrapper',
  'tds-table-body-row',
  'tds-table-body-row-expandable',
  'tds-table-footer',
  'tds-table-header',
  'tds-header-cell',
  'tds-table-header-input-wrapper',
  'tds-table-toolbar',
  'tds-folder-tabs',
  'tds-folder-tab',
  'tds-inline-tabs',
  'tds-inline-tab',
  'tds-navigation-tabs',
  'tds-navigation-tab',
  'tds-tag',
  'tds-text-field',
  'tds-textarea',
  'tds-toast',
  'tds-toggle',
  'tds-tooltip',

  // 'src/tegel-lite/components/tl-accordion/tl-accordion.stories.tsx': 'tl-accordion',
  // 'src/tegel-lite/components/tl-badge/tl-badge.stories.tsx': 'tl-badge',
  // 'src/tegel-lite/components/tl-banner/tl-banner.stories.tsx': 'tl-banner',
  // 'src/tegel-lite/components/tl-block/tl-block-nested.stories.tsx': 'tl-block',
  // 'src/tegel-lite/components/tl-block/tl-block.stories.tsx': 'tl-block',
  // 'src/tegel-lite/components/tl-breadcrumbs/tl-breadcrumbs.stories.tsx': 'tl-breadcrumbs',
  // 'src/tegel-lite/components/tl-button/tl-button.stories.tsx': 'tl-button',
  // 'src/tegel-lite/components/tl-card/tl-card.stories.tsx': 'tl-card',
  // 'src/tegel-lite/components/tl-checkbox/tl-checkbox.stories.tsx': 'tl-checkbox',
  // 'src/tegel-lite/components/tl-chip/tl-chip.stories.tsx': 'tl-chip',
  // 'src/tegel-lite/components/tl-datetime/tl-datetime.stories.tsx': 'tl-datetime',
  // 'src/tegel-lite/components/tl-divider/tl-divider.stories.tsx': 'tl-divider',
  // 'src/tegel-lite/components/tl-dropdown/tl-dropdown.stories.tsx': 'tl-dropdown',
  // 'src/tegel-lite/components/tl-footer/tl-footer.stories.tsx': 'tl-footer',
  // 'src/tegel-lite/components/tl-header/tl-header.stories.tsx': 'tl-header',
  // 'src/tegel-lite/components/tl-icon/tl-icon.stories.tsx': 'tl-icon',
  // 'src/tegel-lite/components/tl-link/tl-link.stories.tsx': 'tl-link',
  // 'src/tegel-lite/components/tl-message/tl-message.stories.tsx': 'tl-message',
  // 'src/tegel-lite/components/tl-modal/tl-modal.stories.tsx': 'tl-modal',
  // 'src/tegel-lite/components/tl-popover-canvas/tl-popover-canvas.stories.tsx': 'tl-popover-canvas',
  // 'src/tegel-lite/components/tl-popover-menu/tl-popover-menu.stories.tsx': 'tl-popover-menu',
  // 'src/tegel-lite/components/tl-radio-button/tl-radio-button.stories.tsx': 'tl-radio-button',
  // 'src/tegel-lite/components/tl-side-menu/tl-side-menu.stories.tsx': 'tl-side-menu',
  // 'src/tegel-lite/components/tl-slider/tl-slider.stories.tsx': 'tl-slider', TODO add when slider is implemented
  // 'src/tegel-lite/components/tl-spinner/tl-spinner.stories.tsx': 'tl-spinner',
  // 'src/tegel-lite/components/tl-stepper/tl-stepper.stories.tsx': 'tl-stepper',
  // 'src/tegel-lite/components/tl-table/tl-table-component-basic.stories.tsx': 'tl-table',
  // 'src/tegel-lite/components/tl-table/tl-table-component-batch-actions.stories.tsx': 'tl-table',
  // 'src/tegel-lite/components/tl-table/tl-table-component-column-filtering.stories.tsx': 'tl-table',
  // 'src/tegel-lite/components/tl-table/tl-table-component-custom-width.stories.tsx': 'tl-table',
  // 'src/tegel-lite/components/tl-table/tl-table-component-editable-cells.stories.tsx': 'tl-table',
  // 'src/tegel-lite/components/tl-table/tl-table-component-expandable-rows.stories.tsx': 'tl-table',
  // 'src/tegel-lite/components/tl-table/tl-table-component-filtering.stories.tsx': 'tl-table',
  // 'src/tegel-lite/components/tl-table/tl-table-component-horizontal-scroll.stories.tsx': 'tl-table',
  // 'src/tegel-lite/components/tl-table/tl-table-component-multiselect.stories.tsx': 'tl-table',
  // 'src/tegel-lite/components/tl-table/tl-table-component-pagination.stories.tsx': 'tl-table',
  // 'src/tegel-lite/components/tl-table/tl-table-component-sorting.stories.tsx': 'tl-table',
  // 'src/tegel-lite/components/tl-table/tl-table-component-zebra.stories.tsx': 'tl-table',
  // 'src/tegel-lite/components/tl-tabs/tl-folder-tabs/tl-folder-tabs.stories.tsx': 'tl-folder-tabs',
  // 'src/tegel-lite/components/tl-tabs/tl-inline-tabs/tl-inline-tabs.stories.tsx': 'tl-inline-tabs',
  // 'src/tegel-lite/components/tl-tabs/tl-navigation-tabs/tl-navigation-tabs.stories.tsx': 'tl-navigation-tabs',
  // 'src/tegel-lite/components/tl-tag/tl-tag.stories.tsx': 'tl-tag',
  // 'src/tegel-lite/components/tl-text-field/tl-text-field.stories.tsx': 'tl-text-field',
  // 'src/tegel-lite/components/tl-textarea/tl-textarea.stories.tsx': 'tl-textarea',
  // 'src/tegel-lite/components/tl-toast/tl-toast.stories.tsx': 'tl-toast',
  // 'src/tegel-lite/components/tl-toggle/tl-toggle.stories.tsx': 'tl-toggle',
  // 'src/tegel-lite/components/tl-tooltip/tl-tooltip.stories.tsx': 'tl-tooltip',
];

function describeApi(element) {
  const sections = [
    ['Attributes and corresponding properties', element.attributes],
    ['Events', element.events],
    [
      'Methods',
      element.members.filter(
        (member) =>
          member.kind === 'method' &&
          member.privacy &&
          member.privacy !== 'private' &&
          !member.name.toLowerCase().includes('internal'),
      ),
    ],
    ['Slots', element.slots],
    ['CSS custom properties', element.cssProperties],
    ['CSS parts', element.cssParts],
  ];

  return sections
    .filter(([, entries]) => entries?.length)
    .map(
      ([title, entries]) =>
        `## ${title}\n\n\`\`\`json\n${JSON.stringify(entries, null, 2)}\n\`\`\``,
    )
    .join('\n\n');
}

// Only expose component identities and story references here. API documentation
// is attached from the notes/READMEs by component-docs-preset.mjs.
async function componentManifests(existing = {}, { manifestEntries = [] }) {
  const cem = JSON.parse(
    await readFile(new URL('../public/custom-elements.json', import.meta.url), 'utf8'),
  );

  const elements = new Map(
    cem.modules.flatMap((module) =>
      (module.declarations ?? [])
        .filter((declaration) => declaration.tagName)
        .map((declaration) => [declaration.tagName, { ...declaration, path: module.path }]),
    ),
  );

  const components = { ...(existing.components?.components ?? {}) };

  // const readmes = new Map();
  // function loadReadme(file) {
  //   if (!readmes.has(file)) {
  //     readmes.set(
  //       file,
  //       readFile(new URL(file, coreDirectory), 'utf8').catch((error) => {
  //         if (error.code === 'ENOENT') return undefined;
  //         throw error;
  //       }),
  //     );
  //   }
  //   return readmes.get(file);
  // }

  // const readmeFiles = (
  //   await glob('src/tegel-lite/components/**/readme.md', {
  //     cwd: fileURLToPath(coreDirectory),
  //     ignore: ['**/_beta/**'],
  //   })
  // ).sort();

  // const tegelLiteDocs = manifestEntries.filter(
  //   (entry) => entry.type === 'docs' && entry.id.startsWith('tegel-lite-'),
  // );
  // const notesByReadme = new Map();
  // await Promise.all(
  //   Object.entries(tegelLiteDocs).map(async (doc) => {
  //     co
  //     const file = doc.importPath?.replaceAll('\\', '/').replace(/^\.\//, '');
  //     if (!file?.startsWith('src/tegel-lite/components/') || !file.endsWith('.notes.mdx')) return;
  //     // if (!doc.content || !readmeImport.test(doc.content) || !doc.content.match(readmeWrapper)) {
  //     //   return;
  //     // }

  //     const componentId = doc.id.split('--')[0];

  //     const readmePath = path.posix.join(path.posix.dirname(file), 'readme.md');
  //     const readme = await loadReadme(readmePath);
  //     if (!readme) return;

  //     const content = `\n\n${readme.trim()}\n\n`;
  //     const enriched = {
  //       ...doc,
  //       name: doc.title ?? doc.name,
  //       path: file,
  //       renderer: 'html',
  //       content,
  //       // summary: extractDocsSummary(content),
  //     };
  //     // tegelLiteDocs[doc.id] = enriched;
  //     const notes = notesByReadme.get(readmePath) ?? {};
  //     notes[componentId] = enriched;
  //     notesByReadme.set(readmePath, notes);
  //   }),
  // );

  // for (const doc of manifestEntries) {
  //   if (doc.type !== 'docs' || !doc.importPath.endsWith('.notes.mdx')) continue;

  //   const file = doc.importPath.replaceAll('\\', '/').replace(/^\.\//, '');
  //   const tagName = notesElements[file];
  //   if (!tagName) continue;

  //   const element = elements.get(tagName);
  //   if (!element) {
  //     throw new Error(`CEM is missing ${tagName}, mapped from ${file}`);
  //   }

  //   const componentId = doc.id.split('--')[0];

  //   components[componentId] ??= {
  //     id: componentId,
  //     name: tagName,
  //     path: file,
  //     renderer: 'html',
  //     apiDescription: describeApi(element),
  //     jsDocTags: {},
  //     stories: [],
  //   };

  //   // // STORIES ARE NOT CORRECT
  //   // const component = components[componentId];
  //   // if (!component.stories.some((entry) => entry.id === doc.id)) {
  //   //   component.stories.push({
  //   //     id: doc.id,
  //   //     name: doc.name,
  //   //   });
  //   // }
  // }

  for (const tegelComponent of tegelComponents) {
    const element = elements.get(tegelComponent);
    if (!element) {
      throw new Error(`CEM is missing ${tagName}, mapped from ${tegelComponent}`);
    }

    components[tegelComponent] ??= {
      id: tegelComponent,
      name: element.name,
      path: element.path,
      renderer: 'html',
      description: element.description ?? "",
      apiDescription: describeApi(element),
      jsDocTags: {},
      stories: [],
    };
  }
// FIXME To delete this writeFile
  writeFile(
    '/Users/unjeo7c/Desktop/Scania/temp-tegel/tegel/packages/core/dummy-file-2.json',
    JSON.stringify(components),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    },
  );

  return {
    ...existing,
    components: {
      v: 0,
      components,
    },
  };
}

export { componentManifests as experimental_manifests };
