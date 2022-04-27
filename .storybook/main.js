const path = require('path');

// Location of root node_modules
const modulesDir = path.join(process.cwd(), 'node_modules');

//SEE: https://github.com/storybookjs/storybook/pull/13300#issuecomment-756675536
const updateEmotionAliases = (config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      '@emotion/core': path.join(modulesDir, '@emotion/react'),
      '@emotion/styled': path.join(modulesDir, '@emotion/styled'),
      '@emotion/styled-base': path.join(modulesDir, '@emotion/styled'),
      'emotion-theming': path.join(modulesDir, '@emotion/react'),
    },
  },
});

module.exports = {
  stories: ['../src/**/*.stories.tsx', '../src/stories/*'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
  ],
  managerWebpack: updateEmotionAliases,
  webpackFinal: updateEmotionAliases,
  core: {
    builder: 'webpack5',
  },
};
