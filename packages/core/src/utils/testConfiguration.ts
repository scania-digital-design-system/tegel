import { expect } from '@playwright/test';

const themeClasses = {
  lightmode: 'tds-mode-light',
  darkmode: 'tds-mode-dark',
};

const brands = ['scania', 'traton'];

const withBrands = (configs) =>
  brands.flatMap((brand) => configs.map((config) => ({ ...config, brand })));

export const testConfigurations = {
  withModeVariants: [
    {
      modeVariant: 'primary',
      theme: 'lightmode',
      backgroundColor: 'white',
    },
    {
      modeVariant: 'primary',
      theme: 'darkmode',
      backgroundColor: 'var(--tds-grey-958)',
    },
    {
      modeVariant: 'secondary',
      theme: 'lightmode',
      backgroundColor: 'var(--tds-grey-50)',
    },
    {
      modeVariant: 'secondary',
      theme: 'darkmode',
      backgroundColor: 'var(--tds-grey-900)',
    },
  ],
  basic: [
    {
      theme: 'lightmode',
      backgroundColor: 'white',
    },
    {
      theme: 'darkmode',
      backgroundColor: 'var(--tds-grey-958)',
    },
  ],
  withModeVariantsAndBrands: withBrands([
    {
      modeVariant: 'primary',
      theme: 'lightmode',
      backgroundColor: 'white',
    },
    {
      modeVariant: 'primary',
      theme: 'darkmode',
      backgroundColor: 'var(--tds-grey-958)',
    },
    {
      modeVariant: 'secondary',
      theme: 'lightmode',
      backgroundColor: 'var(--tds-grey-50)',
    },
    {
      modeVariant: 'secondary',
      theme: 'darkmode',
      backgroundColor: 'var(--tds-grey-900)',
    },
  ]),
  basicWithBrandVariants: withBrands([
    {
      theme: 'lightmode',
      backgroundColor: 'white',
    },
    {
      theme: 'darkmode',
      backgroundColor: 'var(--tds-grey-958)',
    },
  ]),
};

export const setupPage = async (page, config, componentTestPath, componentName) => {
  await page.goto(componentTestPath);

  const evaluateData = {
    className: themeClasses[config.theme],
    backgroundColor: config.backgroundColor,
    brand: config.brand || 'scania',
  };

  await page.evaluate(({ className, backgroundColor, brand }) => {
    document.documentElement.classList.add(brand);
    document.body.classList.add(className);

    const currentStyle = document.body.getAttribute('style');

    document.body.setAttribute(
      'style',
      `${currentStyle}; background-color: ${backgroundColor}; padding-top: 20px; padding-bottom: 20px;`,
    );
  }, evaluateData);

  if (config.modeVariant) {
    const elementLocator = page.locator(componentName);

    const count = await elementLocator.count();
    await expect(count).toBeGreaterThanOrEqual(1);

    const elements = await elementLocator.all();

    elements.forEach(async (element) => {
      await element.evaluate((elem, modeVariant) => {
        elem.setAttribute('mode-variant', modeVariant);
      }, config.modeVariant);
    });
  }
};

export const getTestDescribeText = (config, testDescription) => {
  const brandSuffix = config.brand ? `-${config.brand}` : '';
  return config.modeVariant
    ? `${testDescription}-${config.modeVariant}-${config.theme}${brandSuffix}`
    : `${testDescription}-${config.theme}${brandSuffix}`;
};
