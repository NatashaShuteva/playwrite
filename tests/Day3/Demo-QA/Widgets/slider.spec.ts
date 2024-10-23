import { test, expect } from '@playwright/test';

test('test for slider', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Widgets' }).click();
  await page.getByText('Slider').click();
  await page.getByRole('slider').fill('75');
  await expect(page.locator('#sliderValue')).toBeVisible();
});
