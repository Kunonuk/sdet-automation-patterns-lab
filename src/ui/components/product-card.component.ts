import type { Locator } from '@playwright/test';

export interface SelectedProduct {
  readonly name: string;
  readonly url: string;
}

export class ProductCardComponent {
  readonly name: Locator;

  constructor(private readonly link: Locator) {
    this.name = link.getByTestId('product-name');
  }

  async open(): Promise<SelectedProduct> {
    const name = (await this.name.innerText()).trim();
    const href = await this.link.getAttribute('href');
    if (!href) throw new Error('Product card must link to its product detail');
    const url = new URL(href, this.link.page().url()).href;
    await this.link.click();
    return { name, url };
  }
}
