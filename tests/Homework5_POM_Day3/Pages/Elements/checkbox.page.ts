import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Elements/checkbox.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Elements/checkbox.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class CheckBoxPage {
  readonly page: Page;
  readonly card: Locator;
  readonly checkBoxLink: Locator;
  readonly toggleButton: Locator;
  readonly expandButton: Locator;
  readonly wordFileIcon: Locator;
  readonly homeIcon: Locator;
  readonly wordFileTextLocator: Locator;
  readonly homeTextLocator: Locator;
  readonly homepageUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.card = page.locator(locators.homepage.card);
    this.checkBoxLink = page.locator(locators.checkBoxPage.checkBoxLink);
    this.toggleButton = page.locator(locators.checkBoxPage.toggleButton);
    this.expandButton = page.locator(locators.checkBoxPage.expandButton);
    this.wordFileIcon = page.locator(locators.checkBoxPage.wordFileIcon);
    this.homeIcon = page.locator(locators.checkBoxPage.homeIcon);
    this.wordFileTextLocator = page.locator(locators.checkBoxPage.wordFileTextLocator);
    this.homeTextLocator = page.locator(locators.checkBoxPage.homeTextLocator);
    this.homepageUrl = data.homepageUrl;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async openCheckBox() {
    await this.card.click();
    await this.checkBoxLink.click();
  }


async toggleNodes() {
  const expectedWordFileText = data.expectedText.wordFile; // Fetch the wordFile text from the data file
  const expectedHomeText = data.expectedText.home; // Fetch the home text from the data file

  await this.toggleButton.click();
  await this.expandButton.click();
  await this.wordFileIcon.click();
  await this.homeIcon.click();
}

async validateWordFileText(expectedText: string) {
  await expect(this.wordFileTextLocator).toHaveText(expectedText);
}

async validateHomeText(expectedText: string) {
  await expect(this.homeTextLocator).toHaveText(expectedText);
}

}