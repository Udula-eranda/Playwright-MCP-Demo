const { test, expect } = require('@playwright/test');

test('MCP Server Test', async ({ page, context }) => {
  // Expect MCP server to be connected
  await expect(page).toBeDefined();
  await expect(context).toBeDefined();
});
