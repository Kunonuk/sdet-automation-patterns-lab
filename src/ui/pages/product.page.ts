import type { Locator, Page } from '@playwright/test';
import type { NavigationComponent } from '../components/navigation.component';

export class ProductPage {
  readonly name: Locator;

  constructor(
    page: Page,
    readonly navigation: NavigationComponent,
  ) {
    this.name = page.getByRole('heading', { level: 1 });
  }
}
