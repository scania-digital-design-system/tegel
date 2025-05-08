import { defineCustomElements } from '../loader';
import type { Decorator, Preview } from '@storybook/html';
import ScaniaThemeDark from '../.storybook-old/ScaniaThemeDark';
import ScaniaThemeLight from '../.storybook-old/ScaniaThemeLight';
import { addons } from 'storybook/internal/preview-api';
import '../dist/tegel/tegel.css';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: false,
  },
};

const withTheme: Decorator = (StoryFn, context) => {
  const theme = context.globals.theme || 'light';

  document.body.classList.remove('tds-mode-light', 'tds-mode-dark');
  document.body.classList.add(`tds-mode-${theme}`);

  return StoryFn();
};

export const decorators = [withTheme];

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
      light: ScaniaThemeLight,
      dark: ScaniaThemeDark,
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
        ],
      },
    },
  },
  tags: ['autodocs'],
};

const channel = addons.getChannel();

channel.on('DARK_MODE', (isDarkMode) => {
  document.body.classList.remove('tds-mode-light', 'tds-mode-dark');
  document.body.classList.add(`tds-mode-${isDarkMode ? 'dark' : 'light'}`);
});
export default preview;

defineCustomElements();
