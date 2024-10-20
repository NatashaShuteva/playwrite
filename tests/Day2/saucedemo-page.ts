import {expect, type Locator, type Page} from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { title } from 'process';

// Load locators data
const locatorsPath = path.resolve(__dirname, '../fixtures/locators/login.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators).locators;

export class SaucedemoPage{
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly login: Locator;
    readonly successLogin: Locator;
    readonly errorlogin: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator(locators.username);
        this.password = page.locator(locators.password);
        this.login = page.locator(locators.loginButton);
        this.successLogin = page.locator(locators.sucesslogin);
        this.errorlogin = page.locator(locators.errorlogin);
    }

    async goto(){
        await this.page.goto('/');
    }

    async typeUsername(user: string){
        await this.username.fill(user);
    }

    async typePassword(pass: string){
        await this.password.fill(pass);
    }

    async clickLogin(){
        await this.login.click();
    }

    async verifySuccessLogin(success: string) {
        await this.successLogin.isVisible();
        console.log(`Expected Success Text: ${success}`);
        const textContent = await this.successLogin.textContent();
        console.log(`Actual Success Login Text: ${textContent}`);
        expect(textContent).not.toBeNull();
        expect(textContent).toContain(success);
    }

    async verifyFailedLogin(expectedError: string) {
        const errorVisible = await this.errorlogin.isVisible();
        expect(errorVisible).toBeTruthy(); // Ensure the error message is visible
        console.log(`Expected Success Text: ${expectedError}`);
        const errorMessage = await this.errorlogin.textContent();
        expect(errorMessage).not.toBeNull();
        expect(errorMessage).toContain(expectedError); // Ensure the error message contains the expected text
    }
}



