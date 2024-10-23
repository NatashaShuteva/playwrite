import { test, expect } from '@playwright/test';

test('verify book search', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Book Store Application' }).click();

  // Verify the initial entry "Git Pocket Guide" is displayed
  const initialEntry = page.getByRole('link', { name: 'Git Pocket Guide' });
  await expect(initialEntry).toBeVisible();

  // Perform the search for 'learning JavaScript'
  const searchBox = page.getByPlaceholder('Type to search');
  await searchBox.click();
  await searchBox.fill('learning JavaScript');

  // Verify that only the "Learning JavaScript Design" book is displayed
  const searchResult = page.getByRole('link', { name: 'Learning JavaScript Design' });
  await expect(searchResult).toBeVisible();
  await expect(initialEntry).not.toBeVisible();
});