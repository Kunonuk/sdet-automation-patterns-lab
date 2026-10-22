import { expect, test } from '../../src/core/fixtures/ui.fixture';

test(
  'a shopper can search for pliers and open a matching product',
  { tag: ['@external', '@catalogue'] },
  async ({ catalogue, product, page }) => {
    await test.step('Given a signed-out shopper is browsing the catalogue', async () => {
      await catalogue.open();
      await expect(catalogue.navigation.signInLink).toBeVisible();
      await expect(catalogue.productNames.first()).toBeVisible();
    });

    await test.step('When the shopper searches for pliers', async () => {
      const response = await catalogue.searchFor('pliers');
      expect(response.status()).toBe(200);
      const criteria: unknown = response.request().postDataJSON();
      expect(criteria).toEqual({ q: 'pliers' });
    });

    await test.step('Then matching results lead to the selected product detail', async () => {
      await expect
        .poll(
          async () => {
            const names = await catalogue.productNames.allTextContents();
            return names.length > 0 && names.every((name) => /pliers/i.test(name));
          },
          { message: 'Search must display nonempty results that all match pliers' },
        )
        .toBe(true);

      const selected = await catalogue.firstProduct.open();
      await expect(page).toHaveURL(selected.url);
      await expect(product.name).toHaveText(selected.name);
    });
  },
);

test(
  'clearing an empty search restores the browsable catalogue',
  { tag: ['@external', '@catalogue', '@negative'] },
  async ({ catalogue }) => {
    await catalogue.open();
    await expect(catalogue.productNames.first()).toBeVisible();

    const query = 'sdet-architecture-no-match-7c4e';
    const searchResponse = await catalogue.searchFor(query);
    expect(searchResponse.status()).toBe(200);
    await expect(catalogue.searchTerm).toHaveText(query);
    await expect(catalogue.emptyResults).toHaveText('There are no products found.');
    await expect(catalogue.productNames).toHaveCount(0);

    const resetResponse = await catalogue.clearSearch();
    expect(resetResponse.status()).toBe(200);
    await expect(catalogue.search.queryInput).toHaveValue('');
    await expect(catalogue.searchTerm).toBeHidden();
    await expect(catalogue.emptyResults).toBeHidden();
    await expect(catalogue.productNames.first()).toBeVisible();
  },
);
