import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

test.describe('my-event-component', () => {
  test('it should render a button', async ({ page }) => {
    await page.setContent(`<my-event-component></my-event-component>`);

    const button = await page.locator('my-event-component button');

    await expect(button).toBeVisible();
  });

  test('it should emit an event', async ({ page }) => {
    await page.setContent(`<my-event-component></my-event-component>`);

    const myEventSpy = await page.spyOnEvent('myEvent');

    const button = await page.locator('my-event-component button');
    await button.click();

    expect(myEventSpy).toHaveReceivedEvent();
  });

  test('it should emit an event with the expected detail', async ({ page }) => {
    await page.setContent(`<my-event-component></my-event-component>`);

    const myEventSpy = await page.spyOnEvent('myEvent');

    const button = await page.locator('my-event-component button');
    await button.click();

    await myEventSpy.next();

    expect(myEventSpy).toHaveReceivedEventDetail('Hello World');
  });
});
