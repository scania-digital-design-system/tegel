let addons = [
  '@storybook/addon-links',
  '@storybook/addon-essentials',
  'storybook-dark-mode',
  '@storybook/addon-notes/register',
  'storybook-version',
];

module.exports = {
  addons: addons,
  features: {
    postcss: false,
  },
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  framework: '@storybook/html',
  staticDirs: ['../public'],
};
