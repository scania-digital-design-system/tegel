require('dotenv').config();

let addons = [
  '@storybook/addon-links',
  '@storybook/addon-essentials',
  'storybook-dark-mode',
  '@storybook/addon-notes/register',
];

if (process.env.STORYBOOK_ENV === 'development') {
  addons = [...addons, 'storybook-addon-designs', '@storybook/addon-a11y', 'addon-screen-reader'];
}

module.exports = {
  addons: addons,
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  framework: '@storybook/html',
  staticDirs: ['../public'],
};
