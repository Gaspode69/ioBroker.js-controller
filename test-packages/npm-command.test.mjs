import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { findNpmCli, runNpm } from './npm-command.mjs';

test('npm receives a prefix containing spaces and shell metacharacters as one literal argument', () => {
    const prefix = path.resolve('test packages', 'literal & directory');
    const output = runNpm(findNpmCli(), ['prefix', '--prefix', prefix], { encoding: 'utf8' });
    assert.equal(output.trim(), prefix);
});
