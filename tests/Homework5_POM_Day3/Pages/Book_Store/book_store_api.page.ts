import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Book_Store/book_store_api.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Book_Store/book_store_api.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;
  readonly bookStoreAppHeading: Locator;
  readonly bookStoreAPILink: Locator;
  readonly apiHeading: Locator;
  readonly expectedApiHeadingText: string;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;
    this.bookStoreAppHeading = page.locator(locators.homepage.bookStoreAppHeading);
    this.bookStoreAPILink = page.locator(locators.apiPage.bookStoreAPILink);
    this.apiHeading = page.locator(locators.apiPage.apiHeading);
    this.expectedApiHeadingText = data.expectedMessages.apiHeadingText;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickBookStoreAppHeading() {
    await this.bookStoreAppHeading.click();
  }

  async clickBookStoreAPILink() {
    await this.bookStoreAPILink.click();
  }

  async verifyApiHeading() {
    await expect(this.apiHeading).toHaveText(this.expectedApiHeadingText);
  }
}
