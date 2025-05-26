import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import config from './style-dictionary.config.mjs';

register(StyleDictionary);

// Build primitive tokens
const sd = new StyleDictionary({
  ...config.primitive,
  log: { verbosity: 'verbose' }
});
sd.buildAllPlatforms();

// Build theme-specific tokens
Object.entries(config)
  .filter(([key]) => key !== 'primitive') // Skip primitive config
  .forEach(([themeName, themeConfig]) => {
    console.log(`Building ${themeName}...`);
    const sd = new StyleDictionary({
      ...themeConfig,
      log: { verbosity: 'verbose' }
    });
    sd.buildAllPlatforms();
  }); 