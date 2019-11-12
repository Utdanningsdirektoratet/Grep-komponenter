const { spawn } = require('child_process');
const branch = require('git-branch').sync();
const build = spawn('npm', [
    'version',
    'prerelease',
    `--preid=${branch}`,
    '--no-git-tag-version'
]);
build.stdout.on('data', e => console.log(String(e)));
build.stderr.on('data', e => console.log(String(e)));
build.on('exit', function() {
    const publish = exec('npm', ['publish', branch]);
    publish.stdout.on('data', e => console.log(String(e)));
    publish.stderr.on('data', e => console.log(String(e)));
});
