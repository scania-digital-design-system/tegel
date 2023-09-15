import { create } from '@storybook/theming';
import ScaniaLogotype from './assets/svg/ScaniaLogotype.svg';
import scaniaThemeCommon from './scaniaThemeCommon';

// See https://storybook.js.org/docs/react/configure/theming
export default create({
  ...scaniaThemeCommon,
  brandImage: ScaniaLogotype,
  base: 'light',
  // colorPrimary: '#ff2340',
  // Commented out as its usage is unclear

  colorSecondary: '#2b70d3', // --tds-blue-400

  // UI

  appBg: '#fff', // --tds-white
  appContentBg: '#f9fafb', // --tds-grey-50
  appBorderColor: '#edeff3', // --tds-grey-100

  // Text colors
  textColor: '#0d0f13', // --tds-grey-958
  textInverseColor: 'rgba(255,255,255,0.9)', // storybook default

  // Toolbar default and active colors
  barTextColor: '#5f6d80', // custom made color
  barSelectedColor: '#2b70d3', // --tds-blue-400
  barBg: '#ffffff', // --tds-white

  // Form colors
  inputBg: 'white', // storybook default
  inputBorder: 'silver', // storybook default
  inputTextColor: 'black', // storybook default
});
