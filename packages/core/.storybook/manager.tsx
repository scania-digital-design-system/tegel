import React from 'react';
import { addons, types, useGlobals } from '@storybook/manager-api';
import { PackageVersion } from './components/PackageVersion';
import { version } from '../package.json';
import theme from './ScaniaThemeLight';
import '../dist/tegel/tegel.css';

addons.setConfig({
  theme,
});

addons.register('package-version', () => {
  addons.add('package-version/tool', {
    type: types.TOOL,
    title: 'package-version',
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: () => <PackageVersion packageName="@scania/tegel" version={version} />,
  });
});
