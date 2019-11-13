module.exports = {
    "*.{ts,tsx}": () => [
        "eslint --fix",
        "git add",
    ],
    "*.{md,json}": ["prettier --write", "git add"]
};
