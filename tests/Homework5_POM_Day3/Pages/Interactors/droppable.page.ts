import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Interactors/droppable.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Interactors/droppable.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);


export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly interactionsHeading: Locator;
  readonly droppableLink: Locator;
  readonly draggable: Locator;
  readonly droppable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.interactionsHeading = page.locator(locators.homepage.interactionsHeading);
    this.droppableLink = page.locator(locators.droppablePage.droppableLink);
    this.draggable = page.locator(locators.droppablePage.draggable);
    this.droppable = page.locator(locators.droppablePage.droppable);
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickInteractionsHeading() {
    await this.interactionsHeading.click();
  }

  async clickDroppableLink() {
    await this.droppableLink.click();
  }

  async dragAndDrop() {
    await this.draggable.dragTo(this.droppable.nth(0));
  }
}
