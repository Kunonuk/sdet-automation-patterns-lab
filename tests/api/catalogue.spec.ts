import { expect, test } from '@playwright/test';

// Only the fields this foundation scenario uses; Phase 3 adds shared runtime-validated models.
interface ProductSummary {
  id: string;
  name: string;
  price: number;
}

interface ProductPage {
  current_page: number;
  data: ProductSummary[];
  total: number;
}

test.describe('public catalogue', { tag: ['@external', '@catalogue'] }, () => {
  test('a listed product can be retrieved with the same identity and price', async ({
    request,
  }) => {
    const listing = await request.get('products', { params: { page: 1 } });
    expect(listing.status()).toBe(200);
    expect(listing.headers()['content-type']).toContain('application/json');
    const products = (await listing.json()) as ProductPage;
    expect(products).toMatchObject({ current_page: 1, data: expect.any(Array) });
    expect(products.data.length).toBeGreaterThan(0);
    expect(products.total).toBeGreaterThanOrEqual(products.data.length);

    const selected = products.data[0];
    if (!selected) throw new Error('Catalogue must contain a selectable product');
    expect(selected).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      price: expect.any(Number),
    });
    expect(selected.id).not.toBe('');
    expect(selected.name.trim()).not.toBe('');
    expect(selected.price).toBeGreaterThan(0);

    const detail = await request.get(`products/${encodeURIComponent(selected.id)}`);
    expect(detail.status()).toBe(200);
    const product: unknown = await detail.json();
    expect(product).toMatchObject({
      id: selected.id,
      name: selected.name,
      price: selected.price,
    });
  });

  test('search returns a nonempty page of products matching the requested name', async ({
    request,
  }) => {
    const response = await request.get('products/search', { params: { q: 'pliers' } });
    expect(response.status()).toBe(200);
    const products = (await response.json()) as ProductPage;
    expect(products).toMatchObject({ data: expect.any(Array) });
    expect(products.data.length).toBeGreaterThan(0);
    for (const product of products.data) {
      expect(product.name).toEqual(expect.stringMatching(/pliers/i));
    }
  });
});
