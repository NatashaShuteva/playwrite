// Import the Playwright test library
import { test, expect } from '@playwright/test';

// Define a test case
   test('homepage has title', async ({ page }) => {
    // Navigate to the desired URL
    await page.goto('https://www.saucedemo.com/'); // Replace with any URL you want to test

    // Fill out the username and password fields
    await page.fill('input[name="user-name"]', 'standard_user'); // Replace with a valid username
    await page.fill('input[name="password"]', 'secret_sauce'); // Replace with a valid password

    // Click the login button
    await page.getByText('Login').click();

    // Wait for navigation after form submission
    //await page.waitForNavigation();

    // Check that the URL is as expected after login
    expect(page.url()).toBe('https://www.saucedemo.com/inventory.html'); // Replace with your actual post-login URL


});