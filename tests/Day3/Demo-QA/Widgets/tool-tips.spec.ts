import { test, expect } from '@playwright/test';

test('test for tool tip', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Widgets' }).click();
  await page.getByText('Tool Tips').click();
  await page.getByRole('button', { name: 'Hover me to see' }).click();
  await expect(page.getByText('You hovered over the Button')).toBeVisible();
});