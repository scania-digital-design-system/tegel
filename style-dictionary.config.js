/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

const StyleDictionary = require('style-dictionary');

module.exports = {
  source: [
    'tokens-json/primitives/**/*.json',
    'tokens-json/component/**/*.json',
    'tokens-json/usage/**/*.json',
  ],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/scss/',
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
        },
      ],
    },
    scssPublic: {
      transformGroup: 'scss',
      buildPath: 'tokens/',
      files: [
        {
          destination: '_semantic.scss',
          format: 'scss/variables',
          filter: (token) => token.path[0] === 'semantic',
        },
        {
          destination: '_component.scss',
          format: 'scss/variables',
          filter: (token) => token.path[0] === 'component',
        },
        {
          destination: '_variables.scss',
          format: 'scss/variables',
        },
      ],
    },
  },
};
