import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Widgets' }).click();
  await page.getByText('Interactions').click();
  await page.getByText('Selectable').click();
  await page.getByRole('tab', { name: 'Grid' }).click();
  await page.getByText('Two').click();
  await page.getByText('Five').click();
  await page.getByText('Eight').click();

  // Verify that "Two", "Five", and "Eight" are selected
  const selectedItems = await page.locator('.list-group-item.active.list-group-item-action').allTextContents();
  expect(selectedItems).toEqual(['Two', 'Five', 'Eight']);
});
