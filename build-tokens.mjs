import { execSync } from 'child_process';
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import config from './style-dictionary.config.mjs';
import { mkdirSync } from 'fs';
import { join } from 'path';

// Create component directory if it doesn't exist
const componentDir = join(process.cwd(), 'build', 'scss', 'component');
mkdirSync(componentDir, { recursive: true });

// Transform tokens to remove 'cy' from font family names
console.log('Transforming tokens...');
// Import and execute the transform directly instead of using execSync
import('./transform-tokens.mjs');

register(StyleDictionary);

// Build primitive tokens
const primitiveSD = new StyleDictionary({
  ...config.primitive,
  log: { verbosity: 'verbose' },
});
primitiveSD.buildAllPlatforms();

// Build theme-specific tokens
Object.entries(config)
  .filter(([key]) => key !== 'primitive') // Skip primitive config
  .forEach(([themeName, themeConfig]) => {
    console.log(`Building ${themeName}...`);
    const themeSD = new StyleDictionary({
      ...themeConfig,
      log: { verbosity: 'verbose' },
    });
    themeSD.buildAllPlatforms();
  });
