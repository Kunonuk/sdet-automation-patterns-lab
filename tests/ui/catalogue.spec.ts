import { expect, test } from '@playwright/test';

test(
  'a shopper can search for pliers and open a matching product',
  { tag: ['@external', '@catalogue'] },
  async ({ page }) => {
    await test.step('Given a signed-out shopper is browsing the catalogue', async () => {
      await page.goto('./');
      await expect(page.getByTestId('nav-sign-in')).toBeVisible();
      await expect(page.getByTestId('product-name').first()).toBeVisible();
    });

    await test.step('When the shopper searches for pliers', async () => {
      // The current UI uses the documented HTTP QUERY operation, not GET query parameters.
      const searchResponse = page.waitForResponse(
        (response) =>
          new URL(response.url()).pathname.endsWith('/products/search') &&
          response.request().method() === 'QUERY',
      );
      await page.getByTestId('search-query').fill('pliers');
      await page.getByTestId('search-submit').click();
      const response = await searchResponse;
      expect(response.status()).toBe(200);
      const criteria: unknown = response.request().postDataJSON();
      expect(criteria).toEqual({ q: 'pliers' });
    });

    await test.step('Then matching results lead to the selected product detail', async () => {
      const resultNames = page.getByTestId('product-name');
      await expect
        .poll(
          async () => {
            const names = await resultNames.allTextContents();
            return names.length > 0 && names.every((name) => /pliers/i.test(name));
          },
          { message: 'Search must display nonempty results that all match pliers' },
        )
        .toBe(true);

      const product = page.getByRole('link').filter({ has: resultNames }).first();
      const selectedName = (await product.getByTestId('product-name').innerText()).trim();
      const href = await product.getAttribute('href');
      if (!href) throw new Error('Search result must link to its product detail');
      const detailUrl = new URL(href, page.url()).href;

      await product.click();
      await expect(page).toHaveURL(detailUrl);
      await expect(page.getByTestId('product-name')).toHaveText(selectedName);
    });
  },
);
