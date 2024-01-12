import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { ValueAccessorConfig, angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['tds-radio-button'],
    event: 'tdsChange',
    targetAttr: 'value',
    type: 'radio',
  },
  {
    elementSelectors: ['tds-checkbox'],
    event: 'tdsChange',
    targetAttr: 'value',
    type: 'boolean',
  },
  {
    elementSelectors: ['tds-text-field', 'tds-textarea'],
    event: 'tdsChange',
    targetAttr: 'value',
    type: 'text',
  },
  {
    elementSelectors: ['tds-dropdown'],
    event: 'tdsChange',
    targetAttr: 'value',
    type: 'text',
  },
  {
    elementSelectors: ['tds-slider'],
    event: 'tdsChange',
    targetAttr: 'value',
    type: 'number',
  },
  {
    elementSelectors: ['tds-chip'],
    event: 'tdsChange',
    targetAttr: 'value',
    type: 'radio',
  },
  {
    elementSelectors: ['tds-chip'],
    event: 'tdsChange',
    targetAttr: 'value',
    type: 'boolean',
  },
];

export const config: Config = {
  tsconfig: 'tsconfig.dev.json',
  namespace: 'tegel',
  globalStyle: 'src/global/global.scss',
  extras: {
    enableImportInjection: true,
    tagNameTransform: true,
  },
  plugins: [sass()],
  sourceMap: false,
  testing: {
    browserArgs: ['--headless=new'],
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    angularOutputTarget({
      componentCorePackage: '@scania/tegel',
      outputType: 'component',
      directivesProxyFile: '../angular/projects/components/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../angular/projects/components/src/lib/stencil-generated/index.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    reactOutputTarget({
      componentCorePackage: '@scania/tegel',
      proxiesFile: '../react/lib/components/stencil-generated/index.ts',
    }),
    {
      type: 'dist-custom-elements',
      generateTypeDeclarations: true,
      customElementsExportBehavior: 'auto-define-custom-elements',
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
