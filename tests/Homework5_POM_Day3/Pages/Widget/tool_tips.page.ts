import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Widget/tool_tips.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Widget/tool_tips.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly widgetsHeading: Locator;
  readonly toolTipsLink: Locator;
  readonly hoverButton: Locator;
  readonly hoverMessage: Locator;

  readonly expectedHoverMessage: string;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.widgetsHeading = page.locator(locators.homepage.widgetsHeading);
    this.toolTipsLink = page.locator(locators.toolTipsPage.toolTipsLink);
    this.hoverButton = page.locator(locators.toolTipsPage.hoverButton);
    this.hoverMessage = page.locator(locators.toolTipsPage.hoverMessage);

    this.expectedHoverMessage = data.expectedMessages.hoverMessage;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickWidgetsHeading() {
    await this.widgetsHeading.click();
  }

  async clickToolTipsLink() {
    await this.toolTipsLink.click();
  }

  async hoverAndVerify() {
    await this.hoverButton.click();
    await expect(this.hoverMessage).toHaveText(this.expectedHoverMessage);
  }
}
