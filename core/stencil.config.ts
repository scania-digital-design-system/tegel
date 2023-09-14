import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'tegel',
  globalStyle: 'src/global/global.scss',
  extras: {
    enableImportInjection: true,
    tagNameTransform: true,
  },
  plugins: [sass()],
  sourceMap: false,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      generateTypeDeclarations: true,
      dir: 'components',
      customElementsExportBehavior: 'single-export-module',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
