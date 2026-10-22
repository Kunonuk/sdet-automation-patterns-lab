import type { Locator, Page, Response } from '@playwright/test';
import type { NavigationComponent } from '../components/navigation.component';
import { ProductCardComponent } from '../components/product-card.component';
import { SearchComponent } from '../components/search.component';

export class CataloguePage {
  readonly search: SearchComponent;
  readonly productNames: Locator;
  readonly firstProduct: ProductCardComponent;
  readonly searchTerm: Locator;
  readonly emptyResults: Locator;

  constructor(
    private readonly page: Page,
    readonly navigation: NavigationComponent,
  ) {
    this.search = new SearchComponent(page);
    this.productNames = page.getByTestId('product-name');
    const cards = page.getByRole('link').filter({ has: this.productNames });
    this.firstProduct = new ProductCardComponent(cards.first());
    this.searchTerm = page.getByTestId('search-term');
    this.emptyResults = page
      .getByTestId('search_completed')
      .getByText('There are no products found.', { exact: true });
  }

  async open(): Promise<void> {
    await this.page.goto('./');
  }

  async searchFor(term: string): Promise<Response> {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (candidate) =>
          new URL(candidate.url()).pathname.endsWith('/products/search') &&
          candidate.request().method() === 'QUERY',
      ),
      this.search.submit(term),
    ]);
    return response;
  }

  async clearSearch(): Promise<Response> {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (candidate) =>
          new URL(candidate.url()).pathname.endsWith('/products') &&
          candidate.request().method() === 'QUERY',
      ),
      this.search.reset(),
    ]);
    return response;
  }
}
