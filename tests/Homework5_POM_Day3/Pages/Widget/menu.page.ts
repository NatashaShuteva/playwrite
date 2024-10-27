import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Widget/menu.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Widget/menu.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly widgetsHeading: Locator;
  readonly menuLink: Locator;
  readonly mainItem2: Locator;
  readonly subSubList: Locator;
  readonly subSubItem2: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.widgetsHeading = page.locator(locators.homepage.widgetsHeading);
    this.menuLink = page.locator(locators.menuPage.menuLink);
    this.mainItem2 = page.locator(locators.menuPage.mainItem2);
    this.subSubList = page.locator(locators.menuPage.subSubList);
    this.subSubItem2 = page.locator(locators.menuPage.subSubItem2);
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickWidgetsHeading() {
    await this.widgetsHeading.click();
  }

  async clickMenuLink() {
    await this.menuLink.click();
  }

  async selectItemFromMenu() {
    await this.mainItem2.hover();
    await this.subSubList.hover();
    await this.subSubItem2.click();
  }
}
