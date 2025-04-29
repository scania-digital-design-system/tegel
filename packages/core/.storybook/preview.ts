import { defineCustomElements } from '../loader';
import type { Preview, Decorator } from '@storybook/html';
import { addons } from 'storybook/internal/preview-api';
import '../dist/tegel/tegel.css';
import './preview.css';

// Dark mode listener
const channel = addons.getChannel();

channel.on('DARK_MODE', (isDarkMode) => {
  document.body.classList.remove('tds-mode-light', 'tds-mode-dark');
  document.body.classList.add(`tds-mode-${isDarkMode ? 'dark' : 'light'}`);
});

// Toggle Brand
const toggleBrandTool = {
  brand: {
    name: 'Brand',
    description: 'Switch between Scania and Traton themes',
    defaultValue: 'scania',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'scania', title: 'Scania' },
        { value: 'traton', title: 'Traton' },
      ],
      showName: true,
    },
  },
};

const toggleBrandDecorator: Decorator = (StoryFn, context) => {
  const brand = context.globals.brand || 'scania';

  const html = document.documentElement;

  html.classList.remove('scania', 'traton');
  html.classList.add(brand);

  return StoryFn();
};

// Parameters
const preview: Preview = {
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
      canvas: {
        sourceState: 'shown',
      },
      controls: {
        expanded: true,
      },
    },
    darkMode: {
      current: 'light',
      darkClass: 'tds-mode-dark',
      lightClass: 'tds-mode-light',
    },
    options: {
      showPanel: true,
      showToolbar: true,
      enableShortcuts: false,
      storySort: {
        method: 'alphabetical',
        includeNames: true,
        order: [
          'Introduction',
          'Getting Started',
          'Installation',
          'Migration',
          'System Setup',
          'Announcements',
          'Motions',
          'Foundations',
          'Utilities',
          'Components',
          ['*', ['*', 'Docs', 'Notes']],
          'Patterns',
        ],
      },
    },
  },
  tags: ['autodocs'],
};

defineCustomElements();

export const globalTypes = toggleBrandTool;
export const decorators = [toggleBrandDecorator];
export default preview;
