import React from 'react';
import { addons, types } from 'storybook/internal/manager-api';
import { PackageVersion } from './components/PackageVersion';
import { version } from '../package.json';

addons.register('package-version', () => {
  addons.add('package-version/tool', {
    type: types.TOOL,
    title: 'package-version',
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: () => <PackageVersion packageName="@scania/tegel" version={version} />,
  });
});
