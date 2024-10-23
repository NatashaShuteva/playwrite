import { test, expect } from '@playwright/test';

test('drag and drop', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Interactions' }).click();
  await page.getByText('Droppable').click();

 // Locate the draggable element
 const draggable = page.locator('#draggable');

 // Locate the specific droppable element, for example, the first one
 const droppable = page.locator('#droppable').nth(0);

  // Drag the element to the droppable area
  await draggable.dragTo(droppable);
});
