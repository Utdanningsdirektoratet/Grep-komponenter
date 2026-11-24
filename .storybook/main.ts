import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';

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
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      plugins: [
        react({
          babel: {
            plugins: ['babel-plugin-react-compiler'],
          },
        }),
      ],
    });
  },
};

export default config;
