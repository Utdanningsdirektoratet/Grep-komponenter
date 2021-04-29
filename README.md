# Komponentbibliotek

[![npm package](https://img.shields.io/npm/v/grep-components/latest.svg)](https://www.npmjs.com/package/grep-components)

Komponentbibliotek for Grep. Brukes i Læreplanutvikleren og Grepadmin

# Installation

    npm i grep-components

## Features

- Bundles `cjs` and `es` module formats
- [create-react-app](https://github.com/facebookincubator/create-react-app) for example usage and local dev
- [Rollup](https://rollupjs.org/) for bundling
- [Babel](https://babeljs.io/) for transpiling
- [Jest](https://facebook.github.io/jest/) & [Enzyme](https://github.com/airbnb/enzyme) for testing
- Typescript
- Sourcemap creation
- [Storybook](https://storybook.js.org) for easy development of components
- [Github Actions](https://docs.github.com/en/actions) for test and deploy
- [Greenkeeper](https://greenkeeper.io) for dependency management

## Publishing

When publishing from master Github Actions will publish to NPM

When publishing from dev or feature deploy will be from local (user need access) and tagged next|feature/\${TAG}

    npm run release
