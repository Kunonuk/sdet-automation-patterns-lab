import { defineConfig, devices } from '@playwright/test';
import { loadEnvironment } from './src/core/config/environment';

const environment = loadEnvironment(process.env);

export default defineConfig({
  testDir: './tests',
  forbidOnly: true,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  outputDir: 'test-results',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['allure-playwright', { resultsDir: 'allure-results', detail: true }],
  ],
  use: {
    headless: true,
    testIdAttribute: 'data-test',
    locale: 'en-US',
    timezoneId: 'UTC',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'api',
      testMatch: 'api/**/*.spec.ts',
      use: {
        baseURL: environment.apiBaseUrl,
        extraHTTPHeaders: { Accept: 'application/json' },
      },
    },
    {
      name: 'ui-chromium',
      testMatch: 'ui/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'], baseURL: environment.uiBaseUrl },
    },
  ],
});
