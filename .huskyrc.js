module.exports = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-push': 'npm run test',
    'pre-commit': 'lint-staged',
  },
};
