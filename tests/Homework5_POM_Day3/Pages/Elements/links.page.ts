import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Elements/links.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Elements/links.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);


export class LinksPage {
  readonly page: Page;
  readonly card: Locator;
  readonly avatar: Locator;
  readonly linksLink: Locator;
  readonly dynamicLink: Locator;
  readonly movedLink: Locator;
  readonly bannerLink: Locator;
  readonly movedText: Locator;
  readonly homepageUrl: string;
  readonly expectedMovedText: string;
  readonly expectedBannerLink: string;

  constructor(page: Page) {
    this.page = page;
    this.card = page.locator(locators.homepage.card);
    this.avatar = page.locator(locators.homepage.avatar);
    this.linksLink = page.locator(locators.linksPage.linksLink);
    this.dynamicLink = page.locator(locators.linksPage.dynamicLink);
    this.movedLink = page.locator(locators.linksPage.movedLink);
    this.bannerLink = locators.linksPage.bannerLink;
    this.movedText = page.locator(locators.linksPage.movedText);
    this.homepageUrl = data.homepageUrl;
    this.expectedMovedText = data.expectedMessages.movedText;
    this.expectedBannerLink = data.expectedLinks.bannerLink;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async openLinksPage() {
    await this.card.first().click();
    await this.linksLink.click();
  }

  async clickDynamicLink() {
    const page1Promise = this.page.waitForEvent('popup');
    await this.dynamicLink.click();
    const page1 = await page1Promise;
  
    // Define the locator directly in the popup context
    const bannerLinkLocator = locators.linksPage.bannerLink;
    const bannerLink = page1.locator(bannerLinkLocator);
    await expect(bannerLink).toHaveAttribute('href', this.expectedBannerLink); // Validate the href attribute of the link in the new page
  }
  

  async clickMovedLink() {
    await this.movedLink.click();
  }

  async validateMovedText() {
    await expect(this.movedText).toHaveText(this.expectedMovedText); // Validate text from the data file
  }
}
