import { Page, Locator, expect, FrameLocator } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Alert_Frame_Windows/frames.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Alert_Frame_Windows/frames.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly avatarSvg: Locator;
  readonly alertsFrameWindowsLink: Locator;
  readonly framesLink: Locator;

  readonly frame1: FrameLocator;
  readonly frame2: FrameLocator;
  readonly frameHeading: string;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.avatarSvg = page.locator(locators.homepage.avatarSvg);
    this.alertsFrameWindowsLink = page.locator(locators.alertsFrameWindowsPage.alertsFrameWindowsLink);
    this.framesLink = page.locator(locators.alertsFrameWindowsPage.framesLink);

    this.frame1 = page.frameLocator(locators.framesPage.frame1);
    this.frame2 = page.frameLocator(locators.framesPage.frame2);
    this.frameHeading = data.expectedMessages.frameHeading;
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

  async clickFramesLink() {
    await this.framesLink.click();
  }

  async verifyFrameHeadings() {
    await expect(this.frame1.getByRole('heading', { name: this.frameHeading })).toHaveText(this.frameHeading);
    await expect(this.frame2.getByRole('heading', { name: this.frameHeading })).toHaveText(this.frameHeading);
  }
}
