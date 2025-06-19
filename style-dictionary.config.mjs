import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { readFileSync } from 'fs';
import { join } from 'path';

register(StyleDictionary); // Register custom transforms

// Function to clean component names
function cleanComponentName(name) {
  return name
    .replace(/[🔴🔵❓]/g, '') // Remove emojis
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}

// Register custom format for component files
StyleDictionary.registerFormat({
  name: 'component/variables',
  format: function(dictionary, config) {
    if (!dictionary.allTokens || dictionary.allTokens.length === 0) {
      return `/**
 * Do not edit directly, this file was auto-generated.
 */

.text {
}
`;
    }

    const componentName = cleanComponentName(dictionary.allTokens[0]?.path[1] || '');
    
    // Build the variables string with explicit newlines and indentation
    const variables = dictionary.allTokens
      .map(token => {
        // Skip if not a component token
        if (token.path[0] !== 'component') {
          return null;
        }

        // Clean up the path parts
        const pathParts = token.path.slice(1).map(part => 
          part.replace(/[🔴🔵❓]/g, '')
              .trim()
              .replace(/\s+/g, '-')
              .replace(/[^a-zA-Z0-9-]/g, '') // Remove any other special characters
        );

        // Build the variable name
        const variableName = ['component', ...pathParts].join('-');
        
        // Get the value, handling references properly
        let value = null;
        
        if (token.original && token.original.$value) {
          const refValue = token.original.$value;
          if (typeof refValue === 'string' && refValue.startsWith('{')) {
            // Extract the reference path and convert it to a CSS variable
            const refPath = refValue.slice(1, -1).split('.').join('-');
            value = `var(--${refPath})`;
          } else {
            value = refValue;
          }
        } else if (token.value) {
          value = token.value;
        }
        
        // If no valid value is found, skip this token
        if (!value) {
          return null;
        }
        
        return `  --${variableName}: ${value};`;
      })
      .filter(Boolean) // Remove null entries
      .filter(line => line.trim() !== '') // Remove empty lines
      .join('\n');

    // Build the complete file content as a single string
    return `/**
 * Do not edit directly, this file was auto-generated.
 */

.${componentName} {
${variables}
}
`;
  }
});

// Function to extract brand information from themes
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

// Read themes configuration
const themesPath = join(process.cwd(), 'tokens', 'json', '$themes.json');
const themes = JSON.parse(readFileSync(themesPath, 'utf8'));
const brands = extractBrandInfo(themes);

// Create base configuration for primitive tokens
const primitiveConfig = {
  source: ['tokens/json/primitive/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'tokens-studio',
      transforms: ["attribute/cti", "name/kebab", "color/css"],
      buildPath: 'tokens/scss/',
      files: Array.from(brands.values()).map(brand => ({
        destination: `${brand.name}/primitive.scss`,
        format: 'css/variables',
        filter: token => token.name.startsWith(`${brand.name}-`),
        options: {
          showFileHeader: true,
          outputReferences: true
        }
      }))
    }
  }
};

// Create theme configurations dynamically
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
        ? `.traton, .traton .tds-mode-light`
        : `.traton .tds-mode-dark`;

    configs[themeName] = {
      source: [
        'tokens/json/primitive/default.json',
        `tokens/json/semantic/${themeName}.json`
      ],
      platforms: {
        scss: {
          transformGroup: 'tokens-studio',
          transforms: ["attribute/cti", "name/kebab", "color/css"],
          buildPath: `tokens/scss/${brand.name}/`,
          files: [
            {
              destination: `${themeType}.scss`,
              format: 'css/variables',
              filter: token => {
                if (token.path[0] === 'component' || 
                    token.path[0] === 'color' || 
                    token.path[0] === 'dimension' ||
                    token.name.startsWith('text-')) {
                  return false;
                }
                if (token.filePath.includes('semantic')) {
                  return true;
                }
                if (token.filePath.includes('primitive')) {
                  return token.isReferenced && token.name.startsWith(`${brand.name}-`);
                }
                return false;
              },
              options: {
                showFileHeader: true,
                outputReferences: true,
                selector: `.${themeName}`
              }
            },
            {
              destination: `color-${themeType}.scss`,
              format: 'css/variables',
              filter: token => {
                if (token.path[0] !== 'color') {
                  return false;
                }
                if (token.filePath.includes('semantic')) {
                  return true;
                }
                if (token.filePath.includes('primitive')) {
                  return token.isReferenced && token.name.startsWith(`${brand.name}-`);
                }
                return false;
              },
              options: {
                showFileHeader: true,
                outputReferences: true,
                selector: colorTokensSelector
              }
            },
            {
              destination: `dimension.scss`,
              format: 'css/variables',
              filter: token => {
                if (token.path[0] !== 'dimension') {
                  return false;
                }
                if (token.filePath.includes('semantic')) {
                  return true;
                }
                if (token.filePath.includes('primitive')) {
                  return token.isReferenced && token.name.startsWith(`${brand.name}-`);
                }
                return false;
              },
              options: {
                showFileHeader: true,
                outputReferences: true,
                selector: brand.selectors.base
              }
            },
            {
              destination: `typography.scss`,
              format: 'css/variables',
              filter: token => {
                if (!token.name.startsWith('text-')) {
                  return false;
                }
                if (token.filePath.includes('primitive')) {
                  return token.original && token.original.$value && token.original.$value.startsWith('{');
                }
                return token.filePath.includes('semantic');
              },
              options: {
                showFileHeader: true,
                outputReferences: true,
                selector: brand.selectors.base
              }
            }
          ]
        }
      }
    };
  });
  return configs;
}, {});

// Create a separate configuration for component tokens
const componentConfig = {
  source: [
    'tokens/json/primitive/default.json',
    ...Array.from(brands.values()).flatMap(brand => 
      brand.themes.map(theme => `tokens/json/semantic/${theme.name}.json`)
    )
  ],
  platforms: {
    component: {
      transformGroup: 'tokens-studio',
      transforms: ["attribute/cti", "name/kebab", "color/css"],
      buildPath: 'tokens/scss/',
      files: [
        {
          destination: 'component/header.scss',
          format: 'component/variables',
          filter: token => token.path[0] === 'component' && token.path[1].includes('header'),
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: 'component/side-menu.scss',
          format: 'component/variables',
          filter: token => token.path[0] === 'component' && token.path[1].includes('side menu'),
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: 'component/table.scss',
          format: 'component/variables',
          filter: token => token.path[0] === 'component' && token.path[1] === 'table',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: 'component/stepper.scss',
          format: 'component/variables',
          filter: token => token.path[0] === 'component' && token.path[1] === 'stepper',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: 'component/spinner.scss',
          format: 'component/variables',
          filter: token => token.path[0] === 'component' && token.path[1] === 'spinner',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: 'component/footer.scss',
          format: 'component/variables',
          filter: token => token.path[0] === 'component' && token.path[1] === 'footer',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: 'component/dropdown.scss',
          format: 'component/variables',
          filter: token => token.path[0] === 'component' && token.path[1] === 'dropdown',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: 'component/badge.scss',
          format: 'component/variables',
          filter: token => token.path[0] === 'component' && token.path[1] === 'badge',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: 'component/button.scss',
          format: 'component/variables',
          filter: token => token.path[0] === 'component' && token.path[1] === 'button',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: 'component/card.scss',
          format: 'component/variables',
          filter: token => token.path[0] === 'component' && token.path[1].includes('card'),
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: 'component/chip.scss',
          format: 'component/variables',
          filter: token => token.path[0] === 'component' && token.path[1] === 'chip',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: 'component/logo.scss',
          format: 'component/variables',
          filter: token => token.path[0] === 'component' && token.path[1] === 'logo',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: 'component/shadow.scss',
          format: 'component/variables',
          filter: token => token.path[0] === 'component' && token.path[1] === 'shadow',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: 'component/cookie.scss',
          format: 'component/variables',
          filter: token => token.path[0] === 'component' && token.path[1] === 'cookie',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: 'component/text.scss',
          format: 'component/variables',
          filter: token => token.path[0] === 'component' && token.path[1] === 'text',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: 'component/input-field.scss',
          format: 'component/variables',
          filter: token => token.path[0] === 'component' && token.path[1].includes('input-field'),
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        }
      ]
    }
  }
};

// Export the configurations
export default {
  primitive: primitiveConfig,
  component: componentConfig,
  ...themeConfigs
};
