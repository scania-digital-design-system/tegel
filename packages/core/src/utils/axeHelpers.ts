import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

const disabledRules = ['page-has-heading-one', 'landmark-one-main', 'region'];

export const tegelAnalyze = async (page: Page) =>
  new AxeBuilder({ page }).disableRules(disabledRules).analyze();
