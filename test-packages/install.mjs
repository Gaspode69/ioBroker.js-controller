import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const directory = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'dist', 'manifest.json'), 'utf8'));
for (const entry of ['iobroker-data', 'node_modules/iobroker.js-controller']) {
    if (!fs.statSync(path.join(root, entry)).isDirectory()) {
        throw new Error(`Missing installation directory: ${entry}`);
    }
}
const archives = manifest.packages.map(item => {
    const filename = path.join(directory, 'dist', item.filename);
    const hash = createHash('sha256').update(fs.readFileSync(filename)).digest('hex');
    if (hash !== item.sha256) {
        throw new Error(`Checksum mismatch: ${filename}`);
    }
    return filename;
});
function run(command) {
    execFileSync(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', command], { cwd: root, stdio: 'inherit' });
}
// Verify elevation before stopping the service or installing packages.
run('fltmc.exe >nul');
console.log(`Installing PR ${manifest.source} (${manifest.version}) into ${root}`);
run('iob stop');
run(
    `npm install --force ${archives.map(filename => `"${filename}"`).join(' ')} "https://raw.githubusercontent.com/Gaspode69/ioBroker.admin/8caa1b1b/test-packages/dist/iobroker.admin-8.3.13.tgz"`,
);
run('iob upload admin');
run('node node_modules\\iobroker.js-controller\\iobroker.js setup first');
run('iob start');
console.log('Test packages installed. Configure the test repository as described in README.md before the UI upgrade.');
