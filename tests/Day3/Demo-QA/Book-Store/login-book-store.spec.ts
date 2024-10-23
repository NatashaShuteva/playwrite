import { test, expect } from '@playwright/test';

test('test to login', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Book Store Application' }).click();
  await page.locator('li').filter({ hasText: 'Login' }).click();
  await page.getByPlaceholder('UserName').click();
  await page.getByPlaceholder('UserName').fill('Natasha');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Shuteva12#');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Natasha')).toBeVisible();
  await page.getByRole('button', { name: 'Log out' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome,' })).toBeVisible();
});