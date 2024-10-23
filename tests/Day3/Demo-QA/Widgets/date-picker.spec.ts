import { test, expect } from '@playwright/test';

test('test date picker', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Widgets' }).click();
  await page.getByText('Date Picker').click();
  await expect(page.locator('#datePickerMonthYearInput')).toBeVisible();

  // Get today's date
  const today = new Date();
  const formattedToday = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

  // Select today's date
  await page.locator('#datePickerMonthYearInput').click();
  await page.locator('#datePickerMonthYearInput').fill(formattedToday);
  await expect(page.locator('#datePickerMonthYearInput')).toHaveValue(formattedToday);

  // Get tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const formattedTomorrow = `${tomorrow.getMonth() + 1}/${tomorrow.getDate()}/${tomorrow.getFullYear()}`;

  // Select tomorrow's date
  await page.locator('#datePickerMonthYearInput').click();
  await page.locator('#datePickerMonthYearInput').fill(formattedTomorrow);
  await expect(page.locator('#datePickerMonthYearInput')).toHaveValue(formattedTomorrow);
});