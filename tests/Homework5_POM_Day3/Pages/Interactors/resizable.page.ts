import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Interactors/resizable.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Interactors/resizable.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly interactionsHeading: Locator;
  readonly resizableLink: Locator;
  readonly resizableBox: Locator;
  readonly resizableBoxHandle: Locator;

  readonly defaultWidth: number;
  readonly defaultHeight: number;
  readonly minWidth: number;
  readonly minHeight: number;
  readonly maxWidth: number;
  readonly maxHeight: number;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.interactionsHeading = page.locator(locators.homepage.interactionsHeading);
    this.resizableLink = page.locator(locators.resizablePage.resizableLink);
    this.resizableBox = page.locator(locators.resizablePage.resizableBox);
    this.resizableBoxHandle = page.locator(locators.resizablePage.resizableBoxHandle);

    this.defaultWidth = data.expectedSizes.defaultWidth;
    this.defaultHeight = data.expectedSizes.defaultHeight;
    this.minWidth = data.expectedSizes.minWidth;
    this.minHeight = data.expectedSizes.minHeight;
    this.maxWidth = data.expectedSizes.maxWidth;
    this.maxHeight = data.expectedSizes.maxHeight;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickInteractionsHeading() {
    await this.interactionsHeading.click();
  }

  async clickResizableLink() {
    await this.resizableLink.click();
  }

  async verifyDefaultSize() {
    const boundingBox = await this.resizableBox.boundingBox();
    expect(boundingBox).not.toBeNull();
    expect(boundingBox!.width).toBe(this.defaultWidth);
    expect(boundingBox!.height).toBe(this.defaultHeight);
  }

  async resizeToMinSize() {
    await this.resizableBoxHandle.hover();
    await this.page.mouse.down();
    await this.page.mouse.move(250, 250);
    await this.page.mouse.up();

    const newBoundingBox = await this.resizableBox.boundingBox();
    expect(newBoundingBox).not.toBeNull();
    expect(newBoundingBox!.width).toBe(this.minWidth);
    expect(newBoundingBox!.height).toBe(this.minHeight);
  }

  async resizeToMaxSize() {
    await this.resizableBoxHandle.hover();
    await this.page.mouse.down();
    await this.page.mouse.move(831, 563);
    await this.page.mouse.up();

    const newBoundingBox = await this.resizableBox.boundingBox();
    expect(newBoundingBox).not.toBeNull();
    expect(newBoundingBox!.width).toBe(this.maxWidth);
    expect(newBoundingBox!.height).toBe(this.maxHeight);
  }
}
