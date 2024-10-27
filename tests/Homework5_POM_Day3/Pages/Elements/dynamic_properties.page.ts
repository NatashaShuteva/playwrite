import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Elements/dynamic_properties.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Elements/dynamic_properties.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DynamicPropertiesPage {
  readonly page: Page;
  readonly avatar: Locator;
  readonly svg: Locator;
  readonly dynamicPropertiesLink: Locator;
  readonly colorChangeButton: Locator;
  readonly homepageUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.avatar = page.locator(locators.homepage.avatar);
    this.svg = page.locator(locators.homepage.svg);
    this.dynamicPropertiesLink = page.locator(locators.dynamicPropertiesPage.dynamicPropertiesLink);
    this.colorChangeButton = page.locator(locators.dynamicPropertiesPage.colorChangeButton);
    this.homepageUrl = data.homepageUrl;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async openDynamicPropertiesPage() {
    await this.svg.first().click();
    await this.dynamicPropertiesLink.click();
  }

  async verifyInitialColor() {
    const initialColor = await this.colorChangeButton.evaluate(button => window.getComputedStyle(button).color);
    expect(initialColor).toBe('rgb(255, 255, 255)'); // Assuming initial color is white
  }

  async waitForColorChange() {
    await this.page.waitForTimeout(5000);
    const newColor = await this.colorChangeButton.evaluate(button => window.getComputedStyle(button).color);
    expect(newColor).toBe('rgb(220, 53, 69)'); // Assuming the new color is red
  }
}
