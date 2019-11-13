# Komponentbibliotek

[![npm package](https://img.shields.io/npm/v/grep-components/latest.svg)](https://www.npmjs.com/package/grep-components) 
[![Build Status](https://travis-ci.com/Utdanningsdirektoratet/Grep-komponenter.svg?branch=master)](https://travis-ci.com/Utdanningsdirektoratet/Grep-komponenter) [![Greenkeeper badge](https://badges.greenkeeper.io/Utdanningsdirektoratet/Grep-komponenter.svg)](https://greenkeeper.io/)

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
- [Travic CI](https://travis-ci.org) for test and deploy
- [Greenkeeper](https://greenkeeper.io) for dependency management

## Publishing using Travis CI
When pushing to master or dev git hooks will tag and bump version

    git push
    <!-- skip hooks  -->
    git push --no-verify 
    
## Publishing locally
When testing beta feature, the feature/${NAME} is published as prerelease

    npm beta
