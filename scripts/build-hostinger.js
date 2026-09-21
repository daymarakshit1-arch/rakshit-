/**
 * Hostinger Deployment Packaging Script
 * Converts and packages electrobolt.electro for Hostinger platform.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { ELECTROBOLT_CATALOGUE } from '../src/data/products.ts';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const packageDir = path.join(rootDir, 'hostinger-package');
const zipFile = path.join(rootDir, 'hostinger-deployment.zip');

console.log('⚡ [1/5] Syncing official catalogue to public/api/products.json...');
fs.mkdirSync(path.join(rootDir, 'public', 'api'), { recursive: true });
fs.writeFileSync(
  path.join(rootDir, 'public', 'api', 'products.json'),
  JSON.stringify(ELECTROBOLT_CATALOGUE, null, 2),
  'utf8'
);

console.log('🔨 [2/5] Building production Vite application & server...');
execSync('npm run build', { stdio: 'inherit' });

console.log('📦 [3/5] Assembling Hostinger deployment directory in hostinger-package/...');
if (fs.existsSync(packageDir)) {
  fs.rmSync(packageDir, { recursive: true, force: true });
}
fs.mkdirSync(packageDir, { recursive: true });

// Helper to copy directory recursively
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy dist contents (index.html, assets, .htaccess, api/ directory, server.cjs, server.js)
copyDir(distDir, packageDir);

// Explicitly ensure root server.js is in the package
if (fs.existsSync(path.join(rootDir, 'server.js'))) {
  fs.copyFileSync(path.join(rootDir, 'server.js'), path.join(packageDir, 'server.js'));
}

// Generate a clean production package.json for Hostinger Node.js Selector
const rootPkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const prodPkg = {
  name: rootPkg.name || 'electrobolt-electro',
  version: rootPkg.version || '1.0.0',
  type: 'module',
  main: 'server.js',
  scripts: {
    start: 'node server.js',
  },
  dependencies: rootPkg.dependencies || {},
};
fs.writeFileSync(path.join(packageDir, 'package.json'), JSON.stringify(prodPkg, null, 2), 'utf8');

// Copy .env.example
if (fs.existsSync(path.join(rootDir, '.env.example'))) {
  fs.copyFileSync(path.join(rootDir, '.env.example'), path.join(packageDir, '.env.example'));
}

// Copy ecosystem.config.cjs for PM2/Node.js users
if (fs.existsSync(path.join(rootDir, 'ecosystem.config.cjs'))) {
  fs.copyFileSync(path.join(rootDir, 'ecosystem.config.cjs'), path.join(packageDir, 'ecosystem.config.cjs'));
}

console.log('🗜️  [4/5] Creating hostinger-deployment.zip archive via Python zipfile...');
try {
  if (fs.existsSync(zipFile)) {
    fs.unlinkSync(zipFile);
  }
  // Create zip from the package directory contents
  execSync(`python3 -c "
import shutil, os
shutil.make_archive('hostinger-deployment', 'zip', 'hostinger-package')
"`, { stdio: 'inherit' });
  console.log('✅ Created hostinger-deployment.zip (' + (fs.statSync(zipFile).size / 1024).toFixed(1) + ' KB)');
} catch (err) {
  console.warn('Zip creation notice:', err.message);
}

console.log('✨ [5/5] Hostinger conversion complete!');
console.log('📁 Deployment folder: ./hostinger-package/');
console.log('📦 Ready-to-upload zip: ./hostinger-deployment.zip');
