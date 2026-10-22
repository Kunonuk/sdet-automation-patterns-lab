import { describe, expect, test } from '@jest/globals';
import { loadEnvironment } from '../../src/core/config/environment';

describe('environment configuration', () => {
  test('uses the public UI and API when no overrides are supplied', () => {
    expect(loadEnvironment({})).toEqual({
      uiBaseUrl: 'https://practicesoftwaretesting.com/',
      apiBaseUrl: 'https://api.practicesoftwaretesting.com/',
    });
  });

  test('normalizes path-based deployments without losing their prefixes', () => {
    expect(
      loadEnvironment({
        TOOLSHOP_UI_BASE_URL: 'https://demo.invalid/shop',
        TOOLSHOP_API_BASE_URL: 'http://127.0.0.1:8091/api/v1/',
      }),
    ).toEqual({
      uiBaseUrl: 'https://demo.invalid/shop/',
      apiBaseUrl: 'http://127.0.0.1:8091/api/v1/',
    });
  });

  test('keeps overrides local to each caller', () => {
    expect(loadEnvironment({ TOOLSHOP_UI_BASE_URL: 'https://demo.invalid' }).uiBaseUrl).toBe(
      'https://demo.invalid/',
    );
    expect(loadEnvironment({}).uiBaseUrl).toBe('https://practicesoftwaretesting.com/');
  });

  for (const setting of ['TOOLSHOP_UI_BASE_URL', 'TOOLSHOP_API_BASE_URL']) {
    test.each([
      '',
      '   ',
      'not-a-url',
      'ftp://demo.invalid',
      'https://name:secret@demo.invalid',
      'https://demo.invalid/?token=secret',
      'https://demo.invalid/#secret',
      'https://demo.invalid/?',
      'https://demo.invalid/#',
    ])('rejects %s as an invalid value for ' + setting, (value) => {
      expect(() => loadEnvironment({ [setting]: value })).toThrow(setting);
    });
  }

  test('does not echo credential values into validation errors', () => {
    expect(() =>
      loadEnvironment({ TOOLSHOP_API_BASE_URL: 'https://name:do-not-log-me@demo.invalid' }),
    ).toThrow(
      /^TOOLSHOP_API_BASE_URL must be an HTTP\(S\) base URL without credentials, query or fragment$/,
    );
  });
});
