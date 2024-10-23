import { test, expect } from '@playwright/test';

test('test frames', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('div:nth-child(2) > div > .avatar > svg').click();
  await page.getByText('Alerts, Frame & Windows').click();
  await page.getByText('Frames', { exact: true }).click();
  await expect(page.locator('#frame1').contentFrame().getByRole('heading', { name: 'This is a sample page' })).toBeVisible();
  await expect(page.locator('#frame2').contentFrame().getByRole('heading', { name: 'This is a sample page' })).toBeVisible();
});