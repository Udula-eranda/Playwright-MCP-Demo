// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    video: 'on-first-retry',
    trace: 'on-first-retry',
  },
  reporter: 'html',
});
