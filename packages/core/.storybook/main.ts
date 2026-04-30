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
  // Otherwise, exclude stories from the _beta folder
  return process.env.VITE_STORYBOOK_ENV === 'dev'
    ? storyFiles
    : storyFiles.filter(
        (file: string | string[]) => !file.includes('/_beta/') && !file.includes('/tegel-lite/'),
      );
}

let addons = ['@vueless/storybook-dark-mode', '@storybook/addon-docs'];

if (process.env.VITE_STORYBOOK_ENV === 'dev') {
  addons = [...addons, '@storybook/addon-a11y'];
}

const config: StorybookConfig = {
  stories: loadStories(),
  addons: addons,
  // The tegel-lite icon CSS variables resolve to url(../dist/tegel/assets/...);
  // serve the dist folder in dev so those URLs don't 404 (in storybook build,
  // Vite already bundles those assets into storybook-static/dist).
  staticDirs: ['../public', { from: '../dist', to: '/dist' }],
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
