import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import { iconsCollection as scaniaIconsCollection } from '../../scaniaIconsArray';
import { iconsCollection as tratonIconsCollection } from '../../tratonIconsArray';

type IconDefinition = {
  name: string;
  definition: string;
};

const componentTestPath = 'src/components/icon/test/default/index.html';

const createIconMap = (collection: string) => {
  const icons = JSON.parse(collection) as IconDefinition[];
  return new Map(icons.map((icon) => [icon.name, icon.definition]));
};

const scaniaIcons = createIconMap(scaniaIconsCollection);
const tratonIcons = createIconMap(tratonIconsCollection);

test.describe.parallel('tds-icon brand paths', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
    await page.waitForChanges();
  });

  test('renders Scania icons by default', async ({ page }) => {
    await expect(page.locator('#scania-default path')).toHaveAttribute(
      'd',
      scaniaIcons.get('truck') ?? '',
    );
  });

  test('renders Traton icons in Traton brand context', async ({ page }) => {
    await expect(page.locator('#traton-truck path')).toHaveAttribute(
      'd',
      tratonIcons.get('truck') ?? '',
    );
  });

  test('renders the brand placeholder when an icon is missing in Traton', async ({ page }) => {
    await expect(page.locator('#traton-missing path')).toHaveAttribute(
      'd',
      tratonIcons.get('placeholder') ?? '',
    );
  });
});
