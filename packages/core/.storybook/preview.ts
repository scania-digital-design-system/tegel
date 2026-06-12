/// <reference types="vite/client" />

import { defineCustomElements } from '../loader';
import type { Preview, Decorator } from '@storybook/html';
import { addons } from 'storybook/internal/preview-api';
import '../dist/tegel/tegel.css';
// Tegel Lite styles:
// - dev (VITE_STORYBOOK_ENV=dev): compile from local source so in-progress and
//   un-shipped tl-* components render and reflect live edits.
// - production: consume the published @scania/tegel-lite package, so the deployed
//   Storybook shows exactly what consumers get. Production only renders shipped
//   components (see .storybook/main.ts), which matches the package's components.css.
if (import.meta.env.VITE_STORYBOOK_ENV === 'dev') {
  await import('../src/global/tegel-lite-components.scss');
} else {
  await import('@scania/tegel-lite/scania-variables.css');
  await import('@scania/tegel-lite/traton-variables.css');
  await import('@scania/tegel-lite/global.css');
  await import('@scania/tegel-lite/components.css');
}
import './preview.css';
import { ScaniaDark, ScaniaLight } from './ScaniaLogotype';

// Initialize dark mode listener after Storybook is ready
try {
  const channel = addons.getChannel();

  channel.on('DARK_MODE', (isDarkMode) => {
    const body = document.body;

    body.classList.remove('tds-mode-light', 'tds-mode-dark');
    body.classList.add(`tds-mode-${isDarkMode ? 'dark' : 'light'}`);
  });
} catch (error) {
  // Channel might not be available during initial load
  console.warn('Storybook channel not available:', error);
}

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
        { value: 'traton', title: 'TRATON' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

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

  document.body.classList.remove('tds-mode-variant-primary', 'tds-mode-variant-secondary');
  document.body.classList.add(`tds-mode-variant-${modeVariant}`);

  const story = StoryFn();
  // Return a string so Storybook takes the innerHTML + simulatePageLoad code
  // path in @storybook/html's renderToCanvas. That revives <script> tags in
  // the story HTML (otherwise they're inert and demo JS in tegel-lite
  // stories like accordion/dropdown/modal never executes).
  if (typeof story === 'string') {
    return `<div class="tds-mode-variant-${modeVariant}">${story}</div>`;
  }
  const wrapper = document.createElement('div');
  wrapper.classList.add(`tds-mode-variant-${modeVariant}`);
  wrapper.appendChild(story);
  return wrapper;
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
