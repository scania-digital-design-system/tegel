import { create } from '@storybook/theming';
import ScaniaLogotypeDarkMode from './assets/svg/ScaniaLogotypeDarkMode.svg';
import scaniaThemeCommon from './scaniaThemeCommon';

// See https://storybook.js.org/docs/react/configure/theming
export default create({
  ...scaniaThemeCommon,
  brandImage: ScaniaLogotypeDarkMode,
  base: 'dark',

  // UI
  appContentBg: '#1d2229', // --tds-grey-900

  // Text colors
  textInverseColor: '#1d2229', // --tds-grey-900

  // Toolbar default and active colors
  barBg: '#1d2229', // --tds-grey-900

  // Form colors
});
