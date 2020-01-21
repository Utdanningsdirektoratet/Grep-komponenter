#!/usr/bin/env node

const spawn = require('child_process').spawn;
const branch = require('git-branch').sync();
const tag = (function() {
  if (branch.match(/feature/)) {
    const [_, tag] = branch.match(/feature[\/|-](.*)/);
    return tag;
  }
  return branch;
})();

async function execute(cmd, args) {
  return new Promise((resolve, reject) => {
    const job = spawn(cmd, args);
    job.stdout.on('data', e => console.log(String(e)));
    job.stderr.on('data', e => console.error(String(e)));
    job.on('exit', (code, signal) => {
      code === 0 ? resolve() : reject({ code, signal });
    });
  });
}

async function getVersionType(){
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  return new Promise((resolve) => {
    function _getVersion() {
      readline.question(`What type of release? [major|minor|patch]`, (version) => {
        if(version === 'minor' || version === 'patch'){
          readline.close();
          resolve(version);
        }
        _getVersion();
      })
    }
    _getVersion();
  })
}


async function build() {
  switch (branch) {
    case 'master':
      return execute('npm', ['version', await getVersionType(), '-m', 'build: bumping to %s']);
    case 'dev':
      return execute('npm', [
        'version',
        'prerelease',
        `--preid=next`,
        '-m',
        'build: Bumping next to %s',
      ]);
    default:
      if (tag.length === 0) {
        throw Error(`invalid branch [${branch}]`);
      }
      return execute('npm', [
        'version',
        'prerelease',
        `--preid=${tag}`,
        '--no-git-tag-version',
        '-m',
        'build: prerelease of %s',
      ]);
  }
}

async function publish() {
  return execute('npm', ['publish', '--tag', branch === 'dev' ? 'next' : tag]);
}

(async () => {
  await build();
  branch !== 'master' && (await publish());
})();
