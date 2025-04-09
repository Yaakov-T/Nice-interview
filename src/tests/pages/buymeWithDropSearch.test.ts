import { Page, expect } from "@playwright/test";
import BuymeBase from "./BuymeBase.test";

export class BuymeWithDropSearch extends BuymeBase {
  readonly gift: string;

  constructor(page: Page, gift: string) {
    super(page);
    this.gift = gift;
  }

  async searchGiftWithDropdown(gift: string) {
    const combo = this.page.getByRole('combobox', { name: 'כאן אפשר לחפש מתנה' });
    await combo.waitFor();
    await combo.click();
    await combo.fill(gift);

    const dropdown = this.page.locator('[role="tooltip"] [role="option"]');
    const count = await dropdown.count();

    if (count === 0) {
      console.log('No options found – continuing with raw search...');
    } else {
      const randomIndex = Math.floor(Math.random() * count);
      const randomOption = dropdown.nth(randomIndex);
      await randomOption.scrollIntoViewIfNeeded();
      await expect(randomOption).toBeVisible();
      await randomOption.click();
    }

    await this.page.locator('a.bm-btn.main.md').click();
  }

  async doActions() {
    await this.searchGiftWithDropdown(this.gift);
  }
}
