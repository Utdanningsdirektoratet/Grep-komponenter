import chalk from "chalk"
import { spawn } from 'node:child_process';

export default function pluginYalc(enabled) {
    let run = enabled;
    return {
        name: 'rollup-plugin-yalc-push',
        watchChange(){
            enabled && (run = true);
        },
        writeBundle() {
            if(run){
                return new Promise(resolve => {
                    run = false;
                    const job = spawn('yalc', ['push']);
                    job.stderr.on('data', data => console.log(chalk.red(data)));
                    job.stdout.on('data', data => console.log(chalk.green(data)));
                    job.on('close', resolve);
                });
            }
        }
    };
}
