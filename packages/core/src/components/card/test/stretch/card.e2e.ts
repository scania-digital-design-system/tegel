import { test } from 'stencil-playwright';
import { expect, type Page } from '@playwright/test';

const componentTestPath = 'src/components/card/test/stretch/index.html';

const getCardHeights = async (page: Page, rowSelector: string) =>
  page.locator(`${rowSelector} tds-card`).evaluateAll((cards) =>
    cards.map((card) => {
      const visibleCard = card.shadowRoot?.querySelector('.card');

      if (!visibleCard) {
        throw new Error('Expected tds-card shadow DOM to contain .card');
      }

      return {
        host: Math.round(card.getBoundingClientRect().height),
        card: Math.round(visibleCard.getBoundingClientRect().height),
      };
    }),
  );

test.describe.parallel('tds-card-stretch', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('stretches visible cards to match the row height', async ({ page }) => {
    const cardHeights = await getCardHeights(page, '.card-row--stretch');

    expect(cardHeights).toHaveLength(3);

    const expectedHeight = cardHeights[0].host;

    cardHeights.forEach(({ host, card }) => {
      expect(host).toBe(expectedHeight);
      expect(card).toBe(expectedHeight);
    });
  });

  test('keeps visible cards at content height without stretch', async ({ page }) => {
    const cardHeights = await getCardHeights(page, '.card-row--default');

    expect(cardHeights).toHaveLength(3);

    const expectedHostHeight = cardHeights[0].host;
    const visibleCardHeights = cardHeights.map(({ card }) => card);
    const uniqueVisibleCardHeights = new Set(visibleCardHeights);

    cardHeights.forEach(({ host }) => {
      expect(host).toBe(expectedHostHeight);
    });

    expect(uniqueVisibleCardHeights.size).toBeGreaterThan(1);
    expect(visibleCardHeights.some((height) => height < expectedHostHeight)).toBe(true);
  });
});
