import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Elements/buttons.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Elements/buttons.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class ButtonsPage {
  readonly page: Page;
  readonly card: Locator;
  readonly buttonsLink: Locator;
  readonly doubleClickButton: Locator;
  readonly rightClickButton: Locator;
  readonly clickMeButton: Locator;
  readonly doubleClickMessage: Locator;
  readonly rightClickMessage: Locator;
  readonly dynamicClickMessage: Locator;
  readonly homepageUrl: string;
  readonly expectedDoubleClickMessage: string;
  readonly expectedRightClickMessage: string;
  readonly expectedDynamicClickMessage: string;

  constructor(page: Page) {
    this.page = page;
    this.card = page.locator(locators.homepage.card);
    this.buttonsLink = page.locator(locators.buttonsPage.buttonsLink);
    this.doubleClickButton = page.locator(locators.buttonsPage.doubleClickButton);
    this.rightClickButton = page.locator(locators.buttonsPage.rightClickButton);
    this.clickMeButton = page.locator(locators.buttonsPage.clickMeButton);
    this.doubleClickMessage = page.locator(locators.buttonsPage.doubleClickMessage);
    this.rightClickMessage = page.locator(locators.buttonsPage.rightClickMessage);
    this.dynamicClickMessage = page.locator(locators.buttonsPage.dynamicClickMessage);
    this.homepageUrl = data.homepageUrl;
    this.expectedDoubleClickMessage = data.expectedMessages.doubleClick;
    this.expectedRightClickMessage = data.expectedMessages.rightClick;
    this.expectedDynamicClickMessage = data.expectedMessages.dynamicClick;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async openButtonsPage() {
    await this.card.first().click();
    await this.buttonsLink.click();
  }

  async performDoubleClick() {
    await this.doubleClickButton.dblclick();
  }

  async performRightClick() {
    await this.rightClickButton.click({ button: 'right' });
  }

  async performDynamicClick() {
    await this.clickMeButton.click();
  }

  async validateDoubleClick() {
    await expect(this.doubleClickMessage).toHaveText(this.expectedDoubleClickMessage);
  }

  async validateRightClick() {
    await expect(this.rightClickMessage).toHaveText(this.expectedRightClickMessage);
  }

  async validateDynamicClick() {
    await expect(this.dynamicClickMessage).toHaveText(this.expectedDynamicClickMessage);
  }
}
