import { Page } from "@playwright/test";
import BuymeBase from "./BuymeBase.test";

export class BuymeSimpleSearch extends BuymeBase {
    readonly gift: string;
  
    constructor(page: Page, gift: string) {
      super(page);
      this.gift = gift;
    }
  
    async searchGift(gift: string) {
      const combo = this.page.getByRole('combobox', { name: 'כאן אפשר לחפש מתנה' });
      await combo.waitFor();
      await combo.click();
      await combo.fill(gift);
      await this.page.locator('a.bm-btn.main.md').click();
    }
  
    async doActions() {
      await this.searchGift(this.gift);
    }
  }
  