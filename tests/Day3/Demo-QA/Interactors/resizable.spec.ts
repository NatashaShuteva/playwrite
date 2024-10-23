import { test, expect } from '@playwright/test';

test('resize min size', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Interactions' }).click();
  await page.getByText('Resizable').click();

  // Verify the default size of the box
  const resizableBox = page.locator('#resizableBoxWithRestriction');
  const boundingBox = await resizableBox.boundingBox();
  expect(boundingBox).not.toBeNull();
  expect(boundingBox!.width).toBe(200); // Use non-null assertion
  expect(boundingBox!.height).toBe(200); // Use non-null assertion

  // Move the cursor to (200, 200)
  await page.mouse.move(200, 200);
  
  // Assuming the cursor change indicates readiness for resizing
  const resizableBoxHandle = resizableBox.locator('span');
  await resizableBoxHandle.hover();
  await page.mouse.down();
  await page.mouse.move(250, 250); // Move to the target coordinates for resizing
  await page.mouse.up();

  // Verify the new size of the box
  const newBoundingBox = await resizableBox.boundingBox();
  if (newBoundingBox) {
    expect(newBoundingBox.width).toBe(150);
    expect(newBoundingBox.height).toBe(150);
  } else {
    throw new Error("Failed to get new bounding box after resizing");
  }

});





test('resize to max size', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Interactions' }).click();
  await page.getByText('Resizable').click();

  // Verify the default size of the box
  const resizableBox = page.locator('#resizableBoxWithRestriction');
  const boundingBox = await resizableBox.boundingBox();
  expect(boundingBox).not.toBeNull();
  expect(boundingBox!.width).toBe(200); 
  expect(boundingBox!.height).toBe(200); 

  // Move the cursor to (200, 200)
  await page.mouse.move(200, 200);

  // Assuming the cursor change indicates readiness for resizing
  const resizableBoxHandle = resizableBox.locator('span');
  await resizableBoxHandle.hover();
  await page.mouse.down();
  await page.mouse.move(831, 563); // Move to the target coordinates for resizing to 500x300
  await page.mouse.up();

  // Verify the new size of the box
  const newBoundingBox = await resizableBox.boundingBox();
  if (newBoundingBox) {
    expect(newBoundingBox.width).toBe(500);
    expect(newBoundingBox.height).toBe(300);
  } else {
    throw new Error("Failed to get new bounding box after resizing");
  }

});

