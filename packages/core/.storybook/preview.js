import { defineCustomElements } from '../loader';
import '../dist/tegel/tegel.css';

const preview = {
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },

    options: {
      showPanel: true,
      showToolbar: true,
      enableShortcuts: false,
      storySort: {
        method: 'alphabetical',
        includeNames: true,
        order: [
          'Intro',
          [
            'Tegel Design System',
            'Installation',
            ['Javascript'],
            'Migrating from components v4',
            'Events',
            'Announcements',
            ['Tegel', 'Prefix change'],
          ],
          'Motions',
          'Foundations',
          'Utilities',
          'Patterns',
          'Components',
        ],
      },
    },
  },
};

export default preview;

defineCustomElements();
