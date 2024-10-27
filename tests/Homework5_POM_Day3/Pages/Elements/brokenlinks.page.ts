import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Elements/brokenlinks.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Elements/brokenlinks.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class BrokenLinksPage {
  readonly page: Page;
  readonly avatar: Locator;
  readonly brokenLinksImagesLink: Locator;
  readonly image: Locator;
  readonly brokenLink: Locator;
  readonly statusCodesHeading: Locator;
  readonly homepageUrl: string;
  readonly expectedStatusCodesText: string;

  constructor(page: Page) {
    this.page = page;
    this.avatar = page.locator(locators.homepage.avatar);
    this.brokenLinksImagesLink = page.locator(locators.brokenLinksPage.brokenLinksImagesLink);
    this.image = page.locator(locators.brokenLinksPage.image);
    this.brokenLink = page.locator(locators.brokenLinksPage.brokenLink);
    this.statusCodesHeading = page.locator(locators.brokenLinksPage.statusCodesHeading);
    this.homepageUrl = data.homepageUrl;
    this.expectedStatusCodesText = data.expectedMessages.statusCodesText;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async openBrokenLinksPage() {
    await this.avatar.first().click();
    await this.brokenLinksImagesLink.click();
  }

  async checkImageVisibility() {
    await expect(this.image.nth(3)).toBeVisible();
  }

  async clickBrokenLink() {
    await this.brokenLink.click();
  }

  async validateStatusCodesHeading() {
    await expect(this.statusCodesHeading).toBeVisible();
    await expect(this.statusCodesHeading).toHaveText(this.expectedStatusCodesText);
  }
}
