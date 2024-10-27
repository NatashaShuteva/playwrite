import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Widget/accordian.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Widget/accordian.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class AccordianPage {
  
    readonly page: Page;
    readonly homepageUrl: string;
  
    readonly widgetsHeading: Locator;
    readonly accordianLink: Locator;
    readonly loremIpsumText: Locator;
    readonly whereDoesItComeFrom: Locator;
    readonly contraryText: Locator;
    readonly whyDoWeUseIt: Locator;
    readonly longEstablishedFactText: Locator;
  
    readonly expectedLoremIpsumText: string;
    readonly expectedContraryText: string;
    readonly expectedLongEstablishedFactText: string;
  
    constructor(page: Page) {
      this.page = page;
      this.homepageUrl = data.homepageUrl;
  
      this.widgetsHeading = page.locator(locators.homepage.widgetsHeading);
      this.accordianLink = page.locator(locators.widgetsPage.accordianLink);
      this.loremIpsumText = page.locator(locators.widgetsPage.loremIpsumText);
      this.whereDoesItComeFrom = page.locator(locators.widgetsPage.whereDoesItComeFrom);
      this.contraryText = page.locator(locators.widgetsPage.contraryText);
      this.whyDoWeUseIt = page.locator(locators.widgetsPage.whyDoWeUseIt);
      this.longEstablishedFactText = page.locator(locators.widgetsPage.longEstablishedFactText);
  
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
  
    async clickAccordianLink() {
      await this.accordianLink.click();
    }
  
    async verifyAccordianSections() {
      await expect(this.loremIpsumText).toHaveText(this.expectedLoremIpsumText);
      await this.whereDoesItComeFrom.click();
      await expect(this.contraryText).toHaveText(this.expectedContraryText);
      await this.whyDoWeUseIt.click();
      await expect(this.longEstablishedFactText).toHaveText(this.expectedLongEstablishedFactText);
    }
  }