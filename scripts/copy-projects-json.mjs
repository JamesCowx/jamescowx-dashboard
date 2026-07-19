import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, '..', 'src', 'data', 'projects.json');
const dest = resolve(__dirname, '..', 'public', 'projects.json');

const data = readFileSync(src, 'utf-8');
writeFileSync(dest, data, 'utf-8');
console.log('Copied projects.json to public/');
