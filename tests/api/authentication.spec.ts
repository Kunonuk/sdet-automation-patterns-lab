import { expect, test } from '@playwright/test';

test(
  'an anonymous caller cannot read an account profile',
  { tag: ['@external', '@authentication', '@negative'] },
  async ({ request }) => {
    const response = await request.get('users/me');
    expect(response.status()).toBe(401);
    const body: unknown = await response.json();
    expect(body).toMatchObject({ message: 'Unauthorized' });
    expect(body).not.toHaveProperty('email');
    expect(body).not.toHaveProperty('id');
  },
);
