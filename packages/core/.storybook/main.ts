import glob from 'glob';
import path from 'path';
import type { StorybookConfig } from '@storybook/html-vite';
import { mergeConfig } from 'vite';

function loadStories() {
  // Gather all story files synchronously
  const storyFiles = glob.sync(
    path.resolve(__dirname, '../src/**/*.@(stories.@(js|jsx|ts|tsx|mdx)|notes.mdx|mdx)'),
  );

  // If in development environment, return all story files
  // Otherwise, exclude stories from the _beta and tegel-light folders
  return process.env.VITE_STORYBOOK_ENV === 'dev'
    ? storyFiles
    : storyFiles.filter(
        (file: string | string[]) => !file.includes('/_beta/') && !file.includes('/tegel-light/'),
      );
}

let addons = [
  '@storybook/addon-essentials',
  '@storybook/addon-interactions',
  '@storybook/blocks',
  'storybook-dark-mode',
];

if (process.env.VITE_STORYBOOK_ENV === 'dev') {
  addons = [...addons, '@storybook/addon-designs', '@storybook/addon-a11y'];
}

const config: StorybookConfig = {
  stories: loadStories(),
  addons: addons,
  staticDirs: ['../public'],
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
