# Komponentbibliotek

[![npm package](https://img.shields.io/npm/v/grep-component-lib/latest.svg)](https://www.npmjs.com/package/grep-component-lib) [![Greenkeeper badge](https://badges.greenkeeper.io/kimbouvet/component-library-boilerplate.svg)](https://greenkeeper.io/) 
[![Build Status](https://travis-ci.com/kimbouvet/component-library-boilerplate.svg?branch=master)](https://travis-ci.com/kimbouvet/component-library-boilerplate)

Boilerplate for creating a react component library

# Installation

    npm i grep-component-lib

## Features

- Bundles `cjs` and `es` module formats
- [create-react-app](https://github.com/facebookincubator/create-react-app) for example usage and local dev
- [Rollup](https://rollupjs.org/) for bundling
- [Babel](https://babeljs.io/) for transpiling
- [Jest](https://facebook.github.io/jest/) & [Enzyme](https://github.com/airbnb/enzyme) for testing
- Typescript
- Sourcemap creation
- [Storybook](https://storybook.js.org) for easy development of components
- [Travic CI](https://travis-ci.org) for test and deploy
- [Greenkeeper](https://greenkeeper.io) for dependency management

## Publishing using Travis CI

    npm version patch -m "Bumping to %s" && git push --tags
    
## Publishing locally

    npm publish
