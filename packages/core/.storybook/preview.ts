/// <reference types="vite/client" />

import { defineCustomElements } from '../loader';
import type { Preview, Decorator } from '@storybook/html';
import { addons } from 'storybook/internal/preview-api';
import '../dist/tegel/tegel.css';
import './preview.css';
import { ScaniaDark, ScaniaLight } from './ScaniaLogotype';

const applyBackgroundColor = (brand: string, modeVariant: string, isDarkMode: boolean) => {
  const body = document.body;

  const backgrounds = {
    scania: {
      light: {
        primary: '#FFFFFF', // grey-00
        secondary: '#F6F7F9', // grey-50
      },
      dark: {
        primary: '#0B0C0F', // grey-950
        secondary: '#15181D', // grey-900
      },
    },
    traton: {
      light: {
        primary: '#FCFBF7',
        secondary: '#F6F3E9',
      },
      dark: {
        primary: '#001214',
        secondary: '#001D21',
      },
    },
  };

  const brandColors = backgrounds[brand]?.[isDarkMode ? 'dark' : 'light'];
  body.style.backgroundColor = brandColors?.[modeVariant] || '';
};

// Initialize dark mode listener after Storybook is ready
try {
  const channel = addons.getChannel();

  channel.on('DARK_MODE', (isDarkMode) => {
    const body = document.body;
    const brand = document.documentElement.classList.contains('traton') ? 'traton' : 'scania';
    const modeVariant = body.classList.contains('tl-mode-variant-secondary')
      ? 'secondary'
      : 'primary';

    // TESTING: Only tl-mode-* prefixes
    body.classList.remove('tds-mode-light', 'tds-mode-dark', 'tl-mode-light', 'tl-mode-dark');
    body.classList.add(`tl-mode-${isDarkMode ? 'dark' : 'light'}`);

    applyBackgroundColor(brand, modeVariant, isDarkMode);
  });
} catch (error) {
  // Channel might not be available during initial load
  console.warn('Storybook channel not available:', error);
}

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

// Toggle mode variant
const modeVariantTool = {
  modeVariant: {
    name: 'Mode Variant',
    description: 'Choose primary or secondary background color',
    defaultValue: 'primary',
    toolbar: {
      icon: 'switchalt',
      items: [
        { value: 'primary', title: 'Primary' },
        { value: 'secondary', title: 'Secondary' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

const toggleBrandDecorator: Decorator = (StoryFn, context) => {
  const { brand = context.globals.brand || 'scania', modeVariant = 'primary' } = context.globals;
  const html = document.documentElement;

  html.classList.remove('scania', 'traton');
  html.classList.add(brand);

  // TESTING: Only tl-mode-variant prefixes
  document.body.classList.remove(
    'tds-mode-variant-primary',
    'tds-mode-variant-secondary',
    'tl-mode-variant-primary',
    'tl-mode-variant-secondary',
  );
  document.body.classList.add(`tl-mode-variant-${modeVariant}`);

  const isDarkMode = document.body.classList.contains('tl-mode-dark');
  applyBackgroundColor(brand, modeVariant, isDarkMode);

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
      darkClass: 'tl-mode-dark',
      light: ScaniaLight,
      lightClass: 'tl-mode-light',
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
          ['Tegel Design System', 'Storybook 8'],
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

export const globalTypes = {
  ...toggleBrandTool,
  ...modeVariantTool,
};

export const decorators = [toggleBrandDecorator];
export default preview;
