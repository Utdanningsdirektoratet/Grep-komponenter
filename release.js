#!/usr/bin/env node

const spawn = require('child_process').spawn;
const branch = require('git-branch').sync();
const tag = (function () {
  if (branch.match(/feature/)) {
    const [_, tag] = branch.match(/feature[\/|-](.*)/);
    return tag;
  }
  return branch;
})();

async function execute(cmd, args) {
  return new Promise((resolve, reject) => {
    const job = spawn(cmd, args, {
      stdio: 'inherit',
    });
    job.on('exit', (code, signal) => {
      code === 0 ? resolve() : reject({ code, signal });
    });
  });
}

async function build() {
  const version = process.argv.slice(2)[0];
  if (version.length === 0) {
    throw Error(`invalid version, provide version`);
  }
  switch (branch) {
    case 'master':
      return execute('npm', ['version', version, '-m', 'build: bumping to %s']);
    case 'dev':
      return execute('npm', [
        'version',
        `pre${version}`,
        '--preid=dev',
        '-m',
        'build: bumping next to %s',
      ]);
    default:
      if (tag.length === 0) {
        throw Error(`invalid branch [${branch}]`);
      }
      await execute('npm', [
        'version',
        '--no-git-tag-version',
        'prerelease',
        `--preid=${tag}`,
      ]);
      await execute('git', ['add', 'package.json', 'package-lock.json']);
      await execute('git', ['commit', '-m', `chore(${branch}): npm release`]);
      return execute('git', ['push']);
  }
}

(async () => {
  await build();
  branch === 'master'
    ? await execute('npm', ['publish'])
    : await execute('npm', [
        'publish',
        '--tag',
        branch === 'dev' ? 'next' : tag,
      ]);
})();
