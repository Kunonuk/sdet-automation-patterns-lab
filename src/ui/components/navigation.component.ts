import type { Locator, Page } from '@playwright/test';

export class NavigationComponent {
  readonly homeLink: Locator;
  readonly signInLink: Locator;

  constructor(page: Page) {
    this.homeLink = page.getByTestId('nav-home');
    this.signInLink = page.getByTestId('nav-sign-in');
  }

  async goHome(): Promise<void> {
    await this.homeLink.click();
  }
}
