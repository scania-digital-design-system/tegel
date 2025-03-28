import AxeBuilder from '@axe-core/playwright';

const disabledRules = ['page-has-heading-one', 'landmark-one-main', 'region', 'color-contrast'];

export const tegelAnalyze = async (page) =>
  new AxeBuilder({ page }).disableRules(disabledRules).analyze();
