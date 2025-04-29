/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/html-vite',
    options: {
      builder: {
        viteConfigPath: './vite.config.js',
      },
    },
  },
  docs: {
    autodocs: true,
  },
};
export default config;
