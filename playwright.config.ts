import { defineConfig } from 'playwright/test';

export default defineConfig({
  testDir: 'e2e',
  outputDir: 'e2e-results',
  webServer: { command: 'pnpm start' },
  timeout: 3000,
});
