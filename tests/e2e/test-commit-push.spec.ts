// Import the Playwright test library
import { test, expect } from '@playwright/test';

// Define a test case
test('homepage has title', async ({ page }) => {
    // Navigate to the desired URL
    await page.goto('https://www.saucedemo.com/'); // Replace with any URL you want to test

    // Get the title of the page
    const title = await page.title();
    //test2
    //test3
    //test4
    //test5

    // Assert that the title is as expected
    expect(title).toBe('Swag Labs'); // Adjust this based on the actual title of the page
});
