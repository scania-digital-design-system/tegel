import { create } from 'storybook/internal/theming';
import ScaniaLogotypeLight from './ScaniaLogotypeLight.svg';
import ScaniaLogotypeDark from './ScaniaLogotypeDark.svg';

const common = {
  brandTitle: "Tegel - Scania's Digital Design System",
  brandTarget: '_self',
};

export const ScaniaLight = create({
  base: 'light',
  brandImage: ScaniaLogotypeLight,
  ...common,
});

export const ScaniaDark = create({
  base: 'dark',
  brandImage: ScaniaLogotypeDark,
  ...common,
});
