import { expect, test } from '../../src/core/fixtures/ui.fixture';

test(
  'shared navigation returns a shopper from product detail to the catalogue',
  { tag: ['@external', '@navigation'] },
  async ({ catalogue, product, page }) => {
    await catalogue.open();
    const catalogueUrl = page.url();
    const selected = await catalogue.firstProduct.open();
    expect(selected.name).not.toBe('');
    await expect(page).toHaveURL(selected.url);
    await expect(product.name).toHaveText(selected.name);
    await expect(product.navigation.homeLink).toBeVisible();

    await product.navigation.goHome();
    await expect(page).toHaveURL(catalogueUrl);
    await expect(catalogue.search.queryInput).toBeVisible();
    await expect(catalogue.search.queryInput).toHaveValue('');
    await expect(catalogue.productNames.first()).toBeVisible();
  },
);
