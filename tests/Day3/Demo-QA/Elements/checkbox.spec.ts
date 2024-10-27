import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('.card-up').first().click();
  await page.getByText('Check Box').click();
  await page.getByLabel('Toggle').click();
  //await page.locator('li').filter({ hasText: /^Downloads$/ }).getByLabel('Toggle').click();
  await page.locator("(//button[@class='rct-collapse rct-collapse-btn'])[4]").click();
  //await page.locator('label').filter({ hasText: 'Word File.doc' }).getByRole('img').first().click();
  await page.locator("(//span[@class='rct-node-icon'])[5]").click();
  await expect(page.getByText('wordFile')).toBeVisible();
  await page.locator("(//span[@class='rct-node-icon'])[1]").click();
  await expect(page.getByText('home', { exact: true })).toBeVisible();
});

