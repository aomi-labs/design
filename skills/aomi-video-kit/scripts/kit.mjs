// The kit's values, for every script: `import { KIT, KIT_DIR } from './kit.mjs'`.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const KIT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const KIT = JSON.parse(readFileSync(path.join(KIT_DIR, 'kit.json'), 'utf8'));
export const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
