import { Locator, Page } from '@playwright/test';
import { SearchResultsPage } from './SearchResultsPage';

export class IndexedItemResultsPage extends SearchResultsPage {
  constructor(page: Page, private readonly index: number) {
    super(page);
  }

  protected selectItem(): Locator {
    return this.page.locator('[data-testid="result-card"]').nth(this.index);
  }
}
