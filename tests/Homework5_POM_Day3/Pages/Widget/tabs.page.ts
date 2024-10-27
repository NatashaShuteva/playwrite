import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Widget/tabs.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Widget/tabs.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly widgetsHeading: Locator;
  readonly tabsLink: Locator;
  readonly whatTab: Locator;
  readonly loremIpsumText: Locator;
  readonly originTab: Locator;
  readonly contraryText: Locator;
  readonly useTab: Locator;
  readonly longEstablishedFactText: Locator;
  readonly whatOriginUseMore: Locator;

  readonly expectedLoremIpsumText: string;
  readonly expectedContraryText: string;
  readonly expectedLongEstablishedFactText: string;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.widgetsHeading = page.locator(locators.homepage.widgetsHeading);
    this.tabsLink = page.locator(locators.tabsPage.tabsLink);
    this.whatTab = page.locator(locators.tabsPage.whatTab);
    this.loremIpsumText = page.locator(locators.tabsPage.loremIpsumText);
    this.originTab = page.locator(locators.tabsPage.originTab);
    this.contraryText = page.locator(locators.tabsPage.contraryText);
    this.useTab = page.locator(locators.tabsPage.useTab);
    this.longEstablishedFactText = page.locator(locators.tabsPage.longEstablishedFactText);
    this.whatOriginUseMore = page.locator(locators.tabsPage.whatOriginUseMore);

    this.expectedLoremIpsumText = data.expectedMessages.loremIpsumText;
    this.expectedContraryText = data.expectedMessages.contraryText;
    this.expectedLongEstablishedFactText = data.expectedMessages.longEstablishedFactText;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickWidgetsHeading() {
    await this.widgetsHeading.click();
  }

  async clickTabsLink() {
    await this.tabsLink.click();
  }

  async verifyTabs() {
    await expect(this.whatTab).toBeVisible();
  
    // Construct regex from data.json values
    const loremIpsumRegex = new RegExp(this.expectedLoremIpsumText);
    const contraryRegex = new RegExp(this.expectedContraryText);
    const longEstablishedFactRegex = new RegExp(this.expectedLongEstablishedFactText);
  
    await expect(this.loremIpsumText).toHaveText(loremIpsumRegex);
    await this.originTab.click();
    await expect(this.originTab).toBeVisible();
    await expect(this.contraryText).toHaveText(contraryRegex);
    await this.useTab.click();
    await expect(this.useTab).toBeVisible();
    await expect(this.longEstablishedFactText).toHaveText(longEstablishedFactRegex);
    await this.whatOriginUseMore.click();
  }
  
}
