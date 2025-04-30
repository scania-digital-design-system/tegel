module.exports = {
  source: ['tokens-json/**/*.json'],
  parsers: [
    {
      pattern: /\.json$/,
      parse: ({ contents }) => {
        const tokens = JSON.parse(contents);

        // Keep original tokens structure while also organizing into layers
        return {
          ...tokens, // Preserve original structure for backward compatibility

          // Organize tokens into layers
          primitives: {
            colors: tokens.permanent || {},
            // Add other primitive tokens
          },
          semantic: {
            // Map semantic tokens like system colors, text styles
            system: tokens.system || {},
            foreground: tokens.foreground || {},
            background: tokens.background || {},
          },
          usage: {
            // Component-specific tokens
            overrides: tokens.overrides || {},
          },
          brands: {
            // Brand-specific overrides if any
          },
        };
      },
    },
  ],
  log: {
    verbosity: 'verbose',
  },
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/scss/',
      files: [
        {
          destination: '_primitives.scss',
          format: 'scss/variables',
          filter: (token) => token.path[0] === 'primitives',
        },
        {
          destination: '_semantic.scss',
          format: 'scss/variables',
          filter: (token) => token.path[0] === 'semantic',
        },
        {
          destination: '_usage.scss',
          format: 'scss/variables',
          filter: (token) => token.path[0] === 'usage',
        },
        {
          destination: '_brands.scss',
          format: 'scss/variables',
          filter: (token) => token.path[0] === 'brands',
        },
      ],
    },
  },
};
