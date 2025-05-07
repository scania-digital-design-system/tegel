const order = [
  'Intro',
  [
    'Tegel Design System',
    'Installation',
    'Migrating from components v4',
    'Events',
    'Announcements',
  ],
  'Motions',
  'Foundations',
  'Utilities',
  'Patterns',
  'Components',
];

export const docs = {
  source: {
    type: 'dynamic',
  },
  canvas: {
    sourceState: 'shown',
  },
  controls: {
    expanded: true,
  },
};

export const options = {
  showPanel: true,
  showToolbar: true,
  enableShortcuts: false,
  storySort: {
    method: 'alphabetical',
    includeNames: true,
    order,
  },
};
