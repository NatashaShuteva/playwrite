import { test, expect } from '@playwright/test';

test('test for accept a dialog', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Alerts, Frame & Windows' }).click();
  await page.getByText('Alerts', { exact: true }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.locator('#confirmButton').click();
  await expect(page.getByText('You selected Ok')).toBeVisible();
});