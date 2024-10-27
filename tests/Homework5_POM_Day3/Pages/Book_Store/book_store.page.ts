import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Book_Store/book_store.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Book_Store/book_store.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;
  readonly bookStoreAppHeading: Locator;
  readonly initialEntry: Locator;
  readonly searchBox: Locator;
  readonly searchResult: Locator;
  readonly expectedInitialEntryText: string;
  readonly expectedSearchResultText: string;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;
    this.bookStoreAppHeading = page.locator(locators.homepage.bookStoreAppHeading);
    this.initialEntry = page.locator(locators.bookStorePage.initialEntry);
    this.searchBox = page.locator(locators.bookStorePage.searchBox);
    this.searchResult = page.locator(locators.bookStorePage.searchResult);
    this.expectedInitialEntryText = data.expectedMessages.initialEntryText;
    this.expectedSearchResultText = data.expectedMessages.searchResultText;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickBookStoreAppHeading() {
    await this.bookStoreAppHeading.click();
  }

  async verifyInitialEntry() {
    await expect(this.initialEntry).toHaveText(this.expectedInitialEntryText);
  }

  async searchBook() {
    await this.searchBox.click();
    await this.searchBox.fill('learning JavaScript');
  }

  async verifySearchResult() {
    await expect(this.searchResult).toHaveText(this.expectedSearchResultText);
  }
}
