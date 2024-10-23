import { test, expect } from '@playwright/test';

test('test alert box', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('div:nth-child(2) > div > .avatar').click();
  await page.getByText('Alerts, Frame & Windows').click();
  await page.locator('li').filter({ hasText: 'Alerts' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#confirmButton').click();
  await expect(page.getByText('You selected Cancel')).toBeVisible();
});