const path = require('path');
const glob = require('glob');

let addons = [
  '@storybook/addon-links',
  '@storybook/addon-essentials',
  'storybook-dark-mode',
  '@storybook/addon-notes/register',
  'storybook-version',
];

if (process.env.STORYBOOK_ENV === 'dev') {
  addons = [...addons, 'storybook-addon-designs', '@storybook/addon-a11y', 'addon-screen-reader'];
}

function loadStories() {
  // Synchronously gather all story files
  const storyFiles = glob.sync(path.resolve(__dirname, '../src/**/*.stories.@(js|jsx|ts|tsx)'));

  if (process.env.STORYBOOK_ENV === 'dev') {
    // Return all for development environment
    return storyFiles
  } else {
    // Filter out stories from _beta folder if environment is not development
    const filteredStories = storyFiles.filter(file => !file.includes('/_beta/'));
    return filteredStories;
  }
}

module.exports = {
  addons: addons,
  features: {
    postcss: false,
  },
  stories: loadStories(),
  framework: '@storybook/html',
  staticDirs: ['../public'],
};
