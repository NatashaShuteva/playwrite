import { Page, Locator, expect, FrameLocator } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Alert_Frame_Windows/nested_frames.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Alert_Frame_Windows/nested_frames.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly avatarSvg: Locator;
  readonly alertsFrameWindowsLink: Locator;
  readonly nestedFramesLink: Locator;

  readonly parentFrame: FrameLocator;
  readonly childFrame: FrameLocator;
  readonly expectedParentFrameText: string;
  readonly expectedChildFrameText: string;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.avatarSvg = page.locator(locators.homepage.avatarSvg);
    this.alertsFrameWindowsLink = page.locator(locators.alertsFrameWindowsPage.alertsFrameWindowsLink);
    this.nestedFramesLink = page.locator(locators.alertsFrameWindowsPage.nestedFramesLink);

    this.parentFrame = page.frameLocator(locators.nestedFramesPage.parentFrame);
    this.childFrame = this.parentFrame.frameLocator(locators.nestedFramesPage.childFrame);
    this.expectedParentFrameText = data.expectedMessages.parentFrameText;
    this.expectedChildFrameText = data.expectedMessages.childFrameText;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickAvatarSvg() {
    await this.avatarSvg.click();
  }

  async clickAlertsFrameWindowsLink() {
    await this.alertsFrameWindowsLink.click();
  }

  async clickNestedFramesLink() {
    await this.nestedFramesLink.click();
  }

  async verifyNestedFramesText() {
    await expect(this.parentFrame.getByText(this.expectedParentFrameText)).toHaveText(this.expectedParentFrameText);
    await expect(this.childFrame.getByText(this.expectedChildFrameText)).toHaveText(this.expectedChildFrameText);
  }
}