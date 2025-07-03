/// <reference types="vite/client" />

import { defineCustomElements } from '../loader';
import type { Preview, Decorator } from '@storybook/html';
import { addons } from 'storybook/internal/preview-api';
import '../dist/tegel/tegel.css';
import './preview.css';
import { ScaniaDark, ScaniaLight } from './ScaniaLogotype';

const channel = addons.getChannel();

channel.on('DARK_MODE', (isDarkMode) => {
  document.body.classList.remove('tds-mode-light', 'tds-mode-dark');
  document.body.classList.add(`tds-mode-${isDarkMode ? 'dark' : 'light'}`);
});

// DEV env for traton styles
const isDev = import.meta.env.VITE_STORYBOOK_ENV === 'dev';

// Toggle Brand
const toggleBrandTool = isDev
  ? {
      brand: {
        name: 'Brand',
        description: 'Switch between Scania and Traton themes',
        defaultValue: 'scania',
        toolbar: {
          icon: 'globe',
          items: [
            { value: 'scania', title: 'Scania' },
            { value: 'traton', title: 'TRATON' },
          ],
          showName: true,
          dynamicTitle: true,
        },
      },
    }
  : undefined;

const toggleBrandDecorator: Decorator = (StoryFn, context) => {
  const brand = context.globals.brand || 'scania';

  const html = document.documentElement;

  html.classList.remove('scania', 'traton');
  html.classList.add(brand);

  return StoryFn();
};

const tegelViewports = {
  desktopMax: {
    name: 'Desktop – Max',
    styles: {
      width: '1584px',
      height: '900px',
    },
  },
  desktopLarge: {
    name: 'Desktop – Large',
    styles: {
      width: '1376px',
      height: '900px',
    },
  },
  desktopMedium: {
    name: 'Desktop – Medium',
    styles: {
      width: '1184px',
      height: '900px',
    },
  },
  tabletLarge: {
    name: 'Tablet – Large',
    styles: {
      width: '992px',
      height: '900px',
    },
  },
  tabletMedium: {
    name: 'Tablet – Medium',
    styles: {
      width: '800px',
      height: '900px',
    },
  },
  tabletSmall: {
    name: 'Tablet – Small',
    styles: {
      width: '608px',
      height: '900px',
    },
  },
  mobile: {
    name: 'Mobile',
    styles: {
      width: '375px',
      height: '800px',
    },
  },
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
    viewport: {
      viewports: tegelViewports,
    },
    darkMode: {
      current: 'light',
      dark: ScaniaDark,
      darkClass: 'tds-mode-dark',
      light: ScaniaLight,
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
          ['Tegel Design System', 'Storybook 8', 'Traton README'],
          'Getting Started',
          ['*', 'Framework tips'],
          'Migration',
          'System Setup',
          'Announcements',
          'Motions',
          'Foundations',
          'Accessibility',
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
