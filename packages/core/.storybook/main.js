import { join } from 'path';
import glob from 'glob';
import path from 'path';
/** @type { import('@storybook/html-vite').StorybookConfig } */

function loadStories() {
  // Gather all story files synchronously
  const storyFiles = glob.sync(path.resolve(__dirname, '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'));

  // If in development environment, return all story files
  // Otherwise, exclude stories from the _beta folder
  return process.env.STORYBOOK_ENV === 'dev'
    ? storyFiles
    : storyFiles.filter((file) => !file.includes('/_beta/'));
}

const config = {
  stories: loadStories(),
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/html-vite',
    options: {
      builder: {
        viteConfigPath: './vite.config.js',
      },
    },
  },
  managerEntries: [join(__dirname, './manager.jsx')],
};

export default config;
