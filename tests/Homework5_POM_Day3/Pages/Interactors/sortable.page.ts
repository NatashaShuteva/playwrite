import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Interactors/sortable.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Interactors/sortable.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);


export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly interactionsHeading: Locator;
  readonly sortableLink: Locator;
  readonly listTab: Locator;
  readonly listItemOne: Locator;
  readonly listItemTwo: Locator;
  readonly listItemThree: Locator;
  readonly listItemFour: Locator;
  readonly listItemFive: Locator;
  readonly listItemSix: Locator;
  readonly listContainer: Locator;

  readonly expectedSortableItems: string[];

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.interactionsHeading = page.locator(locators.homepage.interactionsHeading);
    this.sortableLink = page.locator(locators.sortablePage.sortableLink);
    this.listTab = page.locator(locators.sortablePage.listTab);
    this.listItemOne = page.locator(locators.sortablePage.listItemOne);
    this.listItemTwo = page.locator(locators.sortablePage.listItemTwo);
    this.listItemThree = page.locator(locators.sortablePage.listItemThree);
    this.listItemFour = page.locator(locators.sortablePage.listItemFour);
    this.listItemFive = page.locator(locators.sortablePage.listItemFive);
    this.listItemSix = page.locator(locators.sortablePage.listItemSix);
    this.listContainer = page.locator(locators.sortablePage.listContainer);

    this.expectedSortableItems = data.expectedMessages.sortableItems;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickInteractionsHeading() {
    await this.interactionsHeading.click();
  }

  async clickSortableLink() {
    await this.sortableLink.click();
  }

  async verifyListTabIsVisible() {
    await expect(this.listTab).toBeVisible();
  }

  async dragAndDropListItems() {
    await this.listItemOne.dragTo(this.listItemThree);
    await this.listItemTwo.dragTo(this.listItemOne);
  }

  async verifyNewOrder() {
    const newOrder = await this.listContainer.allTextContents();
    expect(newOrder).not.toEqual(this.expectedSortableItems);
    expect(newOrder).toContain('One');
    expect(newOrder).toContain('Two');
  }
}
