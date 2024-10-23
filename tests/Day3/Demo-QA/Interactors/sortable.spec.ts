import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Interactions' }).click();
  await page.getByText('Sortable').click();
  await expect(page.getByRole('tab', { name: 'List' })).toBeVisible();

  // Drag and drop to sort the list
  const listItemOne = page.locator('text=One').first();
  const listItemTwo = page.locator('text=Two').first();
  const listItemThree = page.locator('text=Three').first();
  const listItemFour = page.locator('text=Four').first();
  const listItemFive = page.locator('text=Five').first();
  const listItemSix = page.locator('text=Six').first();

  // Example: Move "One" to the position of "Three"
  await listItemOne.dragTo(listItemThree);

  // Example: Move "Two" to the position of "One"
  await listItemTwo.dragTo(listItemOne);

  // Verify new order
  const newOrder = await page.locator('.vertical-list-container .list-group-item').allTextContents();
  expect(newOrder).not.toEqual(['One', 'Two', 'Three', 'Four', 'Five', 'Six']);
  expect(newOrder).toContain('One');
  expect(newOrder).toContain('Two');
});
