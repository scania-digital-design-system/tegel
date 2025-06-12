import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { readFileSync } from 'fs';
import { join } from 'path';

register(StyleDictionary); // Register custom transforms

// Read themes configuration
const themesPath = join(process.cwd(), 'tokens-json', '$themes.json');
const themes = JSON.parse(readFileSync(themesPath, 'utf8'));

// Filter out the default theme and get only semantic themes
const semanticThemes = themes.filter(theme => theme.group === 'semantic');

// Create base configuration for primitive tokens
const primitiveConfig = {
  source: ['tokens-json/primitive/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'tokens-studio',
      transforms: ["attribute/cti", "name/kebab"],
      buildPath: 'build/scss/',
      files: [{
        destination: 'variables-primitive.scss',
        format: 'css/variables',
        options: {
          showFileHeader: true,
          outputReferences: true
        }
      }]
    }
  }
};

// Create theme configurations dynamically
const themeConfigs = semanticThemes.reduce((configs, theme) => {
  const themeName = theme.name;
  const selector = themeName.startsWith('scania') 
    ? `.${themeName}, .tds-mode-${themeName.split('-')[1]}`
    : `.${themeName}`;

  configs[themeName] = {
    source: [
      'tokens-json/primitive/default.json',
      `tokens-json/semantic/${themeName}.json`
    ],
    platforms: {
      scss: {
        transformGroup: 'tokens-studio',
        transforms: ["attribute/cti", "name/kebab"],
        buildPath: 'build/scss/',
        files: [{
          destination: `variables-${themeName}.scss`,
          format: 'css/variables',
          filter: token => {
            // Always include tokens from semantic files
            if (token.filePath.includes('semantic')) {
              return true;
            }
            // For primitive tokens, check if they're referenced by semantic tokens
            if (token.filePath.includes('primitive')) {
              // Only include primitive tokens that are referenced by semantic tokens
              // and match the theme's namespace (scania or traton)
              const themePrefix = themeName.startsWith('scania') ? 'scania' : 'traton';
              return token.isReferenced && token.name.startsWith(themePrefix);
            }
            return false;
          },
          options: {
            showFileHeader: true,
            outputReferences: true,
            selector
          }
        }]
      }
    }
  };
  return configs;
}, {});

// Export the configurations
export default {
  primitive: primitiveConfig,
  ...themeConfigs
};
