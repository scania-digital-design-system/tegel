#!/usr/bin/env node

/**
 * Post-install script to patch Stencil type definitions for TypeScript 4.8.4 compatibility
 *
 * Stencil 4.38.3 generates type definitions using TypeScript 5.0+ syntax (const type parameters),
 * which is not compatible with TypeScript 4.8.4 used by Angular 14.
 *
 * This script patches the problematic type definition file to remove the 'const' modifier.
 */

const fs = require('fs');
const path = require('path');

const targetFile = path.join(
  __dirname,
  '..',
  'node_modules',
  '@scania',
  'tegel',
  'dist',
  'types',
  'stencil-public-runtime.d.ts',
);

// Check if the file exists
if (!fs.existsSync(targetFile)) {
  console.log('⚠️  stencil-public-runtime.d.ts not found, skipping patch');
  console.log(`   Expected location: ${targetFile}`);
  process.exit(0);
}

// Read the file
let content = fs.readFileSync(targetFile, 'utf8');

// Check if already patched
if (content.includes('// PATCHED FOR TYPESCRIPT 4.8.4')) {
  console.log('✅ stencil-public-runtime.d.ts already patched');
  process.exit(0);
}

// Pattern to match: export declare function Mixin<const TMixins extends readonly MixinFactory[]>
// Also handle potential variations in formatting
const patterns = [
  {
    pattern: /export declare function Mixin<const TMixins extends readonly MixinFactory\[\]>/g,
    replacement: 'export declare function Mixin<TMixins extends readonly MixinFactory[]>',
  },
  {
    pattern: /function Mixin<const TMixins extends readonly MixinFactory\[\]>/g,
    replacement: 'function Mixin<TMixins extends readonly MixinFactory[]>',
  },
];

// Check if the pattern exists
const hasConstPattern = content.includes('const TMixins') && content.includes('MixinFactory');
if (!hasConstPattern) {
  // Check if already patched (no const but has Mixin)
  if (
    content.includes('function Mixin<TMixins') ||
    content.includes('declare function Mixin<TMixins')
  ) {
    console.log('✅ stencil-public-runtime.d.ts appears to be already compatible');
    process.exit(0);
  }
  console.log('⚠️  Pattern not found in stencil-public-runtime.d.ts, skipping patch');
  console.log('   The file might have been updated or the pattern changed');
  process.exit(0);
}

// Apply the patch - try all patterns
let patchedContent = content;
let patchApplied = false;
for (const { pattern, replacement } of patterns) {
  if (pattern.test(patchedContent)) {
    patchedContent = patchedContent.replace(pattern, replacement);
    patchApplied = true;
    break;
  }
}

// Verify the patch was applied
if (!patchApplied || patchedContent === content) {
  console.log('⚠️  Patch was not applied (content unchanged)');
  console.log('   This might indicate the file structure has changed');
  process.exit(1);
}

// Add a comment to indicate the file has been patched
// Find the line with the Mixin function and add a comment before it
const lines = patchedContent.split('\n');
const mixinLineIndex = lines.findIndex((line) =>
  line.includes('export declare function Mixin<TMixins'),
);
if (mixinLineIndex > 0) {
  lines[mixinLineIndex - 1] =
    lines[mixinLineIndex - 1] +
    '\n// PATCHED FOR TYPESCRIPT 4.8.4 - const modifier removed from Mixin type parameter';
}

// Write the patched file
fs.writeFileSync(targetFile, lines.join('\n'), 'utf8');

console.log(
  '✅ Successfully patched stencil-public-runtime.d.ts for TypeScript 4.8.4 compatibility',
);
