import { test, expect } from '@playwright/test';

test('test for broken links', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('.avatar').first().click();
  await page.getByText('Broken Links - Images').click();
  await expect(page.locator('img').nth(3)).toBeVisible();
  await page.getByRole('link', { name: 'Click Here for Broken Link' }).click();
  //await page.locator("//p[text()='Broken Link']/following-sibling::a[text()='Click Here for Broken Link']").click();
  await expect(page.getByRole('heading', { name: 'Status Codes' })).toBeVisible();
});