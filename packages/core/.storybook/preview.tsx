// .storybook/preview.tsx
import { defineCustomElements } from '../loader/index.js';
import '../dist/tegel/tegel.css';
import './preview.css';
import { Preview } from '@stencil/storybook-plugin';
import { themes } from 'storybook/internal/theming';
import { ScaniaDark, ScaniaLight } from './ScaniaLogotype.js';
import { withThemeByClassName } from '@storybook/addon-themes';

/**
 * Registers all custom elements in the Storybook preview.
 * This is useful if your components rely on other nested Stencil components.
 */
defineCustomElements();

const preview: Preview = {
  parameters: {
    darkMode: {
      // Override the default dark theme
      dark: { ...themes.dark, ...ScaniaDark },
      // Override the default light theme
      light: { ...themes.normal, ...ScaniaLight },
    },
    a11y: {
      test: 'todo',
    },
  },
  tags: ['autodocs'],
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'tds-mode-dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
