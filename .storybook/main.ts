import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Required
  framework: '@storybook/react-vite',

  stories: ['../src/**/*.stories.tsx', '../src/**/*.stories.@(tsx)'],

  // Optional
  addons: [
    '@storybook/addon-links',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
  ],
};

export default config;
