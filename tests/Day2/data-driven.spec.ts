import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Load users data
const usersPath = path.resolve(__dirname, '../fixtures/data/users.json');
const rawUsers = fs.readFileSync(usersPath, 'utf8');
const usersData = JSON.parse(rawUsers);

// Load locators data
const locatorsPath = path.resolve(__dirname, '../fixtures/locators/login.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators).locators;

if (usersData && Array.isArray(usersData.testData)) {
    usersData.testData.forEach((data: { username: string, password: string, title: string, error: string }) => {
        test(`Login test for ${data.username} ${data.password} ${data.title} ${data.error}`, async ({ page }) => {
            await page.goto('/');
            await page.locator(locators.username).fill(data.username);
            await page.locator(locators.password).fill(data.password);
            await page.locator(locators.loginButton).click();

            const titleVisible = await page.locator(locators.sucesslogin).isVisible();
            const errorVisible = await page.locator(locators.errorlogin).isVisible();

            if (titleVisible) {
                await expect(page.locator(locators.sucesslogin)).toBeVisible();
                await expect(page.locator(locators.sucesslogin)).toContainText(data.title);
            } else if (errorVisible) {
                await expect(page.locator(locators.errorlogin)).toBeVisible();
                await expect(page.locator(locators.errorlogin)).toContainText(data.error);
            }
        });
    });
} else {
    console.error("usersData.testData is not defined or is not an array");
}



    



