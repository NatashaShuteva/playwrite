import { test, expect } from '@playwright/test';

test('test double click', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('path').first().click();
  await page.getByText('Buttons').click();
  //await page.getByRole('button', { name: 'Double Click Me' }).dblclick();
  await page.locator('button#doubleClickBtn.btn.btn-primary').dblclick();
  await expect(page.getByText('You have done a double click')).toBeVisible();
});


test('test right click', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('.avatar').first().click();
  await page.locator('li').filter({ hasText: 'Buttons' }).click();
  await page.getByRole('button', { name: 'Right Click Me' }).click({
    button: 'right'
  });
  await expect(page.getByText('You have done a right click')).toBeVisible();
});


test('test dynamic click', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.locator('path').first().click();
    await page.getByText('Buttons').click();
    await page.getByRole('button', { name: 'Click Me', exact: true }).click();
    await expect(page.getByText('You have done a dynamic click')).toBeVisible();
  });