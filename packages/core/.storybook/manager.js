// .storybook/manager.js

import { addons } from '@storybook/addons';
import theme from './ScaniaThemeLight';

addons.setConfig({
  theme, // only this does not work with storybook-dark-mode plugin, put under 'darkmode' key inside preview.js file also. See https://github.com/hipstersmoothie/storybook-dark-mode/issues/157
});
