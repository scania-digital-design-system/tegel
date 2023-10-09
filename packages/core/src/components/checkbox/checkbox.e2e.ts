import { newE2EPage } from '@stencil/core/testing';

describe('tds-checbox', () => {
  it('should toggle checked state when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <tds-checkbox>
        <span slot="label">Label</span>
    </tds-checkbox>
    `);
    const el = await page.find('tds-checkbox');
    expect(el).not.toBeNull();
    await el.click();
    await page.waitForChanges();
    expect(await el.getProperty('checked')).toBe(true);
    await el.click();
    await page.waitForChanges();
    expect(await el.getProperty('checked')).toBe(false);
  });
  it('should not toggle checked state when clicked if disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <tds-checkbox disabled>
        <span slot="label">Label</span>
    </tds-checkbox>
    `);
    const el = await page.find('tds-checkbox');
    expect(el).not.toBeNull();
    await el.click();
    await page.waitForChanges();
    expect(await el.getProperty('checked')).toBe(false);
  });
});
