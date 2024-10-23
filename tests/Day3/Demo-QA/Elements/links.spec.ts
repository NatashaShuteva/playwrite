import { test, expect } from '@playwright/test';

test('test open link in new page', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('.card-up').first().click();
  await page.getByText('Links', { exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('//a[@id="dynamicLink"]').click();
  const page1 = await page1Promise;
  await expect(page1.getByRole('banner').getByRole('link')).toBeVisible();
});

test('test link will send Ip call', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.locator('.avatar').first().click();
   // await page.locator('li').filter({ hasText: /^Links$/ }).click();
    await page.locator('li#item-5:has-text("Links")').click();
    await page.getByRole('link', { name: 'Moved' }).click();
    await expect(page.getByText('Moved Permanently')).toBeVisible();
  });