#!/usr/bin/env node
/**
 * Figma Token Normalization Script
 * 
 * Converts raw Figma exports to clean, Style Dictionary-compatible tokens.
 * This script handles all Figma-specific transformations so Style Dictionary
 * can focus purely on output generation.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const SEMANTIC_SOURCE_DIR = join(process.cwd(), 'tokens', 'json', 'semantic');
const PRIMITIVE_SOURCE_DIR = join(process.cwd(), 'tokens', 'json', 'primitive');
const SEMANTIC_DIST_DIR = join(process.cwd(), 'tokens', 'dist', 'semantic');
const PRIMITIVE_DIST_DIR = join(process.cwd(), 'tokens', 'dist', 'primitive');

// Directories will be created in main()

/**
 * Determine whether an entry in the token object should be skipped entirely.
 */
function shouldSkipEntry(key, isPrimitive) {
  if (key === '$extensions') {
    return true; // Skip Figma metadata
  }
  if (key === 'INTERNAL' && !isPrimitive) {
    return true; // Skip INTERNAL namespace tokens (only in semantic tokens)
  }
  return false;
}

function tryNormalizeAlias(obj, value, isPrimitive) {
  if (isPrimitive) return { handled: false, value };
  const aliasData = obj.$extensions?.['com.figma.aliasData'];
  if (!aliasData?.targetVariableName) return { handled: false, value };
  const targetPath = aliasData.targetVariableName;
  const referencePath = targetPath.split('/').join('.');
  return { handled: true, value: `{${referencePath}}` };
}

function tryNormalizeColor(obj, value) {
  if (obj.$type !== 'color' || typeof value !== 'object' || !value.hex) {
    return { handled: false, value };
  }
  if (value.alpha !== undefined && value.alpha < 1) {
    const alphaHex = Math.round(value.alpha * 255).toString(16).padStart(2, '0');
    return { handled: true, value: `${value.hex}${alphaHex}` };
  }
  return { handled: true, value: value.hex };
}

function tryNormalizeFontFamily(obj, value, path, isPrimitive) {
  const isFontToken =
    isPrimitive && (obj.$type === 'text' || obj.$type === 'string') && typeof value === 'string';
  if (!isFontToken) {
    return { handled: false, value };
  }
  const fullPath = [...path, '$value'].join('.');
  const isScaniaFontFamily =
    fullPath.includes('scania.font.family') || path.join('.').includes('scania.font.family');
  if (!isScaniaFontFamily) {
    return { handled: false, value };
  }
  return { handled: true, value: value.replaceAll(' cy', '') };
}

function tryNormalizeInternalReference(value, isPrimitive) {
  if (isPrimitive || typeof value !== 'string' || !value.includes('INTERNAL.')) {
    return { handled: false, value };
  }
  return { handled: true, value: null }; // Signal drop token
}

function tryNormalizeNumber(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return { handled: false, value };
  }
  return { handled: true, value: Number(value.toFixed(4)) };
}

/**
 * Normalize a single `$value` entry for a token.
 * Returns:
 * - `null` to indicate the entire token should be dropped
 * - any other value to be assigned to `$value`
 */
function normalizeValueForToken(obj, value, path, isPrimitive) {
  let result;

  result = tryNormalizeAlias(obj, value, isPrimitive);
  if (result.handled) return result.value;

  result = tryNormalizeColor(obj, value);
  if (result.handled) return result.value;

  result = tryNormalizeFontFamily(obj, value, path, isPrimitive);
  if (result.handled) return result.value;

  result = tryNormalizeInternalReference(value, isPrimitive);
  if (result.handled) return null;

  result = tryNormalizeNumber(value);
  if (result.handled) return result.value;

  // Preserve other values as-is
  return value;
}

/**
 * Recursively process a token object to normalize it
 * @param {object} obj - Token object to normalize
 * @param {string[]} path - Current path in the token tree
 * @param {boolean} isPrimitive - Whether we're processing primitive tokens (no alias resolution needed)
 */
function normalizeToken(obj, path = [], isPrimitive = false) {
  if (obj == null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => normalizeToken(item, path, isPrimitive));
  }

  // Create a new object to avoid mutating the original
  const normalized = {};

  for (const [key, value] of Object.entries(obj)) {
    if (shouldSkipEntry(key, isPrimitive)) {
      continue;
    }

    const currentPath = [...path, key];

    // Check if this is a token with $type and $value
    if (key === '$value' && obj.$type) {
      const normalizedValue = normalizeValueForToken(obj, value, path, isPrimitive);
      if (normalizedValue === null) {
        return null; // Skip this entire token
      }
      normalized[key] = normalizedValue;
      continue;
    }

    // Recursively process nested objects
    const normalizedValue = normalizeToken(value, currentPath, isPrimitive);
    if (normalizedValue !== null) {
      normalized[key] = normalizedValue;
    }
  }

  // If token has $type but no $value after normalization, skip it
  // Note: Check for undefined/null explicitly, not falsy values (0 is valid!)
  if (normalized.$type && (normalized.$value === undefined || normalized.$value === null)) {
    return null;
  }

  return normalized;
}

/**
 * Process a single token file
 */
function processFile(filename, sourceDir, distDir, isPrimitive = false) {
  const sourcePath = join(sourceDir, filename);
  const distPath = join(distDir, filename);

  console.log(`Processing ${filename}...`);

  try {
    const content = JSON.parse(readFileSync(sourcePath, 'utf8'));
    const normalized = normalizeToken(content, [], isPrimitive);

    if (!normalized || Object.keys(normalized).length === 0) {
      console.warn(`  Warning: ${filename} resulted in empty output`);
      return;
    }

    // Write normalized tokens
    writeFileSync(distPath, JSON.stringify(normalized, null, 2) + '\n', 'utf8');
    console.log(`  ✓ Normalized ${filename}`);
  } catch (error) {
    console.error(`  ✗ Error processing ${filename}:`, error.message);
    throw error;
  }
}

/**
 * Main execution
 */
function main() {
  console.log('Figma Token Normalization');
  console.log('==========================\n');

  // Ensure dist directories exist
  mkdirSync(SEMANTIC_DIST_DIR, { recursive: true });
  mkdirSync(PRIMITIVE_DIST_DIR, { recursive: true });

  // Process semantic tokens
  console.log('Processing semantic tokens...\n');
  const semanticFiles = readdirSync(SEMANTIC_SOURCE_DIR)
    .filter(f => f.endsWith('.json'))
    .filter(f => !f.startsWith('$')); // Skip theme files

  if (semanticFiles.length > 0) {
    console.log(`Found ${semanticFiles.length} semantic token file(s)\n`);
    semanticFiles.forEach(file => processFile(file, SEMANTIC_SOURCE_DIR, SEMANTIC_DIST_DIR, false));
  } else {
    console.warn('No semantic token files found!');
  }

  // Process primitive tokens
  console.log('\nProcessing primitive tokens...\n');
  const primitiveFiles = readdirSync(PRIMITIVE_SOURCE_DIR)
    .filter(f => f.endsWith('.json'));

  if (primitiveFiles.length > 0) {
    console.log(`Found ${primitiveFiles.length} primitive token file(s)\n`);
    primitiveFiles.forEach(file => processFile(file, PRIMITIVE_SOURCE_DIR, PRIMITIVE_DIST_DIR, true));
  } else {
    console.warn('No primitive token files found!');
  }

  console.log(`\n✓ Normalization complete!`);
  console.log(`  Semantic tokens: ${SEMANTIC_DIST_DIR}`);
  console.log(`  Primitive tokens: ${PRIMITIVE_DIST_DIR}`);
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { normalizeToken, processFile, main };
