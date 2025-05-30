import React from 'react';
import { DocsContainer } from '@storybook/addon-docs';
import { defineCustomElements } from '../loader';
import { useDarkMode } from 'storybook-dark-mode';
import { addons } from '@storybook/addons';
import { UPDATE_GLOBALS, UPDATE_STORY_ARGS } from '@storybook/core-events';
import './preview.css';
import '../dist/tegel/tegel.css';

// https://github.com/storybookjs/storybook/issues/6364
// - Look for: sarangk-hotstar commented on 23 Jun 2021
// - Look for: Cochonours commented on 14 May
// Test below one in Netlify/Amplify build
import ScaniaThemeDark from './ScaniaThemeDark';
import ScaniaThemeLight from './ScaniaThemeLight';

// To be able to show version number in elegant way in storybook-version addon, more on line 157
import { version } from '../package.json';
const [major, minor, patch] = version.split('.');

const customViewports = {
  xs: {
    name: 'grid-xs',
    styles: {
      width: '607px',
      height: '963px',
    },
  },
  sm: {
    name: 'grid-sm',
    styles: {
      width: '608px',
      height: '963px',
    },
  },
  md: {
    name: 'grid-md',
    styles: {
      width: '800px',
      height: '801px',
    },
  },
  lg: {
    name: 'grid-lg',
    styles: {
      width: '992px',
      height: '1200px',
    },
  },
  xlg: {
    name: 'grid-xlg',
    styles: {
      width: '1184px',
      height: '1400px',
    },
  },
  xxlg: {
    name: 'grid-xxlg',
    styles: {
      width: '1367px',
      height: '1600px',
    },
  },
  max: {
    name: 'grid-max',
    styles: {
      width: '1584px',
      height: '1680px',
    },
  },
};

// Initialize brand state
if (typeof window !== 'undefined') {
  document.documentElement.classList.add('scania');
}

// Add decorator for brand classes
export const decorators = [
  (Story, context) => {
    const brand = context.globals.brand;

    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('scania', 'traton');
      document.documentElement.classList.add(brand);

      const { args } = context;
      const channel = addons.getChannel();

      // ONLY emit if args.brand is different
      if (args.brand !== brand) {
        channel.emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            brand: brand,
          },
        });
      }
    }

    return Story();
  },
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
  viewport: { viewports: customViewports },
  docs: {
    // Fix for dark mode not working on docs tab
    container: (props) => {
      const isDark = useDarkMode();

      const { id: storyId, storyById } = props.context;
      const {
        parameters: { docs = {} },
      } = storyById(storyId);
      docs.theme = isDark ? ScaniaThemeDark : ScaniaThemeLight;

      return React.createElement(DocsContainer, props);
    },
    source: {
      state: 'open',
    },
  },
  // storybook-dark-mode plugin
  darkMode: {
    current: 'light',
    // Override the default dark theme
    dark: ScaniaThemeDark,
    // Override the default light theme
    light: ScaniaThemeLight,
    darkClass: 'tds-mode-dark',
    lightClass: 'tds-mode-light',
    stylePreview: true,
  },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'grey-50',
        value: '#F9FAFB',
      },
      {
        name: 'white',
        value: '#FFFFFF',
      },
      {
        name: 'grey-900',
        value: '#1d2229',
      },
      {
        name: 'grey-958',
        value: '#0d0f13',
      },
    ],
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
        'Tegel light (CSS)',
      ],
    },
  },
  layout: 'padded',
  version: {
    major: `@scania/tegel: ${major}`,
    minor: minor,
    patch: patch,
    style: {
      'text-transform': 'unset',
      'font-size': '14px',
      'font-style': 'normal',
      'font-weight': '400',
      'line-height': '16px',
      'letter-spacing': '-0.14px',
      'margin-left': '16px',
      'background-color': '#2058A8',
      'color': '#ffffff',
      'border-radius': '16px',
      'padding': '4px 12px',
    },
  },
  globals: {
    brand: 'scania',
  },
  ...(process.env.STORYBOOK_ENV === 'dev' && {
    globalTypes: {
      brand: {
        name: 'Brand',
        description: 'Select brand',
        defaultValue: 'scania',
        toolbar: {
          icon: 'circlehollow',
          items: [
            { value: 'scania', title: 'Scania', icon: 'circlehollow' },
            { value: 'traton', title: 'Traton', icon: 'circlehollow' },
          ],
          title: 'Brand',
          dynamicTitle: true,
        },
      },
    },
  }),
};

// Below is some hacky code that changes selected background when the theme changes
// Inspiration links:
// https://github.com/storybookjs/storybook/issues/12982#issuecomment-865304427
// https://github.com/storybookjs/storybook/blob/9eeb6ddfdd09a64c554843380187d27a41a8a235/addons/backgrounds/src/containers/BackgroundSelector.tsx#L100
// https://github.com/hipstersmoothie/storybook-dark-mode/blob/bdb64ee8302bb95c23ebc2709ed3fe88431072f3/src/index.tsx
if (!window.TDS_DID_SUBSCRIBE_DARK_BG) {
  window.TDS_DID_SUBSCRIBE_DARK_BG = true;
  const darkModeBgColor = parameters.backgrounds.values.find(
    ({ name }) => name === 'grey-958',
  ).value;
  const lightModeBgColor = parameters.backgrounds.values.find(
    ({ name }) => name === 'grey-50',
  ).value;
  const channel = addons.getChannel();
  channel.emit(UPDATE_GLOBALS, {
    globals: { backgrounds: { value: lightModeBgColor } },
  });
  channel.on('DARK_MODE', (isDarkMode) => {
    if ((isDarkMode && !window.TDS_DARK_BG) || (!isDarkMode && window.TDS_DARK_BG)) {
      channel.emit(UPDATE_GLOBALS, {
        globals: {
          backgrounds: {
            value: isDarkMode ? darkModeBgColor : lightModeBgColor,
          },
        },
      });
      window.TDS_DARK_BG = isDarkMode;
    }
  });
}

defineCustomElements();
