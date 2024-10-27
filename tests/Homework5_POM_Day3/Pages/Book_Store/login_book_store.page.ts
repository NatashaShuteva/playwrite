import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Book_Store/login_book_store.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Book_Store/login_book_store.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);


export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;
  readonly bookStoreAppHeading: Locator;
  readonly loginLink: Locator;
  readonly usernamePlaceholder: Locator;
  readonly passwordPlaceholder: Locator;
  readonly loginButton: Locator;
  readonly loggedInUser: Locator;
  readonly logoutButton: Locator;
  readonly welcomeHeading: Locator;
  readonly username: string;
  readonly password: string;
  readonly expectedWelcomeText: string;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;
    this.bookStoreAppHeading = page.locator(locators.homepage.bookStoreAppHeading);
    this.loginLink = page.locator(locators.homepage.loginLink);
    this.usernamePlaceholder = page.getByPlaceholder(locators.loginPage.usernamePlaceholder);
    this.passwordPlaceholder = page.getByPlaceholder(locators.loginPage.passwordPlaceholder);
    this.loginButton = page.locator(locators.loginPage.loginButton);
    this.loggedInUser = page.locator(locators.loginPage.loggedInUser);
    this.logoutButton = page.locator(locators.loginPage.logoutButton);
    this.welcomeHeading = page.locator(locators.loginPage.welcomeHeading);
    this.username = data.credentials.username;
    this.password = data.credentials.password;
    this.expectedWelcomeText = data.expectedMessages.welcomeText;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickBookStoreAppHeading() {
    await this.bookStoreAppHeading.click();
  }

  async clickLoginLink() {
    await this.loginLink.click();
  }

  async login() {
    await this.usernamePlaceholder.click();
    await this.usernamePlaceholder.fill(this.username);
    await this.passwordPlaceholder.click();
    await this.passwordPlaceholder.fill(this.password);
    await this.loginButton.click();
  }

  async verifyLogin() {
    await expect(this.loggedInUser).toBeVisible();
  }


  async verifyLogintext() {
    await expect(this.welcomeHeading).toHaveText(this.expectedWelcomeText);
  }

  async logout() {
    await this.logoutButton.click();
  }

}