import { type StorybookConfig } from '@stencil/storybook-plugin';

const config: StorybookConfig = {
  stories: ['../src/**/*.new.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@vueless/storybook-dark-mode',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@stencil/storybook-plugin',
  },
  core: {
    disableTelemetry: true,
  },
};

export default config;
