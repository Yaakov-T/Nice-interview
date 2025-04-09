import { SearchResultsPage } from './SearchResultsPage';
import { Page } from '@playwright/test';

type SearchFlowConstructor = new (page: Page, gift: string) => { runner(): Promise<void> };
type ResultsPageConstructor = new (page: Page) => SearchResultsPage;

export function ExtendWithResultsActions(
  SearchFlow: SearchFlowConstructor,
  ResultsPage: ResultsPageConstructor
) {
  return class ExtendedSearchFlow extends SearchFlow {
    async runner() {
      await super.runner();

      const resultsPage = new ResultsPage((this as any).page);
      await resultsPage.waitForResultsToLoad();
      await resultsPage.addToCart();
    }
  };
}
