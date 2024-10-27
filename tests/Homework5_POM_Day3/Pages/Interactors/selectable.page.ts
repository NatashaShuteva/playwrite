import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Interactors/selectable.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Interactors/selectable.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly widgetsHeading: Locator;
  readonly interactionsLink: Locator;
  readonly selectableLink: Locator;
  readonly gridTab: Locator;
  readonly itemTwo: Locator;
  readonly itemFive: Locator;
  readonly itemEight: Locator;
  readonly selectedItems: Locator;

  readonly expectedSelectedItems: string[];

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.widgetsHeading = page.locator(locators.homepage.widgetsHeading);
    this.interactionsLink = page.locator(locators.homepage.interactionsLink);
    this.selectableLink = page.locator(locators.selectablePage.selectableLink);
    this.gridTab = page.locator(locators.selectablePage.gridTab);
    this.itemTwo = page.locator(locators.selectablePage.itemTwo);
    this.itemFive = page.locator(locators.selectablePage.itemFive);
    this.itemEight = page.locator(locators.selectablePage.itemEight);
    this.selectedItems = page.locator(locators.selectablePage.selectedItems);

    this.expectedSelectedItems = data.expectedMessages.selectedItems;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickWidgetsHeading() {
    await this.widgetsHeading.click();
  }

  async clickInteractionsLink() {
    await this.interactionsLink.click();
  }

  async clickSelectableLink() {
    await this.selectableLink.click();
  }

  async clickGridTab() {
    await this.gridTab.click();
  }

  async selectItems() {
    await this.itemTwo.click();
    await this.itemFive.click();
    await this.itemEight.click();
  }

  async verifySelectedItems() {
    const selectedItems = await this.selectedItems.allTextContents();
    expect(selectedItems).toEqual(this.expectedSelectedItems);
  }
}
