#!/usr/bin/env node
/**
 * Figma Token Normalization Script
 * 
 * Converts raw Figma exports to clean, Style Dictionary-compatible tokens.
 * This script handles all Figma-specific transformations so Style Dictionary
 * can focus purely on output generation.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';

const SEMANTIC_SOURCE_DIR = join(process.cwd(), 'tokens', 'json', 'semantic');
const PRIMITIVE_SOURCE_DIR = join(process.cwd(), 'tokens', 'json', 'primitive');
const SEMANTIC_DIST_DIR = join(process.cwd(), 'tokens', 'dist', 'semantic');
const PRIMITIVE_DIST_DIR = join(process.cwd(), 'tokens', 'dist', 'primitive');

// Directories will be created in main()

/**
 * Recursively process a token object to normalize it
 * @param {object} obj - Token object to normalize
 * @param {string[]} path - Current path in the token tree
 * @param {boolean} isPrimitive - Whether we're processing primitive tokens (no alias resolution needed)
 */
function normalizeToken(obj, path = [], isPrimitive = false) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => normalizeToken(item, path, isPrimitive));
  }

  // Create a new object to avoid mutating the original
  const normalized = {};

  for (const [key, value] of Object.entries(obj)) {
    // Skip Figma metadata
    if (key === '$extensions') {
      continue; // Skip entire extensions object
    }

    // Skip INTERNAL namespace tokens (only in semantic tokens)
    if (key === 'INTERNAL' && !isPrimitive) {
      continue; // Skip entire INTERNAL namespace
    }

    const currentPath = [...path, key];

    // Check if this is a token with $type and $value
    if (key === '$value' && obj.$type) {
      // Handle alias resolution (only for semantic tokens)
      if (!isPrimitive) {
        const aliasData = obj.$extensions?.['com.figma.aliasData'];
        if (aliasData?.targetVariableName) {
          // Convert Figma path format to Style Dictionary reference format
          // "scania/color/grey/950" -> "{scania.color.grey.950}"
          const targetPath = aliasData.targetVariableName;
          const referencePath = targetPath.split('/').join('.');
          normalized[key] = `{${referencePath}}`;
          continue;
        }
      }

      // Handle color objects - convert to hex string (preserve alpha when present)
      if (obj.$type === 'color' && typeof value === 'object' && value.hex) {
        if (value.alpha !== undefined && value.alpha < 1) {
          const alphaHex = Math.round(value.alpha * 255).toString(16).padStart(2, '0');
          normalized[key] = `${value.hex}${alphaHex}`;
        } else {
          normalized[key] = value.hex;
        }
        continue;
      }

      // Handle font family transformation for primitive tokens
      // Remove ' cy' from Scania font family names
      // Check both 'text' and 'string' types (font family tokens can use either)
      if (isPrimitive && (obj.$type === 'text' || obj.$type === 'string') && typeof value === 'string') {
        // Build the full path including current key to check
        const fullPath = [...path, key].join('.');
        // Check if path includes 'scania.font.family' (the path would be like 'scania.font.family.default')
        if (fullPath.includes('scania.font.family') || path.join('.').includes('scania.font.family')) {
          normalized[key] = value.replace(/ cy/g, '');
          continue;
        }
      }

      // Handle INTERNAL references in values (only for semantic tokens)
      if (!isPrimitive && typeof value === 'string' && value.includes('INTERNAL.')) {
        return null; // Skip this entire token
      }

      // Round numeric values to a sensible precision so that we avoid
      // floating point noise in the generated tokens (for example,
      // letter-spacing 0.4000000059604645 -> 0.4). This applies to both
      // semantic and primitive tokens.
      if (typeof value === 'number' && Number.isFinite(value)) {
        const rounded = Number(value.toFixed(4));
        normalized[key] = rounded;
        continue;
      }

      // Preserve other values as-is
      normalized[key] = value;
      continue;
    }

    // Check for hiddenFromPublishing flag (only filter for semantic tokens)
    // Note: Primitives may have hiddenFromPublishing but we keep them (they're needed for references)
    if (key === '$extensions' && !isPrimitive && value?.['com.figma.hiddenFromPublishing'] === true) {
      return null; // Skip this entire token
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
