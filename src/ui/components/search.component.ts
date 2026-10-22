import type { Locator, Page } from '@playwright/test';

export class SearchComponent {
  readonly queryInput: Locator;
  readonly submitButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    this.queryInput = page.getByTestId('search-query');
    this.submitButton = page.getByTestId('search-submit');
    this.resetButton = page.getByTestId('search-reset');
  }

  async submit(term: string): Promise<void> {
    await this.queryInput.fill(term);
    await this.submitButton.click();
  }

  async reset(): Promise<void> {
    await this.resetButton.click();
  }
}
