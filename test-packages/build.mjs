import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'test-packages', 'dist');
const stage = fs.mkdtempSync(path.join(os.tmpdir(), 'controller-current-pack-'));
const version = JSON.parse(fs.readFileSync(path.join(root, 'lerna.json'))).version;
const packages = fs
    .readdirSync(path.join(root, 'packages'))
    .map(name => {
        const directory = path.join(root, 'packages', name);
        const manifestPath = path.join(directory, 'package.json');
        return fs.existsSync(manifestPath) ? { directory, manifest: JSON.parse(fs.readFileSync(manifestPath)) } : null;
    })
    .filter(
        item =>
            item && !item.manifest.private && !['@iobroker/types', '@iobroker/types-dev'].includes(item.manifest.name),
    );
const names = new Set(packages.map(item => item.manifest.name));
fs.mkdirSync(output, { recursive: true });
const archives = [];
for (const { directory, manifest } of packages) {
    const destination = path.join(stage, path.basename(directory));
    fs.mkdirSync(destination);
    for (const entry of manifest.files || []) {
        const source = path.join(directory, entry);
        if (fs.existsSync(source)) {
            fs.cpSync(source, path.join(destination, entry), { recursive: true });
        }
    }
    for (const name of ['README.md', 'LICENSE']) {
        const source = fs.existsSync(path.join(directory, name)) ? path.join(directory, name) : path.join(root, name);
        if (fs.existsSync(source)) {
            fs.copyFileSync(source, path.join(destination, name));
        }
    }
    for (const section of ['dependencies', 'optionalDependencies', 'peerDependencies']) {
        for (const [name, range] of Object.entries(manifest[section] || {})) {
            if (names.has(name)) {
                manifest[section][name] = version;
            } else if (range.startsWith('file:')) {
                throw new Error(`Unresolved local dependency ${manifest.name}: ${name}`);
            }
        }
    }
    fs.writeFileSync(path.join(destination, 'package.json'), JSON.stringify(manifest, null, 2));
    const result = execFileSync(
        process.env.ComSpec || 'cmd.exe',
        ['/d', '/c', 'npm.cmd pack --ignore-scripts --json'],
        {
            cwd: destination,
            encoding: 'utf8',
            maxBuffer: 10 * 1024 * 1024,
            env: { ...process.env, npm_config_cache: path.join(root, '..', 'packages', 'npm-cache') },
        },
    );
    const filename = JSON.parse(result)[0].filename;
    fs.copyFileSync(path.join(destination, filename), path.join(output, filename));
    archives.push({
        name: manifest.name,
        filename,
        sha256: createHash('sha256')
            .update(fs.readFileSync(path.join(output, filename)))
            .digest('hex'),
    });
}
fs.writeFileSync(
    path.join(output, 'manifest.json'),
    JSON.stringify(
        {
            source: '57db46b3272505fba0a0f7aeaf17d15d18493d91',
            version,
            advertisedHostVersion: '8.0.0-alpha.25-20261124-86bf1182d',
            packages: archives,
        },
        null,
        2,
    ),
);
console.log(`Packed ${archives.length} packages into ${output}`);
