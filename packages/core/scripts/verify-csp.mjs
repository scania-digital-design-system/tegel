#!/usr/bin/env node
/**
 * CSP compliance guard for Tegel Design System build output.
 *
 * Scans generated JS files for inline event handler patterns that would violate
 * Content Security Policy (CSP) when script-src 'unsafe-inline' is not allowed.
 * These patterns were present in older Stencil versions (2.x) and were eliminated
 * in Stencil 4.x, which now uses constructable stylesheets and nonce-aware <style>
 * element injection instead.
 *
 * Exits 0 if no violations are found.
 * Exits 1 with details if violations are found (build should be treated as broken).
 *
 * Run automatically after every production build via the "build:core" npm script.
 * Can also be run standalone: node scripts/verify-csp.mjs
 *
 * If this script fails after a Stencil upgrade, inspect the new runtime output for
 * the patterns listed in VIOLATION_PATTERNS and update them accordingly, or check
 * the Stencil changelog for CSS loading changes.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const packageRoot = path.resolve(path.dirname(currentFilePath), '..');

/**
 * Known CSP-violating patterns from Stencil's older lazy-loading CSS mechanism.
 * Each entry describes a distinct violation to detect.
 */
const VIOLATION_PATTERNS = [
  {
    regex: /\.onload\s*=\s*(?:function|\(\s*\)\s*=>)/g,
    description: 'Inline onload handler assigned to link element (e.onload = function/() =>)',
  },
  {
    regex: /onload="this\.media/g,
    description: 'Inline onload attribute with media switch (onload="this.media=\'all\'")',
  },
  {
    regex: /setAttribute\(\s*['"]onload['"]/g,
    description: 'Dynamic onload attribute via setAttribute("onload", ...)',
  },
  {
    regex: /\.media\s*=\s*['"]print['"]/g,
    description: 'media="print" set on dynamically created link element',
  },
];

/**
 * Build output directories to scan, relative to packages/core.
 * Directories that do not exist are skipped gracefully.
 */
const SCAN_DIRS = ['www/build', 'dist/esm', 'dist/cjs', 'loader'];

function* walkJs(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkJs(fullPath);
    } else if (entry.name.endsWith('.js')) {
      yield fullPath;
    }
  }
}

let totalViolations = 0;
let filesScanned = 0;

for (const relDir of SCAN_DIRS) {
  const absDir = path.join(packageRoot, relDir);
  for (const filePath of walkJs(absDir)) {
    filesScanned++;
    const content = fs.readFileSync(filePath, 'utf-8');
    const relPath = path.relative(packageRoot, filePath);

    for (const { regex, description } of VIOLATION_PATTERNS) {
      regex.lastIndex = 0;
      const matches = content.match(regex);
      if (matches) {
        console.error(`CSP violation in ${relPath}`);
        console.error(`  Pattern: ${description}`);
        console.error(`  Occurrences: ${matches.length}`);
        totalViolations++;
      }
    }
  }
}

if (totalViolations > 0) {
  console.error(
    `\nCSP check FAILED: ${totalViolations} violation(s) found across ${filesScanned} file(s).`,
  );
  console.error(
    'If this occurred after a Stencil upgrade, inspect the new runtime output and update',
  );
  console.error('VIOLATION_PATTERNS in scripts/verify-csp.mjs. See README.md for details.');
  process.exit(1);
} else {
  console.log(`CSP check passed: ${filesScanned} file(s) scanned, no violations found.`);
}
