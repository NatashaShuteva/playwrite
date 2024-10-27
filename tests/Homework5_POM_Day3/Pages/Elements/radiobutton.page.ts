import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Elements/radiobutton.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Elements/radiobutton.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);


export class RadioButtonPage {
  readonly page: Page;
  readonly card: Locator;
  readonly radioButtonLink: Locator;
  readonly impressiveOption: Locator;
  readonly impressiveText: Locator;
  readonly homepageUrl: string;
  readonly expectedText: string;

  constructor(page: Page) {
    this.page = page;
    this.card = page.locator(locators.homepage.card);
    this.radioButtonLink = page.locator(locators.radioButtonPage.radioButtonLink);
    this.impressiveOption = page.locator(locators.radioButtonPage.impressiveOption);
    this.impressiveText = page.locator(locators.radioButtonPage.impressiveText);
    this.homepageUrl = data.homepageUrl;
    this.expectedText = data.expectedText.impressive;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async openRadioButtonPage() {
    await this.card.first().click();
    await this.radioButtonLink.click();
  }

  async selectImpressiveOption() {
    await this.impressiveOption.click();
  }

  async validateImpressiveText() {
    await expect(this.impressiveText).toHaveText(this.expectedText); // Use the expected text from data file
  }
}
