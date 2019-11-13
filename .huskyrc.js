module.exports = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-push': 'tsc --noEmit',
    'pre-commit': 'lint-staged',
  },
};
