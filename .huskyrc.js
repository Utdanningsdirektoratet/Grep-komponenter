module.exports = {
    hooks: {
        'pre-push': 'tsc --noEmit',
        'pre-commit': 'lint-staged'
    }
};
