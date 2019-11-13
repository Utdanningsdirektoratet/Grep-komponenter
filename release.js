#!/usr/bin/env node

import { spawn } from 'child_process';
import GitBranch from 'git-branch';

const branch = GitBranch.sync();

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

async function build() {
  switch (branch) {
    case 'master':
      return execute('npm', ['version', 'minor', '-m', 'Bumping to %s']);
    case 'dev':
      return execute('npm', [
        'version',
        'patch',
        '-no-git-tag-version',
        '-m',
        'Bumping to %s',
      ]);
    default:
      return execute('npm', [
        'version',
        'prerelease',
        `--preid=${branch}`,
        '--no-git-tag-version',
        '-m',
        'prerelease of %s',
      ]);
  }
}

async function publish() {
  const tag = branch === 'dev' ? 'next' : branch;
  return execute('npm', ['publish', '--tag', tag]);
}

(async () => {
  await build();
  branch !== 'master' && (await publish());
})();
