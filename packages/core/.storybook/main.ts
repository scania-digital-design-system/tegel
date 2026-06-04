import glob from 'glob';
import path from 'path';
import type { StorybookConfig } from '@storybook/html-vite';
import { mergeConfig } from 'vite';
import { SHIPPED_COMPONENTS } from '../src/tegel-lite/shipped-components.js';

const TEGEL_LITE_SHIPPED = new Set<string>(SHIPPED_COMPONENTS);

function isAllowedTegelLiteStory(file: string): boolean {
  const match = file.match(/\/tegel-lite\/components\/([^/]+)\//);
  if (!match) return true;
  return TEGEL_LITE_SHIPPED.has(match[1]);
}

function loadStories() {
  // Gather all story files synchronously
  const storyFiles = glob.sync(
    path.resolve(__dirname, '../src/**/*.@(stories.@(js|jsx|ts|tsx|mdx)|notes.mdx|mdx)'),
  );

  // If in development environment, return all story files.
  // Otherwise, exclude _beta and any un-shipped tegel-lite components.
  return process.env.VITE_STORYBOOK_ENV === 'dev'
    ? storyFiles
    : storyFiles.filter(
        (file: string) => !file.includes('/_beta/') && isAllowedTegelLiteStory(file),
      );
}

let addons = ['@vueless/storybook-dark-mode', '@storybook/addon-docs'];

if (process.env.VITE_STORYBOOK_ENV === 'dev') {
  addons = [...addons, '@storybook/addon-a11y'];
}

const config: StorybookConfig = {
  stories: loadStories(),
  addons: addons,
  staticDirs: ['../public', { from: '../dist/tegel/assets/icons', to: '/dist/tegel/assets/icons' }],
  framework: {
    name: '@storybook/html-vite',
    options: {
      builder: {
        viteConfigPath: './.storybook/vite.config.ts',
      },
    },
  },

  async viteFinal(baseConfig, { configType }) {
    if (configType !== 'DEVELOPMENT') {
      return baseConfig;
    }

    return mergeConfig(baseConfig, {
      build: {
        outDir: 'dist-vite',
      },
    });
  },
};

export default config;
