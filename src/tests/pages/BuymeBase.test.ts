import { Page } from '@playwright/test';

abstract class BuymeBase {
  readonly page: Page;
  readonly url = 'https://buyme.co.il/';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async closePopup() {
    const closeBtn = this.page.getByRole('button', { name: 'כפתור סגירה' });
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    }
  }

  abstract doActions(): Promise<void>;

  async runner() {
    await this.navigate();
    await this.closePopup();
    await this.doActions();
  }
}
export default BuymeBase;