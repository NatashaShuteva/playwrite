import { test, expect } from '@playwright/test';

test('test for nested frames', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('div:nth-child(2) > div > .avatar > svg').click();
  await page.getByText('Alerts, Frame & Windows').click();
  await page.getByText('Nested Frames').click();
  await expect(page.locator('#frame1').contentFrame().getByText('Parent frame')).toBeVisible();
  await expect(page.locator('#frame1').contentFrame().locator('iframe').contentFrame().getByText('Child Iframe')).toBeVisible();
});