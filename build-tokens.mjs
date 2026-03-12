import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import config, {
  getComponentConfigForTheme,
  componentThemeNames,
} from './style-dictionary.config.mjs';
import { main as normalizeTokens } from './figma-to-tokens.mjs';
import { mkdirSync, writeFileSync, existsSync, readFileSync, unlinkSync, readdirSync, rmdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

// List of files that should always exist (even if empty)
const filesToPreserve = [
  'tokens/scss/component/dropdown.scss',
  'tokens/scss/component/side-menu.scss',
  'tokens/scss/component/text.scss',
  'tokens/scss/scania/typography.scss',
  'tokens/scss/traton/typography.scss',
  'tokens/scss/scania/dimension.scss',
  'tokens/scss/traton/dimension.scss',
  'tokens/scss/scania/scania-icons.scss',
  'tokens/scss/scania/scania-icons-primitive.scss',
  'tokens/scss/traton/traton-icons.scss',
  'tokens/scss/traton/traton-icons-primitive.scss',
];

// Helper function to create empty file with header
function createEmptyFile(filePath) {
  const fullPath = join(process.cwd(), filePath);
  const dir = dirname(fullPath);
  mkdirSync(dir, { recursive: true });
  
  // Determine format based on file path
  let content = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n';
  
  if (filePath.includes('component/')) {
    // Component format
    const componentName = filePath.split('/').pop().replace('.scss', '');
    content += `.${componentName} {\n}\n`;
  } else if (
    filePath.includes('typography') ||
    filePath.includes('dimension') ||
    filePath.includes('icons')
  ) {
    // Brand-scoped format (typography, dimension, icons)
    const brand = filePath.includes('scania') ? 'scania' : 'traton';
    content += `.${brand} {\n}\n`;
  } else {
    // Default format
    content += ':root {\n}\n';
  }
  
  writeFileSync(fullPath, content, 'utf8');
}

function combineComponentThemeFiles(componentBuildPath, finalComponentDir, componentHeader, themeOrder) {
  const byBase = new Map();
  if (existsSync(componentBuildPath)) {
    for (const file of readdirSync(componentBuildPath)) {
      if (!file.endsWith('.scss')) continue;
      const namePart = file.slice(0, -5);
      const parts = namePart.split('-');
      if (parts.length < 3) continue;
      const themeName = parts.slice(-2).join('-');
      const baseName = parts.slice(0, -2).join('-');
      if (!themeOrder.includes(themeName)) continue;
      if (!byBase.has(baseName)) byBase.set(baseName, new Map());
      byBase.get(baseName).set(themeName, join(componentBuildPath, file));
    }
  }

  for (const [baseName, themeFiles] of byBase) {
    const sections = [];
    for (const themeName of themeOrder) {
      const path = themeFiles.get(themeName);
      if (!path || !existsSync(path)) continue;
      const content = readFileSync(path, 'utf8');
      const afterComment = content.split('*/')[1];
      if (afterComment) sections.push(afterComment.trim());
    }
    if (sections.length > 0) {
      const outPath = join(finalComponentDir, `${baseName}.scss`);
      writeFileSync(outPath, componentHeader + sections.join('\n\n'), 'utf8');
    }
  }
}

function cleanupComponentBuildDir(componentBuildPath) {
  if (!existsSync(componentBuildPath)) {
    return;
  }
  for (const file of readdirSync(componentBuildPath)) {
    unlinkSync(join(componentBuildPath, file));
  }
  rmdirSync(componentBuildPath);
}

function buildThemeGroups(configObject) {
  const themeGroups = {};
  Object.entries(configObject)
    .filter(([key]) => key !== 'primitive' && key !== 'component')
    .forEach(([themeName, themeConfig]) => {
      const brand = themeName.split('-')[0];
      if (!themeGroups[brand]) {
        themeGroups[brand] = [];
      }
      themeGroups[brand].push([themeName, themeConfig]);
    });
  return themeGroups;
}

async function runBuild() {
  // Normalize tokens from Figma export to Style Dictionary format
  console.log('Normalizing tokens from Figma export...\n');
  normalizeTokens();

  register(StyleDictionary);

  // Build primitive tokens
  const primitiveSD = new StyleDictionary({
    ...config.primitive,
    log: { verbosity: 'verbose' }
  });
  await primitiveSD.buildAllPlatforms();

  // Build component tokens per theme (one run per theme so light + dark both get emitted)
  const componentBuildPath = join(process.cwd(), 'build', 'scss', 'component');
  mkdirSync(componentBuildPath, { recursive: true });

  const THEME_ORDER = ['scania-light', 'traton-light', 'scania-dark', 'traton-dark'];

  console.log('Building component tokens per theme...');
  for (const themeName of componentThemeNames) {
    console.log(`  ${themeName}...`);
    const themeConfig = getComponentConfigForTheme(themeName);
    await new StyleDictionary({ ...themeConfig, log: { verbosity: 'default' } }).buildAllPlatforms();
  }

  // Combine per-theme component files into final tokens/scss/component/<name>.scss
  console.log('Combining component theme files...');
  const finalComponentDir = join(process.cwd(), 'tokens', 'scss', 'component');
  mkdirSync(finalComponentDir, { recursive: true });

  const componentHeader = `/**
 * Do not edit directly, this file was auto-generated.
 */

`;

  combineComponentThemeFiles(componentBuildPath, finalComponentDir, componentHeader, THEME_ORDER);

  // Remove intermediate per-theme files (only final combined files are kept in tokens/scss/component/)
  cleanupComponentBuildDir(componentBuildPath);

  // Build theme-specific tokens, grouped by brand so typography.scss is shared across modes
  const themeGroups = buildThemeGroups(config);
  await buildThemes(themeGroups);
}

// Generic function to clean SCSS files - filter tokens by prefix
const cleanScssFile = (filePath, keepToken) => {
  if (!existsSync(filePath)) {
    return { kept: 0, removed: 0 };
  }
  
  const content = readFileSync(filePath, 'utf8');
  const cleanedLines = [];
  let kept = 0, removed = 0;
  
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    
    // Keep structure: empty lines, comments, selectors, braces
    if (!trimmed || /^[/*]/.test(trimmed) || trimmed === '{' || trimmed === '}' ||
        trimmed.startsWith('.') || trimmed.startsWith(':')) {
      cleanedLines.push(line);
      continue;
    }
    
    // For tokens, check if we should keep them
    if (trimmed.startsWith('--')) {
      const varName = trimmed.split(':')[0].trim();
      if (keepToken(varName)) {
        cleanedLines.push(line);
        kept++;
      } else {
        removed++;
      }
      continue;
    }
    
    cleanedLines.push(line);
  }
  
  writeFileSync(filePath, cleanedLines.join('\n'), 'utf8');
  return { kept, removed };
};

// Convert dimension file: fix raw values and wrong-brand references
const convertDimensionFile = (brand) => {
  const dimensionPath = join(process.cwd(), 'tokens', 'scss', brand, 'dimension.scss');
  if (!existsSync(dimensionPath)) {
    return false;
  }
  
  const content = readFileSync(dimensionPath, 'utf8');
  let converted = false;
  
  const lines = content.split('\n').map(line => {
    const trimmed = line.trim();
    if (!trimmed.startsWith('--dimension-')) return line;
    
    const indent = line.match(/^(\s*)/)?.[1] || '';
    const varName = trimmed.split(':')[0].trim();
    
    // Fix wrong-brand unit references
    const wrongBrand = trimmed.match(/var\(--(scania|traton)-unit-(\d+)\)/);
    if (wrongBrand && wrongBrand[1] !== brand) {
      converted = true;
      return `${indent}${varName}: var(--${brand}-unit-${wrongBrand[2]});`;
    }
    
    // Fix raw numeric values
    const rawValue = trimmed.match(/^--dimension-[^:]+:\s*(\d+)\s*;?\s*$/);
    if (rawValue) {
      converted = true;
      return `${indent}${varName}: var(--${brand}-unit-${rawValue[1]});`;
    }
    
    return line;
  });
  
  if (converted) {
    writeFileSync(dimensionPath, lines.join('\n'), 'utf8');
  }
  return converted;
};

// Extract typography tokens from a temp file, clean names, return unique tokens
const extractTypographyTokens = (filePath) => {
  if (!existsSync(filePath)) return [];
  
  const tokens = [];
  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    // Only collect --type-* tokens with valid values
    if (trimmed.startsWith('--type-') && !trimmed.includes(': undefined')) {
      // Remove brand/theme prefix: --type-scania-light-display-01 -> --type-display-01
      const cleaned = trimmed.replace(/^--type-(scania|traton)-(light|dark)-/, '--type-');
      tokens.push(cleaned);
    }
  }
  unlinkSync(filePath);
  return tokens;
};

// Build themes, handling typography deduplication across light/dark themes
const buildThemes = async (themeGroups) => {
  for (const [brand, themes] of Object.entries(themeGroups)) {
    const typographyPath = join(process.cwd(), 'tokens', 'scss', brand, 'typography.scss');
    mkdirSync(dirname(typographyPath), { recursive: true });
    
    // Use Set to deduplicate tokens across themes (light/dark have same typography)
    const typographyTokens = new Set();
    
    for (const [themeName, themeConfig] of themes) {
      console.log(`Building ${themeName}...`);
      
      // Redirect typography output to temp file
      const tempFile = `typography.${themeName}.tmp.scss`;
      const modifiedConfig = {
        ...themeConfig,
        platforms: {
          ...themeConfig.platforms,
          scss: {
            ...themeConfig.platforms.scss,
            files: themeConfig.platforms.scss.files.map(file => 
              file.destination === 'typography.scss' ? { ...file, destination: tempFile } : file
            )
          }
        }
      };
      
      await new StyleDictionary({ ...modifiedConfig, log: { verbosity: 'verbose' } }).buildAllPlatforms();
      
      // Extract tokens and add to set
      const tempPath = join(process.cwd(), 'tokens', 'scss', brand, tempFile);
      const tokens = extractTypographyTokens(tempPath);
      tokens.forEach(t => typographyTokens.add(t));
      console.log(`  Collected ${tokens.length} typography tokens from ${themeName}`);
    }
    
    // Write merged typography file
    const header = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n';
    const selector = brand === 'scania' ? '.scania' : '.traton';
    writeFileSync(typographyPath, `${header}${selector} {\n${[...typographyTokens].join('\n')}\n}`, 'utf8');
    console.log(`  Wrote typography.scss for ${brand} with ${typographyTokens.size} unique tokens`);
  
    // Clean up dimension.scss - keep dimension tokens and brand-specific unit tokens
    const dimensionPath = join(process.cwd(), 'tokens', 'scss', brand, 'dimension.scss');
    const dimResult = cleanScssFile(dimensionPath, name => 
      name.startsWith('--dimension-') || (name.includes('-unit-') && name.startsWith(`--${brand}-`))
    );
    console.log(`  Cleaned dimension.scss for ${brand} - kept ${dimResult.kept} tokens, removed ${dimResult.removed} unwanted tokens`);
    
    // Clean up color-dark.scss and color-light.scss - keep semantic color tokens only
    for (const themeType of ['dark', 'light']) {
      const colorPath = join(process.cwd(), 'tokens', 'scss', brand, `color-${themeType}.scss`);
      const colorResult = cleanScssFile(colorPath, name => name.startsWith('--color-'));
      console.log(`  Cleaned color-${themeType}.scss for ${brand} - kept ${colorResult.kept} tokens, removed ${colorResult.removed} unwanted tokens`);
    }
  }

  // Ensure all files that should exist are created (even if empty)
  filesToPreserve.forEach(filePath => {
    const fullPath = join(process.cwd(), filePath);
    if (!existsSync(fullPath)) {
      console.log(`Creating empty file: ${filePath}`);
      createEmptyFile(filePath);
    }
  });

  // Final pass: Convert dimension files (fix raw values and wrong-brand references)
  console.log('\nConverting dimension files...');
  ['scania', 'traton'].forEach(brand => {
    if (convertDimensionFile(brand)) {
      console.log(`  ✓ Converted ${brand} dimension file to use var() references`);
    }
  });
};

try {
  await runBuild();
} catch (err) {
  console.error(err);
  process.exit(1);
}