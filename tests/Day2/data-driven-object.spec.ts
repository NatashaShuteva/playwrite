import { test, expect } from '@playwright/test';
import { SaucedemoPage } from './saucedemo-page';
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
            const saucedemoPage = new SaucedemoPage(page);
            await saucedemoPage.goto();
            await saucedemoPage.typeUsername(data.username); 
            await saucedemoPage.typePassword(data.password);
            await saucedemoPage.clickLogin();

            const titleVisible = await saucedemoPage.successLogin.isVisible();
            const errorVisible = await saucedemoPage.errorlogin.isVisible();

            if (titleVisible) {
                console.log(`Title from JSON: ${data.title}`);
                await saucedemoPage.verifySuccessLogin(data.title);
            } else if (errorVisible) {
                console.log(`Title from JSON: ${data.error}`);
                await saucedemoPage.verifyFailedLogin(data.error);
            } else {
                throw new Error('Neither success nor error message is visible');
            }
        });
    });
} else {
    console.error("usersData.testData is not defined or is not an array");
}

