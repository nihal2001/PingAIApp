/*
  Copies Vite build output (dist) into Cordova's www folder so
  `cordova prepare` / builds pick up the latest web assets.
*/
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const dist = path.join(root, 'dist');
const www = path.join(root, 'www');

function rimraf(p) {
  if (!fs.existsSync(p)) return;
  for (const entry of fs.readdirSync(p)) {
    const cur = path.join(p, entry);
    const stat = fs.lstatSync(cur);
    if (stat.isDirectory()) rimraf(cur);
    else fs.unlinkSync(cur);
  }
  fs.rmdirSync(p);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    const s = path.join(src, entry);
    const d = path.join(dest, entry);
    const stat = fs.lstatSync(s);
    if (stat.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

if (!fs.existsSync(dist)) {
  console.error('No dist folder found. Run `npm run build` first.');
  process.exit(1);
}

if (fs.existsSync(www)) rimraf(www);
copyDir(dist, www);
console.log('Synced dist -> www for Cordova');

