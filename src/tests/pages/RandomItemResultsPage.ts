import { Locator, Page } from '@playwright/test';
import { SearchResultsPage } from './SearchResultsPage';

export class RandomItemResultsPage extends SearchResultsPage {
  protected selectItem(): Locator {
    const items = this.page.locator('[data-testid="result-card"]');
    return items.nth(Math.floor(Math.random() * 10)); // נניח עד 10 – או נוכל להעביר count דינמי
  }
}
