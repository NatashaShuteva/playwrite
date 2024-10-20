import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://crepcollectionclub.co.uk/');
  await expect(page.getByRole('link', { name: 'Crep Collection Club' })).toBeVisible();
  await page.getByRole('link', { name: 'SHOP NOW' }).click();
  await page.getByRole('link', { name: 'Air Jordan 1 Mid Ice Blue (TD)' }).first().click();
  await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
  await page.locator('.modal-backdrop').click();
  await page.locator('.close-button > .icon > path').click();
  await page.getByRole('link', { name: 'Crep Collection Club' }).click();
  await page.getByRole('link', { name: 'SHOP NOW' }).click();
  await page.getByRole('link', { name: 'adidas Yeezy Boost 700 v2 Vanta Black adidas Yeezy Boost 700 v2 Vanta Black' }).click();
  await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
});
