import { globSync } from 'glob';
import path from 'node:path';
import { mergeConfig } from 'vite';
import { SHIPPED_COMPONENTS } from '../src/tegel-lite/shipped-components.js';
import { defineMain } from '@storybook/html-vite/node';

const IS_DEV = process.env.VITE_STORYBOOK_ENV === 'dev';
const TEGEL_LITE_SHIPPED = new Set(SHIPPED_COMPONENTS);

function isAllowedTegelLiteStory(file: string): boolean {
  const match = /\/tegel-lite\/components\/([^/]+)\//.exec(file);
  if (!match) return true;
  return TEGEL_LITE_SHIPPED.has(match[1]);
}

function loadStories(): string[] {
  // Gather all story files synchronously
  const storyFiles = globSync(
    path.resolve(import.meta.dirname, '../src/**/*.@(stories.@(js|jsx|ts|tsx|mdx)|notes.mdx|mdx)'),
  );

  // If in development environment, return all story files.
  // Otherwise, exclude _beta and any un-shipped tegel-lite components.
  return IS_DEV
    ? storyFiles
    : storyFiles.filter(
        (file: string) => !file.includes('/_beta/') && isAllowedTegelLiteStory(file),
      );
}

export default defineMain({
  framework: '@storybook/html-vite',
  stories: loadStories(),
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: './.storybook/vite.config.ts',
      },
    },
  },
  addons: [
    '@vueless/storybook-dark-mode',
    '@storybook/addon-docs',
    ...(IS_DEV ? ['@storybook/addon-a11y'] : []),
  ],
  staticDirs: ['../public', { from: '../dist/tegel/assets/icons', to: '/dist/tegel/assets/icons' }],

  async viteFinal(config, { configType }) {
    if (configType !== 'DEVELOPMENT') {
      return config;
    }
    return mergeConfig(config, {
      build: {
        outDir: 'dist-vite',
      },
    });
  },
});
