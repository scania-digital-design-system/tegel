import { readFile, writeFile } from 'node:fs/promises';

// Array of all available Tegel components and sub-components
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
];

// Builds the DescribeApi using the element content from the custom-elements file 
function describeApi(element) {
  const sections = [
    ['Attributes and corresponding properties', element.attributes],
    ['Events', element.events],
    [
      'Methods',
      // exclude internal methods
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

async function componentManifests(existing = {}) {
  const cem = JSON.parse(
    await readFile(new URL('../public/custom-elements.json', import.meta.url), 'utf8'),
  );

  // gets the content from the custom-element files in the format [key: tagName, value: APIDescription]
  const elements = new Map(
    cem.modules.flatMap((module) =>
      (module.declarations ?? [])
        .filter((declaration) => declaration.tagName)
        .map((declaration) => [declaration.tagName, { ...declaration, path: module.path }]),
    ),
  );

  const components = { ...(existing.components?.components ?? {}) };
  // Iterates over tegelComponents to match with the tagName of each of the custom-elements and populates the components variable with API descriptions
  for (const tegelComponent of tegelComponents) {
    const element = elements.get(tegelComponent);
    if (!element) {
      throw new Error(`CEM is missing, mapped from ${tegelComponent}`);
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

  return {
    ...existing,
    components: {
      v: 0,
      components,
    },
  };
}

export { componentManifests as experimental_manifests };
