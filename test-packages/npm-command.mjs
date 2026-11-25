import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

/** Find the npm JavaScript entrypoint so paths are passed as arguments without cmd.exe quoting. */
export function findNpmCli() {
    const candidates = [
        process.env.npm_execpath,
        path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js'),
    ];
    if (process.platform === 'win32') {
        const launchers = execFileSync('where.exe', ['npm.cmd'], { encoding: 'utf8' }).trim().split(/\r?\n/);
        // Prefer the npm selected by PATH, which may differ from the version bundled with Node.js.
        candidates.unshift(
            ...launchers.map(file => path.join(path.dirname(file), 'node_modules', 'npm', 'bin', 'npm-cli.js')),
        );
    }
    const cli = candidates.find(file => file && fs.existsSync(file));
    if (!cli) {
        throw new Error('Cannot locate npm-cli.js. Open the ioBroker Command line with Node.js and npm configured.');
    }
    return cli;
}

/**
 * Execute npm directly through Node.js with literal arguments.
 *
 * @param cli npm-cli.js path
 * @param args npm arguments
 * @param options child process options
 */
export function runNpm(cli, args, options = {}) {
    return execFileSync(process.execPath, [cli, ...args], options);
}
