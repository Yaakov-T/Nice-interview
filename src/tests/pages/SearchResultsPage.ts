import { Page, Locator, expect } from '@playwright/test';

export abstract class SearchResultsPage {
  constructor(protected readonly page: Page) {}

  async waitForResultsToLoad() {
    await this.page.locator('h1.title-xxl.bottom-md.top-none').waitFor({ state: 'visible' });
  }

  protected abstract selectItem(count: number): Locator;

  async addToCart() {
    const items = this.page.locator('div.bm-product-card');
    const count = await items.count();

    if (count === 0) throw new Error('No result items found');

    const item = this.selectItem(count);
    await item.scrollIntoViewIfNeeded();
    await expect(item).toBeVisible();

    const isMoneyCard = await item.locator('input[placeholder="הכנס סכום"]').count();

    if (isMoneyCard) {
      await item.locator('input[placeholder="הכנס סכום"]').fill('100');
    }

    const addButton = item.locator('button:has-text("בחירה")');
    await expect(addButton).toBeVisible();
    await addButton.click();
  }
}
