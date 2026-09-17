import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import type { AxeResults } from 'axe-core';

const disabledRules = ['page-has-heading-one', 'landmark-one-main', 'region'];

const rules = [
  'best-practice',
  'wcag2a',
  'wcag2aa',
  // 'wcag2aaa', // includes color-contrast-enhanced rule
  'wcag21a',
  'wcag21aa',
  'wcag22aa',
];

export const tegelAnalyze = async (page: Page): Promise<AxeResults> =>
  new AxeBuilder({ page }).disableRules(disabledRules).withTags(rules).analyze();
