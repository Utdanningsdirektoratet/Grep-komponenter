module.exports = {
    "src/**/*.ts?(x)": () => [
        "eslint . --fix",
        "git add",
    ]
};
