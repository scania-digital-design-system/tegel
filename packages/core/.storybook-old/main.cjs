const path = require('path');
const glob = require('glob');

let addons = [
  '@storybook/addon-links',
  '@storybook/addon-essentials',
  'storybook-dark-mode',
  '@storybook/addon-notes/register',
   '@storybook/addon-docs',
  'storybook-version',
];

if (process.env.STORYBOOK_ENV === 'dev') {
  addons = [...addons, 'storybook-addon-designs', '@storybook/addon-a11y', 'addon-screen-reader'];
}

function loadStories() {
  // Gather all story files synchronously
  const storyFiles = glob.sync(path.resolve(__dirname, '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'));

  // If in development environment, return all story files
  // Otherwise, exclude stories from the _beta folder
  return process.env.STORYBOOK_ENV === 'dev'
    ? storyFiles
    : storyFiles.filter(file => !file.includes('/_beta/'));
}

module.exports = {
  addons: addons,
  features: {
    postcss: false,
    previewMdx2: true,
  },
  stories: loadStories(),
  framework: '@storybook/html',
  staticDirs: ['../public'],
};
