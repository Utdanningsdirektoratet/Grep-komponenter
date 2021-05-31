# Komponentbibliotek

[![npm package](https://img.shields.io/npm/v/grep-components/latest.svg)](https://www.npmjs.com/package/grep-components)
[![Build](https://github.com/Utdanningsdirektoratet/Grep-komponenter/actions/workflows/build.yml/badge.svg)](https://github.com/Utdanningsdirektoratet/Grep-komponenter/actions/workflows/build.yml)

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
- [commitlint](https://github.com/conventional-changelog/commitlint) to enforce the [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/)
- [semantic-release](https://github.com/semantic-release/semantic-release) for version management and package publishing
- [Github Actions](https://docs.github.com/en/actions) for running build, test and release jobs
- [Dependabot](https://dependabot.com/) for dependency management

## Publishing

Pushing to `master` or any feature-branch (`feature/some-feature`) will automatically run the [release-workflow](https://github.com/Utdanningsdirektoratet/Grep-komponenter/blob/master/.github/workflows/release.yml). This will build the package, analyze the commits to determine next version number and publish the new version to [NPM](https://www.npmjs.com/package/grep-components) and [Github](https://github.com/Utdanningsdirektoratet/Grep-komponenter/releases). Current and previous runs can be seen [here](https://github.com/Utdanningsdirektoratet/Grep-komponenter/actions/workflows/release.yml).

[Semantic-release](https://github.com/semantic-release/semantic-release) will determine the next version number by looking at the commit message prefix:

| Prefix | Release type     | Example commit message             |
| :----- | :--------------- | :------------------ |
| BREAKING CHANGE | Major release | BREAKING CHANGE: Some breaking changes |
| feat | Minor release | feat: Some minor changes |
| fix, perf, revert, refactor, build(deps) | Patch release | fix: Some fixes |

If a commit contains none of these, then no release will be created / published.

The release-workflow can also be manually triggered from [here](https://github.com/Utdanningsdirektoratet/Grep-komponenter/actions/workflows/release.yml), but will still only release if there is a commit with a valid prefix.

### Important
- Commits with the `chore` prefix will skip the release-workflow job
- Feature-branches have to start with `feature/` to be included in the release-workflow. **Example:** `feature/some-feature`
- Published versions from a valid feature-branch will get the branch-name, excluding the `feature/` part, as a dist-tag in NPM. **Example:** `feature/some-feature` on version 0.18.0 will become `0.18.0-some-feature.1` and can be installed by running `npm i grep-components@some-feature`
