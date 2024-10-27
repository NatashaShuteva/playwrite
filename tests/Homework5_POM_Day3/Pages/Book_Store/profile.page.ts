import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Book_Store/profile.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Book_Store/profile.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;
  readonly bookStoreAppHeading: Locator;
  readonly profileLink: Locator;
  readonly notLoggedText: Locator;
  readonly expectedNotLoggedText: string;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;
    this.bookStoreAppHeading = page.locator(locators.homepage.bookStoreAppHeading);
    this.profileLink = page.locator(locators.profilePage.profileLink);
    this.notLoggedText = page.locator(locators.profilePage.notLoggedText);
    this.expectedNotLoggedText = data.expectedMessages.notLoggedText;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickBookStoreAppHeading() {
    await this.bookStoreAppHeading.click();
  }

  async clickProfileLink() {
    await this.profileLink.click();
  }

  async verifyNotLoggedText() {
    await expect(this.notLoggedText).toHaveText(this.expectedNotLoggedText);
  }
}
