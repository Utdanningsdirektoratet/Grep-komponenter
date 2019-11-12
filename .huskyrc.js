function getHooks() {
    switch (require('git-branch').sync()) {
        case 'master':
            return {
                'pre-push': 'npm version minor -m "Bumping to %s"'
            };
        case 'dev':
            return {
                'pre-push': 'npm version patch -m "Bumping to %s"'
            };
    }
}
module.exports = {
    hooks: getHooks()
};
