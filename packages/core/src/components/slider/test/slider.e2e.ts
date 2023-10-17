import { newE2EPage } from '@stencil/core/testing';

describe('tds-slider', () => {
  it('should update the slider value onblur when using input fields', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <tds-slider value="0" min="0" max="100" value="50" input>
    </tds-slider>
    `);
    const slider = await page.find('tds-slider');

    expect(slider).not.toBe(null);
    const inputField = await page.find('.tds-slider__input-field');

    inputField.press('8');
    await page.waitForChanges();
    await page.keyboard.down('Tab');
    expect(await slider.getProperty('value')).toBe('8');
  });
  it('should update the slider value when enter is pressed when using input fields', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <tds-slider value="0" min="0" max="100" value="50" input>
    </tds-slider>
    `);
    const slider = await page.find('tds-slider');

    expect(slider).not.toBe(null);
    const inputField = await page.find('.tds-slider__input-field');

    inputField.press('8');
    await page.waitForChanges();
    await page.keyboard.down('Enter');
    expect(await slider.getProperty('value')).toBe('8');
  });
});
