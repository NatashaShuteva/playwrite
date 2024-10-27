import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Interactors/draggable.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Interactors/draggable.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly interactionsHeading: Locator;
  readonly draggableLink: Locator;
  readonly draggableElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.interactionsHeading = page.locator(locators.homepage.interactionsHeading);
    this.draggableLink = page.locator(locators.draggablePage.draggableLink);
    this.draggableElement = page.locator(locators.draggablePage.draggableElement);
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickInteractionsHeading() {
    await this.interactionsHeading.click();
  }

  async clickDraggableLink() {
    await this.draggableLink.click();
  }

  async dragToCoordinates(x: number, y: number) {
    const startBox = await this.draggableElement.boundingBox();
    expect(startBox).not.toBeNull();
    if (startBox) {
      const startX = startBox.x + startBox.width / 2;
      const startY = startBox.y + startBox.height / 2;
      await this.page.mouse.move(startX, startY);
      await this.page.mouse.down();
      await this.page.mouse.move(startX + x, startY + y, { steps: 10 });
      await this.page.mouse.up();

      const newBox = await this.draggableElement.boundingBox();
      expect(newBox).not.toBeNull();
      expect(newBox!.x).toBeCloseTo(startBox.x + x, 1);
      expect(newBox!.y).toBeCloseTo(startBox.y + y, 1);
    } else {
      throw new Error("Failed to get bounding box of draggable element");
    }
  }
}
