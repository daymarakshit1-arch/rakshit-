/**
 * Universal Node.js Application Startup File (server.js)
 * Supports Hostinger Node.js Selector, cPanel, VPS, and Git deployments.
 * Resolves the "Entry File (server.js)" requirement.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Look for compiled server in standard deployment locations
const candidates = [
  path.join(__dirname, 'dist', 'server.cjs'),
  path.join(__dirname, 'server.cjs'),
  path.join(__dirname, 'dist', 'server.js'),
];

const resolvedServer = candidates.find(candidate => fs.existsSync(candidate));

if (!resolvedServer) {
  console.error('[Hostinger Startup Error] Could not find compiled server.');
  console.error('Checked locations:');
  candidates.forEach(c => console.error('  - ' + c));
  console.error('Please run "npm run build" or verify files are uploaded.');
  process.exit(1);
}

await import(resolvedServer);
