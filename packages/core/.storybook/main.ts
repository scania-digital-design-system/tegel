import glob from 'glob';
import path from 'path';
import type { StorybookConfig } from '@storybook/html-vite';

function loadStories() {
  // Gather all story files synchronously
  const storyFiles = glob.sync(path.resolve(__dirname, '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'));

  // If in development environment, return all story files
  // Otherwise, exclude stories from the _beta folder
  return process.env.STORYBOOK_ENV === 'dev'
    ? storyFiles
    : storyFiles.filter((file: string | string[]) => !file.includes('/_beta/'));
}

const config: StorybookConfig = {
  stories: loadStories(),
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/html-vite',
    options: {
      builder: {
        viteConfigPath: './.storybook/vite.config.js',
      },
    },
  },
};

export default config;
