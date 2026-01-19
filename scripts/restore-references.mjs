#!/usr/bin/env node

/**
 * Script to restore token references from git history
 * 
 * This script restores references for tokens that have resolved values
 * by checking git history for the correct references.
 * 
 * It will:
 * - Restore references (e.g., #ffffff → {scania.color.white})
 * - Restore targetVariableName from git history if missing in current files
 * - NOT overwrite existing targetVariableName (preserves what clean-figma-tokens.mjs already preserved)
 * - Skip tokens that already have correct references
 * 
 * Usage:
 *   node scripts/restore-references.mjs
 * 
 * Note: This is a recovery tool. Normally, clean-figma-tokens.mjs handles
 * reference restoration automatically during the build process.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const SEMANTIC_DIR = 'tokens/json/semantic';
const files = [
  'scania-light.json',
  'scania-dark.json',
  'traton-light.json',
  'traton-dark.json'
];

// Get correct references from git history
function getReferencesFromGit(fileName) {
  try {
    const gitPath = `HEAD:tokens/json/semantic/${fileName}`;
    const content = execSync(`git show ${gitPath}`, { encoding: 'utf8' });
    return JSON.parse(content);
  } catch (error) {
    console.warn(`⚠️  Could not get git history for ${fileName}:`, error.message);
    return null;
  }
}

// Restore references in a token object
function restoreReferences(currentObj, gitObj, path = '') {
  if (!gitObj || typeof gitObj !== 'object' || Array.isArray(gitObj)) {
    return currentObj;
  }

  const restored = { ...currentObj };

  // Check if current and git have $extensions with targetVariableName
  const currentExtensions = currentObj.$extensions;
  const currentTargetVariableName = currentExtensions?.['com.figma.aliasData']?.targetVariableName;
  const gitExtensions = gitObj?.$extensions;
  const gitTargetVariableName = gitExtensions?.['com.figma.aliasData']?.targetVariableName;

  for (const [key, value] of Object.entries(currentObj)) {
    const currentPath = path ? `${path}.${key}` : key;
    const gitValue = gitObj?.[key];

    // If this is a token with $value
    if (key === '$value' && typeof value === 'string') {
      // Skip if already a reference (don't overwrite correct references)
      if (value.startsWith('{') && value.endsWith('}')) {
        // Already a reference - check if we need to restore targetVariableName
        if (gitTargetVariableName && !currentTargetVariableName) {
          if (!restored.$extensions) {
            restored.$extensions = {};
          }
          if (!restored.$extensions['com.figma.aliasData']) {
            restored.$extensions['com.figma.aliasData'] = {};
          }
          restored.$extensions['com.figma.aliasData'].targetVariableName = gitTargetVariableName;
          console.log(`   📝 Restored targetVariableName at ${currentPath}: ${gitTargetVariableName}`);
        }
        continue;
      }

      // Check if current value is a resolved value (not a reference)
      const isResolvedValue = 
        !value.startsWith('{') && 
        (value.match(/^rgba?\(/) || value.match(/^#/) || /^\d+$/.test(value));

      // Check if git has a reference for this
      if (isResolvedValue && gitValue && typeof gitValue === 'string' && gitValue.startsWith('{')) {
        console.log(`✅ Restoring reference at ${currentPath}: ${value} → ${gitValue}`);
        restored[key] = gitValue;
        
        // Also restore targetVariableName if available and not already present
        if (gitTargetVariableName && !currentTargetVariableName) {
          if (!restored.$extensions) {
            restored.$extensions = {};
          }
          if (!restored.$extensions['com.figma.aliasData']) {
            restored.$extensions['com.figma.aliasData'] = {};
          }
          restored.$extensions['com.figma.aliasData'].targetVariableName = gitTargetVariableName;
          console.log(`   📝 Restored targetVariableName: ${gitTargetVariableName}`);
        }
        continue;
      }
    }

    // Recursively process nested objects
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      restored[key] = restoreReferences(value, gitValue, currentPath);
    }
  }

  // If we're at a token level and git has targetVariableName but current doesn't, preserve it
  // Only restore if current doesn't already have it (don't overwrite existing targetVariableName)
  if (gitTargetVariableName && !currentTargetVariableName && currentObj.$value) {
    if (!restored.$extensions) {
      restored.$extensions = {};
    }
    if (!restored.$extensions['com.figma.aliasData']) {
      restored.$extensions['com.figma.aliasData'] = {};
    }
    restored.$extensions['com.figma.aliasData'].targetVariableName = gitTargetVariableName;
    console.log(`   📝 Restored targetVariableName at ${path}: ${gitTargetVariableName}`);
  }

  return restored;
}

// Process a single file
function processFile(fileName) {
  const filePath = join(process.cwd(), SEMANTIC_DIR, fileName);
  
  console.log(`\n📄 Processing ${fileName}...`);
  
  // Read current file
  const currentContent = JSON.parse(readFileSync(filePath, 'utf8'));
  
  // Get correct references from git
  const gitContent = getReferencesFromGit(fileName);
  
  if (!gitContent) {
    console.log(`⚠️  Skipping ${fileName} - no git history available`);
    return false;
  }
  
  // Restore references
  const restored = restoreReferences(currentContent, gitContent);
  
  // Write back
  writeFileSync(filePath, JSON.stringify(restored, null, 2), 'utf8');
  
  console.log(`✅ Restored references in ${fileName}`);
  return true;
}

// Main execution
console.log('🔄 Restoring token references from git history...\n');

let processed = 0;
files.forEach(file => {
  if (processFile(file)) {
    processed++;
  }
});

console.log(`\n✨ Done! Processed ${processed} files`);
