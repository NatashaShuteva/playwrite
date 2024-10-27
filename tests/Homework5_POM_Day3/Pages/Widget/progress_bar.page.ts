import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Widget/progress_bar.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Widget/progress_bar.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly widgetsHeading: Locator;
  readonly progressBarLink: Locator;
  readonly startButton: Locator;
  readonly resetButton: Locator;
  readonly progressBar: Locator;

  readonly expectedSliderValue: string;
  readonly expectedResetButtonText: string;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.widgetsHeading = page.locator(locators.homepage.widgetsHeading);
    this.progressBarLink = page.locator(locators.progressBarPage.progressBarLink);
    this.startButton = page.locator(locators.progressBarPage.startButton);
    this.resetButton = page.locator(locators.progressBarPage.resetButton);
    this.progressBar = page.locator(locators.progressBarPage.progressBar);

    this.expectedSliderValue = data.expectedMessages.sliderValue;
    this.expectedResetButtonText = data.expectedMessages.resetButtonText;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickWidgetsHeading() {
    await this.widgetsHeading.click();
  }

  async clickProgressBarLink() {
    await this.progressBarLink.click();
  }

  async startProgressBar() {
    await this.startButton.click();
  }

  async waitForProgressBarToComplete() {
    await this.page.waitForSelector('div[aria-valuenow="100"]');
  }

  async verifyProgressBar() {
    await expect(this.progressBar).toHaveText(this.expectedSliderValue);
  }

  async verifyResetButton() {
    await expect(this.resetButton).toHaveText(this.expectedResetButtonText);
  }
}
