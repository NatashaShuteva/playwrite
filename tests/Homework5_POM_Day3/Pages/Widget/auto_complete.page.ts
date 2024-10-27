import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Widget/auto_complete.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Widget/auto_complete.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly avatar: Locator;
  readonly autoCompleteLink: Locator;
  readonly valueContainer: Locator;
  readonly multipleInput: Locator;
  readonly greenOption: Locator;
  readonly greenLabel: Locator;
  readonly redLabel: Locator;

  readonly expectedGreenLabel: string;
  readonly expectedRedLabel: string;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.avatar = page.locator(locators.homepage.avatar);
    this.autoCompleteLink = page.locator(locators.autoCompletePage.autoCompleteLink);
    this.valueContainer = page.locator(locators.autoCompletePage.valueContainer);
    this.multipleInput = page.locator(locators.autoCompletePage.multipleInput);
    this.greenOption = page.locator(locators.autoCompletePage.greenOption);
    this.greenLabel = page.locator(locators.autoCompletePage.greenLabel);
    this.redLabel = page.locator(locators.autoCompletePage.redLabel);

    this.expectedGreenLabel = data.expectedMessages.greenLabel;
    this.expectedRedLabel = data.expectedMessages.redLabel;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickAvatar() {
    await this.avatar.click();
  }

  async clickAutoCompleteLink() {
    await this.autoCompleteLink.click();
  }

  async fillAndVerifyAutoComplete(color: string, expectedText: string) {
    await this.valueContainer.first().click();
    await this.multipleInput.fill(color);
    await this.greenOption.click();
    const label = color === 'Green' ? this.greenLabel : this.redLabel;
    await expect(label).toHaveText(expectedText);
  }
}
