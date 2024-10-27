import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Alert_Frame_Windows/browser_windows.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Alert_Frame_Windows/browser_windows.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly avatar: Locator;
  readonly cardUp: Locator;
  readonly alertsFrameWindowsLink: Locator;
  readonly browserWindowsLink: Locator;

  readonly newWindowButton: Locator;
  readonly newWindowMessageButton: Locator;
  readonly newTabButton: Locator;
  readonly samplePageHeading: Locator;
  readonly windowMessageText: Locator;

  readonly expectedSamplePageHeading: string;
  readonly expectedWindowMessageText: string;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.avatar = page.locator(locators.homepage.avatar);
    this.cardUp = page.locator(locators.homepage.cardUp);
    this.alertsFrameWindowsLink = page.locator(locators.alertsFrameWindowsPage.alertsFrameWindowsLink);
    this.browserWindowsLink = page.locator(locators.alertsFrameWindowsPage.browserWindowsLink);

    this.newWindowButton = page.locator(locators.browserWindowsPage.newWindowButton);
    this.newWindowMessageButton = page.locator(locators.browserWindowsPage.newWindowMessageButton);
    this.newTabButton = page.locator(locators.browserWindowsPage.newTabButton);
    this.samplePageHeading = page.locator(locators.browserWindowsPage.samplePageHeading);
    this.windowMessageText = page.locator(locators.browserWindowsPage.windowMessageText);

    this.expectedSamplePageHeading = data.expectedMessages.samplePageHeading;
    this.expectedWindowMessageText = data.expectedMessages.windowMessageText;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickAvatar() {
    await this.avatar.click();
  }

  async clickCardUp() {
    await this.cardUp.click();
  }

  async clickAlertsFrameWindowsLink() {
    await this.alertsFrameWindowsLink.click();
  }

  async clickBrowserWindowsLink() {
    await this.browserWindowsLink.click();
  }

  async clickNewWindowButton() {
    const page1Promise = this.page.waitForEvent('popup');
    await this.newWindowButton.click();
    const page1 = await page1Promise;  
    // Fetch the locator from the locators.json
    const samplePageHeadingLocator = locators.browserWindowsPage.samplePageHeading;
    // Locate the heading in the new page context using the string locator
    const samplePageHeading = page1.locator(samplePageHeadingLocator); 
    // Verify the text in the new window
    await expect(samplePageHeading).toHaveText(this.expectedSamplePageHeading);
  }
  

  async clickNewWindowMessageButton() {
    const page1Promise = this.page.waitForEvent('popup');
    await this.newWindowMessageButton.click();
    const page1 = await page1Promise; 
    // Fetch the locator from the locators.json
    const windowMessageTextLocator = locators.browserWindowsPage.windowMessageText; 
    // Locate the message text in the new page context using the string locator
    const windowMessageText = page1.locator(windowMessageTextLocator);
    // Verify the text in the new window
    await expect(windowMessageText).toHaveText(this.expectedWindowMessageText);  
  }
  

  async clickNewTabButton() {
    const page1Promise = this.page.waitForEvent('popup');
    await this.newTabButton.click();
    const page1 = await page1Promise;
    // Fetch the locator from the locators.json
  const samplePageHeadingLocator = locators.browserWindowsPage.samplePageHeading;
  // Locate the heading in the new tab context using the string locator
  const samplePageHeading = page1.locator(samplePageHeadingLocator);
  // Verify the text in the new tab
  await expect(samplePageHeading).toHaveText(this.expectedSamplePageHeading);
  }

  
}
