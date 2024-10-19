import { test, expect } from '@playwright/test';

test.describe("Test suite for loging feature", ()=> {

    test.beforeEach("Navigate to login", async({page})=>{
        await page.goto('/');
    });

    test.describe("Test suite for update username", ()=> {

        test('Login with valid username', async ({ page }) => {
            await page.fill('input[name="user-name"]', 'standard_user'); // Replace with a valid username
            await page.fill('input[name="password"]', 'secret_sauce'); // Replace with a valid password
            // Click the login button
            await page.getByText('Login').click();
            expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
        });

        test('Login with locked username', async ({ page }) => {
            await page.fill('input[name="user-name"]', 'locked_out_user'); // Replace with a valid username
            await page.fill('input[name="password"]', 'secret_sauce'); // Replace with a valid password
            // Click the login button
            await page.getByText('Login').click();
            await expect(page.locator('[data-test="error"]')).toBeVisible();
        });

        test('Login with error username', async ({ page }) => {
            await page.fill('input[name="user-name"]', 'error_user'); // Replace with a valid username
            await page.fill('input[name="password"]', 'secret_sauce'); // Replace with a valid password
            // Click the login button
            await page.getByText('Login').click(); 
            expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
        });

     });

     test.afterEach("Reload page", async({page})=>{
        await page.reload();
   });

   //  test.describe("Test sute for updaye username", ()=> {
   //     test('Update with allowed password', async ({ page }) => {
   //     });
   //  });   

});