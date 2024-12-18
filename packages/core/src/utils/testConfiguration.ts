import { expect } from '@playwright/test';

const themeClasses = {
  lightmode: 'tds-mode-light',
  darkmode: 'tds-mode-dark',
};

export const testConfigurations = {
  withModeVariants: [
    undefined,
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
    undefined,
    {
      theme: 'lightmode',
      backgroundColor: 'white',
    },
    {
      theme: 'darkmode',
      backgroundColor: 'var(--tds-grey-958)',
    },
  ],
};

export const setupPage = async (page, config, componentTestPath, componentName) => {
  await page.goto(componentTestPath);

  if (config) {
    const themeClass = themeClasses[config.theme];
    await page.evaluate((className) => {
      document.body.classList.add(className);
    }, themeClass);

    await page.evaluate((backgroundColor) => {
      document.body.setAttribute(
        'style',
        `background-color: ${backgroundColor}; padding-top: 20px; padding-bottom: 20px;`,
      );
    }, config.backgroundColor);

    if (config.modeVariant) {
      const elementLocator = page.locator(componentName);
      await expect(elementLocator).toHaveCount(1);
      await elementLocator.evaluate((element, modeVariant) => {
        element.setAttribute('mode-variant', modeVariant);
      }, config.modeVariant);
    }
  }
};

export const getTestDescribeText = (config, testDescription) => {
  if (config) {
    if (config.modeVariant) {
      return `${testDescription}-${config.modeVariant}-${config.theme}`;
    }
    return `${testDescription}-${config.theme}`;
  }
  return testDescription;
};
