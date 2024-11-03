import { Page, Locator } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Load locators from JSON
const locatorsPath = path.resolve(__dirname, '../../login_form_POM/Locators/login.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators).locators;

// Load data from JSON
const dataPath = path.resolve(__dirname, '../../login_form_POM/Data/login.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly successLogin: Locator;
  readonly errorLogin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(locators.username);
    this.passwordInput = page.locator(locators.password);
    this.loginButton = page.locator(locators.loginButton);
    this.successLogin = page.locator(locators.successLogin);
    this.errorLogin = page.locator(locators.errorLogin);
  }

  async goto() {
    await this.page.goto('/');
  }

  async login() {
    await this.usernameInput.fill(data.username);
    await this.passwordInput.fill(data.password);
    await this.loginButton.click();
  }
}
