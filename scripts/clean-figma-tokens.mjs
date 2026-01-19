#!/usr/bin/env node

/**
 * Script to clean Figma token exports
 * 
 * This script:
 * 1. Converts color objects to CSS color strings (hex/rgba)
 * 2. Removes $extensions metadata
 * 3. Makes JSON files cleaner and smaller
 * 
 * Usage:
 *   node scripts/clean-figma-tokens.mjs [path-to-tokens-dir]
 * 
 * Default: tokens/json/
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const TOKENS_DIR = process.argv[2] || 'tokens/json';

// Helper function to convert color object to CSS color string
function colorObjectToString(colorObj) {
  if (!colorObj || typeof colorObj !== 'object') {
    return null;
  }

  // If it has hex property, use that
  if (colorObj.hex && typeof colorObj.hex === 'string') {
    const hex = colorObj.hex.toLowerCase();
    // Handle alpha transparency
    if (colorObj.alpha !== undefined && colorObj.alpha < 1) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const roundedAlpha = Math.round(colorObj.alpha * 1000) / 1000;
      return `rgba(${r}, ${g}, ${b}, ${roundedAlpha})`;
    }
    return hex;
  }

  // If it has components array, convert to rgba or hex
  if (Array.isArray(colorObj.components) && colorObj.components.length >= 3) {
    const [r, g, b] = colorObj.components;
    const alpha = colorObj.alpha !== undefined ? colorObj.alpha : 1;
    const r255 = Math.round(r * 255);
    const g255 = Math.round(g * 255);
    const b255 = Math.round(b * 255);

    if (alpha < 1) {
      const roundedAlpha = Math.round(alpha * 1000) / 1000;
      return `rgba(${r255}, ${g255}, ${b255}, ${roundedAlpha})`;
    }

    // Convert to hex if fully opaque
    const toHex = (n) => Math.round(n).toString(16).padStart(2, '0');
    return `#${toHex(r255)}${toHex(g255)}${toHex(b255)}`.toLowerCase();
  }

  return null;
}

// Convert Figma variable path to Style Dictionary reference format
// Example: "scania/color/transparent/invisible/dark" -> "{scania.color.transparent.invisible.dark}"
function convertFigmaPathToReference(figmaPath) {
  if (!figmaPath || typeof figmaPath !== 'string') {
    return null;
  }
  // Convert slashes to dots and wrap in braces
  const reference = `{${figmaPath.replace(/\//g, '.')}}`;
  return reference;
}

// Recursively clean a JSON object
function cleanTokenObject(obj, path = '') {
  if (Array.isArray(obj)) {
    return obj.map((item, index) => cleanTokenObject(item, `${path}[${index}]`));
  }

  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const cleaned = {};
  
  // Check if this token has alias data (reference information)
  // Structure: $extensions["com.figma.aliasData"].targetVariableName
  let aliasData = null;
  let targetVariableName = null;
  if (obj.$extensions && obj.$extensions['com.figma.aliasData']) {
    aliasData = obj.$extensions['com.figma.aliasData'];
    targetVariableName = aliasData.targetVariableName;
  }

  for (const [key, value] of Object.entries(obj)) {
    // Skip $extensions - we'll preserve targetVariableName separately if it exists
    if (key === '$extensions') {
      continue;
    }

    // Handle $value
    if (key === '$value') {
      // First, check if this is already a reference (starts with {)
      if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
        // Already a reference - keep it as is!
        cleaned[key] = value;
        continue;
      }

      // If not a reference, check if we should restore a reference from aliasData
      if (aliasData && aliasData.targetVariableName) {
        // This token has a reference in aliasData - restore it!
        const reference = convertFigmaPathToReference(aliasData.targetVariableName);
        if (reference) {
          cleaned[key] = reference;
          continue; // Skip further processing, we've restored the reference
        }
      }

      // If no reference to restore, handle color objects
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Check if it's a color object
        if (value.hex || (Array.isArray(value.components) && value.components.length >= 3) || value.colorSpace) {
          const colorString = colorObjectToString(value);
          if (colorString) {
            cleaned[key] = colorString;
          } else {
            // Keep original if conversion fails
            cleaned[key] = value;
            console.warn(`⚠️  Could not convert color object at ${path}.$value`);
          }
        } else {
          // Not a color object, keep as is
          cleaned[key] = cleanTokenObject(value, `${path}.${key}`);
        }
      } else {
        // String or number value - keep as is (might be a reference already or a resolved value)
        cleaned[key] = value;
      }
    } else {
      // Recursively clean nested objects
      cleaned[key] = cleanTokenObject(value, path ? `${path}.${key}` : key);
    }
  }

  // Preserve targetVariableName in a minimal $extensions for traceability
  // This helps track the original Figma variable reference
  if (targetVariableName) {
    cleaned.$extensions = {
      'com.figma.aliasData': {
        targetVariableName: targetVariableName
      }
    };
  }

  return cleaned;
}

// Restructure tokens to include brand/theme in path to avoid Style Dictionary collisions
// Example: component.popover.placeholder-fill -> component.scania.light.popover.placeholder-fill
function restructureTokensByBrandTheme(tokens, filePath) {
  // Extract brand and theme from file path
  // Pattern: tokens/json/semantic/scania-light.json -> { brand: 'scania', theme: 'light' }
  const fileName = filePath.split('/').pop() || '';
  const match = fileName.match(/^(scania|traton)-(light|dark)\.json$/);
  
  if (!match) {
    // Not a semantic file, return as-is
    return tokens;
  }
  
  const [, brand, theme] = match;
  
  // Only restructure component and text tokens to avoid collisions
  // Other tokens (color, dimension, typography) are handled separately per theme
  const restructured = { ...tokens };
  
  // Restructure component tokens: component.X -> component.brand.theme.X
  if (restructured.component) {
    restructured.component = {
      [brand]: {
        [theme]: restructured.component
      }
    };
  }
  
  // Restructure text tokens: text.X -> text.brand.theme.X
  if (restructured.text) {
    restructured.text = {
      [brand]: {
        [theme]: restructured.text
      }
    };
  }
  
  return restructured;
}

// Process a single JSON file
function processFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const tokens = JSON.parse(content);
    
    const cleaned = cleanTokenObject(tokens);
    
    // Restructure component/text tokens to include brand/theme in path
    // This prevents Style Dictionary collisions when merging multiple semantic files
    const restructured = restructureTokensByBrandTheme(cleaned, filePath);
    
    const cleanedJson = JSON.stringify(restructured, null, 2);
    
    writeFileSync(filePath, cleanedJson, 'utf8');
    return true;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Recursively find all JSON files
function findJsonFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      findJsonFiles(filePath, fileList);
    } else if (extname(file) === '.json') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Main execution function
export function cleanFigmaTokens(tokensDir = TOKENS_DIR) {
  console.log(`🧹 Cleaning Figma tokens in: ${tokensDir}\n`);

  const jsonFiles = findJsonFiles(tokensDir);
  let processed = 0;
  let errors = 0;

  jsonFiles.forEach(file => {
    if (processFile(file)) {
      processed++;
      console.log(`✅ Cleaned: ${file}`);
    } else {
      errors++;
    }
  });

  console.log(`\n✨ Done! Processed ${processed} files${errors > 0 ? `, ${errors} errors` : ''}`);
}

// Run if executed directly (not imported)
// Check if this file is being run directly (not imported as a module)
const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMainModule) {
  cleanFigmaTokens();
}
