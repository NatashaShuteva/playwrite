import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Alert_Frame_Windows/alerts.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Alert_Frame_Windows/alerts.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly avatar: Locator;
  readonly alertsFrameWindowsLink: Locator;
  readonly alertsLink: Locator;
  readonly confirmButton: Locator;
  readonly confirmationMessage: Locator;

  readonly expectedConfirmationMessage: string;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.avatar = page.locator(locators.homepage.avatar);
    this.alertsFrameWindowsLink = page.locator(locators.alertsFrameWindowsPage.alertsFrameWindowsLink);
    this.alertsLink = page.locator(locators.alertsFrameWindowsPage.alertsLink);
    this.confirmButton = page.locator(locators.alertsPage.confirmButton);
    this.confirmationMessage = page.locator(locators.alertsPage.confirmationMessage);

    this.expectedConfirmationMessage = data.expectedMessages.confirmationMessage;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickAvatar() {
    await this.avatar.click();
  }

  async clickAlertsFrameWindowsLink() {
    await this.alertsFrameWindowsLink.click();
  }

  async clickAlertsLink() {
    await this.alertsLink.click();
  }

  async handleAlertAndVerify() {
    this.page.once('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.dismiss().catch(() => {});
    });
    await this.confirmButton.click();
    await expect(this.confirmationMessage).toHaveText(this.expectedConfirmationMessage);
  }
}
