#!/usr/bin/env node
/**
 * Simplified Style Dictionary Configuration
 * 
 * This config uses normalized tokens from tokens/dist/ and focuses purely on
 * output generation without any Figma-specific transformations or filtering.
 */

import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { readFileSync } from 'fs';
import { join } from 'path';

register(StyleDictionary); // Register Token Studio transforms

// Brand+mode only: component tokens use .${brand} .tds-mode-${theme} (no component host selectors).
const BRANDS = ['scania', 'traton'];
const getBrandModeSelector = (brand, theme) => `.${brand} .tds-mode-${theme}`;

// Cache for semantic theme JSON files so we can recover brand-specific
// component values even when Style Dictionary has merged tokens.
const semanticThemeCache = new Map();

function getSemanticThemeJson(themeName) {
  if (!semanticThemeCache.has(themeName)) {
    const themePath = join(process.cwd(), 'tokens', 'dist', 'semantic', `${themeName}.json`);
    const json = JSON.parse(readFileSync(themePath, 'utf8'));
    semanticThemeCache.set(themeName, json);
  }
  return semanticThemeCache.get(themeName);
}

function getBrandThemeName(brand, themeKey) {
  const brandInfo = brands.get(brand);
  if (!brandInfo) return null;
  const match = brandInfo.themes.find(t => t.name.endsWith(`-${themeKey}`));
  return match ? match.name : null;
}

function getComponentValueFromSemanticJson(brand, themeKey, rawParts) {
  const themeName = getBrandThemeName(brand, themeKey);
  if (!themeName) return null;
  const json = getSemanticThemeJson(themeName);

  let node = json;
  const fullPath = ['component', ...rawParts];
  for (const part of fullPath) {
    if (!node || typeof node !== 'object') return null;
    node = node[part];
  }
  if (!node || typeof node !== 'object' || node.$value === undefined) {
    return null;
  }
  const refValue = node.$value;
  if (typeof refValue === 'string' && refValue.startsWith('{') && refValue.endsWith('}')) {
    const refPath = refValue
      .slice(1, -1)
      .split('.')
      .join('-')
      .replace(/\s+/g, '-');
    return `var(--${refPath})`;
  }
  return refValue;
}

// Register custom format for component files
StyleDictionary.registerFormat({
  name: 'component/variables',
  format: function(args) {
    const dictionary = args.dictionary || args;
    if (!dictionary.allTokens || dictionary.allTokens.length === 0) {
      return `/**
 * Do not edit directly, this file was auto-generated.
 */

.text {
}
`;
    }

    // Per-theme build: only emit the block for this theme's brand (e.g. scania-light → .scania .tds-mode-light only)
    const themeName = args.options?.themeName || null;
    const brandOnly = themeName ? themeName.split('-')[0] : null;

    const tokenByThemeAndBrand = new Map();
    const variableMeta = new Map();
    
    dictionary.allTokens.forEach(token => {
      if (token.path[0] !== 'component') {
        return;
      }

      const rawParts = token.path.slice(1);
      const pathParts = rawParts
        .map(part =>
          part
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-]/g, '')
            .replace(/^[-]+/, '')
        )
        .filter(part => part.length > 0);
      const variableName = ['component', ...pathParts].join('-');
      if (!variableMeta.has(variableName)) {
        variableMeta.set(variableName, { rawParts });
      }
      
      let value = null;
      
      if (token.original && token.original.$value) {
        const refValue = token.original.$value;
        if (typeof refValue === 'string' && refValue.startsWith('{')) {
          const refPath = refValue
            .slice(1, -1)
            .split('.')
            .join('-')
            .replace(/\s+/g, '-');
          value = `var(--${refPath})`;
        } else {
          value = refValue;
        }
      } else if (token.value) {
        value = token.value;
      }
      
      if (!value) {
        return;
      }
      
      const filePath = ((token.filePath || token.original?.filePath || '') + '').toLowerCase();
      let brand = null;
      let theme = null;
      
      if (filePath.includes('scania-light')) {
        brand = 'scania';
        theme = 'light';
      } else if (filePath.includes('scania-dark')) {
        brand = 'scania';
        theme = 'dark';
      } else if (filePath.includes('traton-light')) {
        brand = 'traton';
        theme = 'light';
      } else if (filePath.includes('traton-dark')) {
        brand = 'traton';
        theme = 'dark';
      }
      
      if (!brand || !theme) {
        return;
      }
      
      if (!tokenByThemeAndBrand.has(variableName)) {
        tokenByThemeAndBrand.set(variableName, new Map());
      }
      const themeMap = tokenByThemeAndBrand.get(variableName);
      if (!themeMap.has(theme)) {
        themeMap.set(theme, new Map());
      }
      themeMap.get(theme).set(brand, value);
    });
    
    const tokensByTheme = new Map();
    
    tokenByThemeAndBrand.forEach((themeMap, variableName) => {
      themeMap.forEach((brandMap, theme) => {
        if (!tokensByTheme.has(theme)) {
          tokensByTheme.set(theme, new Map());
        }
        const themeTokens = tokensByTheme.get(theme);
        if (!themeTokens.has(variableName)) {
          themeTokens.set(variableName, new Map());
        }
        brandMap.forEach((value, brand) => {
          themeTokens.get(variableName).set(brand, value);
        });
      });
    });

    // Backfill missing brand values per theme from the raw semantic JSON, so
    // components get full brand coverage even when Style Dictionary merged
    // tokens (last-wins) for a given path. Skip backfill for other brands when
    // doing per-theme build (brandOnly) so we only emit one block per file.
    tokensByTheme.forEach((variableMap, themeKey) => {
      variableMap.forEach((brandMap, variableName) => {
        const meta = variableMeta.get(variableName);
        if (!meta) return;
        const brandsToBackfill = brandOnly ? [brandOnly] : BRANDS;
        brandsToBackfill.forEach(brand => {
          if (!brandMap.has(brand)) {
            const recovered = getComponentValueFromSemanticJson(brand, themeKey, meta.rawParts);
            if (recovered !== null && recovered !== undefined) {
              brandMap.set(brand, recovered);
            }
          }
        });
      });
    });
    
    let output = `/**
 * Do not edit directly, this file was auto-generated.
 */

`;
    
    const themeSections = [];
    
    if (tokensByTheme.has('light')) {
      const lightTokens = tokensByTheme.get('light');
      const lightBaseTokens = new Map();
      const lightByBrand = new Map();
      const lightBrands = new Set();

      lightTokens.forEach((brandMap, variableName) => {
        brandMap.forEach((value, brand) => lightBrands.add(brand));
        const values = Array.from(brandMap.values());
        const uniqueValues = new Set(values);
        if (uniqueValues.size === 1) {
          lightBaseTokens.set(variableName, values[0]);
        } else {
          brandMap.forEach((value, brand) => {
            if (!lightByBrand.has(brand)) lightByBrand.set(brand, new Map());
            lightByBrand.get(brand).set(variableName, value);
          });
        }
      });

      const lightBrandsToEmit = brandOnly !== null
        ? (lightBrands.has(brandOnly) ? [brandOnly] : [])
        : BRANDS.filter(b => lightBrands.has(b));

      lightBrandsToEmit.forEach(brand => {
        const merged = new Map([...lightBaseTokens, ...(lightByBrand.get(brand) || new Map())]);
        const variables = Array.from(merged.entries())
          .map(([name, value]) => `  --${name}: ${value};`)
          .join('\n');
        if (variables) {
          themeSections.push(`${getBrandModeSelector(brand, 'light')} {
${variables}
}
`);
        }
      });
    }
    
    if (tokensByTheme.has('dark')) {
      const darkTokens = tokensByTheme.get('dark');

      const darkByBrand = new Map();

      darkTokens.forEach((brandMap, variableName) => {
        brandMap.forEach((value, brand) => {
          if (!darkByBrand.has(brand)) {
            darkByBrand.set(brand, new Map());
          }
          darkByBrand.get(brand).set(variableName, value);
        });
      });

      let darkBrandsToEmit;
      if (brandOnly == null) {
        darkBrandsToEmit = Array.from(darkByBrand.keys());
      } else if (darkByBrand.has(brandOnly)) {
        darkBrandsToEmit = [brandOnly];
      } else {
        darkBrandsToEmit = [];
      }

      darkBrandsToEmit.forEach(brand => {
        const tokens = darkByBrand.get(brand);
        if (!tokens) return;
        const darkVariables = Array.from(tokens.entries())
          .map(([name, value]) => `  --${name}: ${value};`)
          .join('\n');
        
        if (darkVariables) {
          themeSections.push(`${getBrandModeSelector(brand, 'dark')} {
${darkVariables}
}
`);
        }
      });
    }
    
    if (themeSections.length > 0) {
      output += themeSections.join('\n');
    }
    
    return output;
  }
});

// Helper function to extract brand information from themes
function extractBrandInfo(themes) {
  const brands = new Map();
  
  themes.forEach(theme => {
    if (theme.group === 'semantic') {
      const brandName = theme.name.split('-')[0];
      if (!brands.has(brandName)) {
        brands.set(brandName, {
          name: brandName,
          themes: [],
          selectors: {
            base: `.${brandName}`,
            light: `.${brandName} .tds-mode-light`,
            dark: `.${brandName} .tds-mode-dark`
          }
        });
      }
      brands.get(brandName).themes.push(theme);
    }
  });
  
  return brands;
}

// List of [componentName, matchType] for component token files (used for both merged and per-theme builds)
const COMPONENT_FILE_LIST = [
  ['header', 'includes'],
  ['side menu', 'includes'],
  ['card', 'includes'],
  ['input-field', 'includes'],
  ['table', 'exact'],
  ['stepper', 'exact'],
  ['spinner', 'exact'],
  ['footer', 'exact'],
  ['dropdown', 'exact'],
  ['badge', 'exact'],
  ['button', 'exact'],
  ['chip', 'exact'],
   ['tag', 'exact'],
  ['logo', 'exact'],
  ['shadow', 'exact'],
  ['cookie', 'exact'],
  ['text', 'exact'],
];

// Helper function to create component file configuration
function createComponentFile(componentName, matchType = 'exact') {
  const destination = `component/${componentName}.scss`;
  const matchFn = matchType === 'includes' ? 'includes' : 'exact';

  const filterFn = token => {
    if (token.path[0] !== 'component') {
      return false;
    }
    // Handle component names with -- prefix (e.g., --shadow, --input-field)
    const actualComponentName = token.path[1]?.replace(/^--/, '') || '';
    if (matchFn === 'includes') {
      return actualComponentName.includes(componentName);
    }
    return actualComponentName === componentName;
  };
  
  return {
    destination,
    format: 'component/variables',
    filter: filterFn,
    options: {
      showFileHeader: true,
      outputReferences: true
    }
  };
}

// Read themes configuration
const themesPath = join(process.cwd(), 'tokens', 'json', '$themes.json');
const themes = JSON.parse(readFileSync(themesPath, 'utf8'));
const brands = extractBrandInfo(themes);

export const componentThemeNames = Array.from(brands.values()).flatMap(brand =>
  brand.themes.map(theme => theme.name)
);

// Helper to create component file config for per-theme build (writes to build/scss/component/<name>-<theme>.scss)
function createComponentFileForTheme(componentName, themeName, matchType = 'exact') {
  const base = createComponentFile(componentName, matchType);
  const safeName = componentName.replace(/\s+/g, '-');
  return {
    ...base,
    destination: `component/${safeName}-${themeName}.scss`,
    options: { ...base.options, themeName }
  };
}

export function getComponentConfigForTheme(themeName) {
  return {
    source: [
      'tokens/dist/primitive/default.json',
      `tokens/dist/semantic/${themeName}.json`
    ],
    platforms: {
      component: {
        transforms: [
          'ts/descriptionToComment',
          'ts/resolveMath',
          'ts/size/px',
          'ts/opacity',
          'ts/size/lineheight',
          'ts/typography/fontWeight',
          'ts/color/modifiers',
          'ts/color/css/hexrgba',
          'ts/size/css/letterspacing',
          'attribute/cti',
          'name/kebab',
        ],
        buildPath: 'build/scss/',
        files: COMPONENT_FILE_LIST.map(([name, matchType]) =>
          createComponentFileForTheme(name, themeName, matchType)
        )
      }
    }
  };
}

// ============================================================================
// PRIMITIVE TOKENS CONFIG
// ============================================================================
const primitiveConfig = {
  source: ['tokens/dist/primitive/**/*.json'],
  platforms: {
    scss: {
      transforms: [
        'ts/descriptionToComment',
        'ts/opacity',
        'ts/size/lineheight',
        'ts/typography/fontWeight',
        'ts/color/modifiers',
        'ts/color/css/hexrgba',
        'ts/size/css/letterspacing',
        'ts/shadow/innerShadow',
        'attribute/cti',
        'name/kebab',
      ],
      buildPath: 'tokens/scss/',
      files: Array.from(brands.values()).map(brand => ({
        destination: `${brand.name}/primitive.scss`,
        format: 'css/variables',
        filter: token => {
          // Only include tokens for this brand
          return token.name.startsWith(`${brand.name}-`);
        },
        options: {
          showFileHeader: true,
          outputReferences: true
        }
      }))
    }
  }
};

// ============================================================================
// THEME CONFIGURATIONS (Color, Dimension, Typography)
// ============================================================================
const themeConfigs = Array.from(brands.values()).reduce((configs, brand) => {
  brand.themes.forEach(theme => {
    const themeName = theme.name;
    const themeType = themeName.split('-')[1]; // light or dark
    
    // Special selector for color tokens
    const colorTokensSelector = brand.name === 'scania'
      ? themeType === 'light'
        ? `:root,\n.tds-mode-light,\n.scania .tds-mode-light`
        : `.tds-mode-dark,\n.scania .tds-mode-dark`
      : themeType === 'light'
        ? `.traton,\n.traton .tds-mode-light`
        : `.traton .tds-mode-dark`;

    configs[themeName] = {
      source: [
        'tokens/dist/primitive/default.json',
        `tokens/dist/semantic/${themeName}.json`
      ],
      platforms: {
        scss: {
          transforms: [
            'ts/descriptionToComment',
            'ts/resolveMath',
            'ts/size/px',
            'ts/opacity',
            'ts/size/lineheight',
            'ts/typography/fontWeight',
            'ts/color/modifiers',
            'ts/color/css/hexrgba',
            'ts/size/css/letterspacing',
            'ts/shadow/innerShadow',
            'attribute/cti',
            'name/kebab',
          ],
          buildPath: `tokens/scss/${brand.name}/`,
          files: [
            {
              destination: `color-${themeType}.scss`,
              format: 'css/variables',
              filter: token => {
                // Only color tokens
                if (token.path[0] !== 'color') return false;
                
                // Check if semantic token (from semantic files)
                const filePath = ((token.filePath || token.original?.filePath || '') + '').toLowerCase();
                const tokenName = token.name || '';
                const isSemanticToken = filePath.includes('semantic') ||
                                       (!tokenName.startsWith(`${brand.name}-`) && 
                                        !tokenName.startsWith('scania-') && 
                                        !tokenName.startsWith('traton-'));
                
                if (isSemanticToken) {
                  return true; // Include semantic color tokens
                }
                
                // Allow primitive color tokens only if they're referenced and match the brand
                if (filePath.includes('primitive')) {
                  return token.isReferenced && token.name.startsWith(`${brand.name}-`);
                }
                
                return false;
              },
              options: {
                showFileHeader: true,
                selector: colorTokensSelector,
                outputReferences: true,
              }
            },
            {
              destination: `dimension.scss`,
              format: 'css/variables',
              filter: token => {
                // Only dimension tokens
                if (token.path[0] !== 'dimension') return false;
                
                // Check if semantic token
                const filePath = ((token.filePath || token.original?.filePath || '') + '').toLowerCase();
                const tokenName = token.name || '';
                const isSemanticToken = filePath.includes('semantic') ||
                                       (!tokenName.startsWith(`${brand.name}-`) && 
                                        !tokenName.startsWith('scania-') && 
                                        !tokenName.startsWith('traton-'));
                
                if (isSemanticToken && tokenName.startsWith('dimension-')) {
                  return true;
                }
                
                // Allow primitive unit tokens if referenced
                if (filePath.includes('primitive')) {
                  return token.isReferenced && tokenName.includes('-unit-') && tokenName.startsWith(`${brand.name}-`);
                }
                
                return false;
              },
              options: {
                showFileHeader: true,
                selector: brand.selectors.base,
                outputReferences: true,
              }
            },
            {
              destination: `typography.scss`,
              format: 'css/variables',
              filter: token => {
                // Only typography tokens (type.*)
                return token.path[0] === 'type';
              },
              options: {
                showFileHeader: true,
                selector: brand.selectors.base,
                outputReferences: true,
              }
            }
          ]
        }
      }
    };
  });
  
  return configs;
}, {});

// ============================================================================
// COMPONENT TOKENS CONFIG
// ============================================================================
const componentConfig = {
  source: [
    'tokens/dist/primitive/default.json',
    ...Array.from(brands.values()).flatMap(brand => 
      brand.themes.map(theme => `tokens/dist/semantic/${theme.name}.json`)
    )
  ],
  platforms: {
    component: {
      transforms: [
        'ts/descriptionToComment',
        'ts/resolveMath',
        'ts/size/px',
        'ts/opacity',
        'ts/size/lineheight',
        'ts/typography/fontWeight',
        'ts/color/modifiers',
        'ts/color/css/hexrgba',
        'ts/size/css/letterspacing',
        'attribute/cti',
        'name/kebab',
      ],
      buildPath: 'tokens/scss/',
      files: COMPONENT_FILE_LIST.map(([name, matchType]) => createComponentFile(name, matchType))
    }
  }
};

// Export the configurations
export default {
  primitive: primitiveConfig,
  component: componentConfig,
  ...themeConfigs
};
