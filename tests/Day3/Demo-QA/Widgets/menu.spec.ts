import { test, expect } from '@playwright/test';

test('test select item from menu', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Widgets' }).click();
  await page.getByText('Menu', { exact: true }).click();
  
  // Hover over "Main Item 2"
  await page.hover("//a[text()='Main Item 2']");

  // Hover over "SUB SUB LIST"
  await page.hover("//a[text()='SUB SUB LIST »']");

  // Click "Sub Sub Item 2"
  await page.locator("//a[text()='Sub Sub Item 2']").click();
});