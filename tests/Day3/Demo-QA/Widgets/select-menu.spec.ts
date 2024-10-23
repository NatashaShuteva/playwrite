import { test, expect } from '@playwright/test';

test('test for select value', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Widgets' }).click();
  await page.getByText('Select Menu').click();
  await page.locator('#withOptGroup div').filter({ hasText: 'Select Option' }).nth(1).click();
  await page.getByText('Group 2, option 1', { exact: true }).click();
  await expect(page.locator('div.css-1uccc91-singleValue')).toHaveText('Group 2, option 1');
});


test('test for select one', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Widgets' }).click();
  await page.getByText('Select Menu').click();
  await page.locator('#selectOne div').filter({ hasText: 'Select Title' }).nth(1).click();
  await page.getByText('Mrs.', { exact: true }).click();
  //await expect(page.locator("div.css-1uccc91-singleValue")).toBeVisible();
  await expect(page.locator("div.css-1uccc91-singleValue")).toHaveText('Mrs.');
});


test('test multi options select', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Widgets' }).click();
  await page.getByText('Select Menu').click();
  await page.locator('#cars').selectOption(['volvo', 'saab']);

  // Verify that Volvo and Saab are selected
  const selectedOptions = await page.locator('#cars option:checked').allTextContents();
  expect(selectedOptions).toEqual(['Volvo', 'Saab']);
});
