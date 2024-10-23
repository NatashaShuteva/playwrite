import { test, expect } from '@playwright/test';

test('drag to specific coordinates', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Interactions' }).click();
  await page.getByText('Dragabble').click();

  // Verify the initial position of the draggable object
  const draggable = page.locator('#dragBox');
  const startBox = await draggable.boundingBox();
  expect(startBox).not.toBeNull();

  if (startBox) {
    // Set the mouse on the draggable object
    const startX = startBox.x + startBox.width / 2;
    const startY = startBox.y + startBox.height / 2;
    await page.mouse.move(startX, startY);
    await page.mouse.down();

    // Move the draggable object to position (240, 0)
    await page.mouse.move(startX + 240, startY, { steps: 10 });
    await page.mouse.up();

    // Verify the object is successfully moved to the new position
    const newBox = await draggable.boundingBox();
    expect(newBox).not.toBeNull();
    expect(newBox!.x).toBeCloseTo(startBox.x + 240, 1);
    expect(newBox!.y).toBeCloseTo(startBox.y, 1);
  } else {
    throw new Error("Failed to get bounding box of draggable element");
  }
});
