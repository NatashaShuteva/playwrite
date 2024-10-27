import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Widget/slider.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Widget/slider.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly widgetsHeading: Locator;
  readonly sliderLink: Locator;
  readonly slider: Locator;
  readonly sliderValue: Locator;

  readonly expectedSliderValue: string;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.widgetsHeading = page.locator(locators.homepage.widgetsHeading);
    this.sliderLink = page.locator(locators.sliderPage.sliderLink);
    this.slider = page.locator(locators.sliderPage.slider);
    this.sliderValue = page.locator(locators.sliderPage.sliderValue);

    this.expectedSliderValue = data.expectedMessages.sliderValue;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickWidgetsHeading() {
    await this.widgetsHeading.click();
  }

  async clickSliderLink() {
    await this.sliderLink.click();
  }

  async setSliderValue(value: string) {
    await this.slider.fill(value);
  }

  async verifySliderValue() {
    await expect(this.sliderValue).toHaveValue(this.expectedSliderValue);
  }
}
