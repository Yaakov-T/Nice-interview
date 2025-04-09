import { test, expect, Page } from '@playwright/test';
import { BuymeWithDropSearch } from './pages/buymeWithDropSearch.test';
import { BuymeSimpleSearch } from './pages/buymeSimpleSearch.test';
import { ExtendWithResultsActions } from './pages/ExtendWithResultsActions';
import { RandomItemResultsPage } from './pages/RandomItemResultsPage';
import { IndexedItemResultsPage } from './pages/IndexedItemResultsPage';

test('Simple search - chocolate', async ({ page }) => {
  const flow = new BuymeSimpleSearch(page, 'שוקולד');
  await flow.runner();

  const result = page.locator('h1.title-xxl.bottom-md.top-none');
  await expect(result).toContainText('שוקולד');
});

test('Dropdown search - flower', async ({ page }) => {
  const flow = new BuymeWithDropSearch(page, 'פרח');
  await flow.runner();

  const result = page.locator('h1.title-xxl.bottom-md.top-none');
  await expect(result).toContainText('פרח');
});

test('Dropdown + random item to cart', async ({ page }) => {
  const FlowClass = ExtendWithResultsActions(BuymeWithDropSearch, RandomItemResultsPage);
  const flow = new FlowClass(page, 'פרח');
  await flow.runner();

  const result = page.locator('h1.title-xxl.bottom-md.top-none');
  await expect(result).toContainText('פרח');
});

test('Simple + item by index (2) to cart', async ({ page }) => {
  const FlowClass = ExtendWithResultsActions(
    BuymeSimpleSearch,
    class extends IndexedItemResultsPage {
      constructor(page: Page) {
        super(page, 2); // בחירת הפריט השלישי
      }
    }
  );
  const flow = new FlowClass(page, 'שוקולד');
  await flow.runner();

  const result = page.locator('h1.title-xxl.bottom-md.top-none');
  await expect(result).toContainText('שוקולד');
});


