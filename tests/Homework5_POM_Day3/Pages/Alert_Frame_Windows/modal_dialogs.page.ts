import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Alert_Frame_Windows/modal_dialogs.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Alert_Frame_Windows/modal_dialogs.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly avatarSvg: Locator;
  readonly modalDialogsLink: Locator;
  readonly largeModalButton: Locator;
  readonly largeModalText: Locator;
  readonly closeLargeModalButton: Locator;

  readonly expectedLargeModalText: string;

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.avatarSvg = page.locator(locators.homepage.avatarSvg);
    this.modalDialogsLink = page.locator(locators.modalDialogsPage.modalDialogsLink);
    this.largeModalButton = page.locator(locators.modalDialogsPage.largeModalButton);
    this.largeModalText = page.locator(locators.modalDialogsPage.largeModalText);
    this.closeLargeModalButton = page.locator(locators.modalDialogsPage.closeLargeModalButton);

    this.expectedLargeModalText = data.expectedMessages.largeModalText;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickAvatarSvg() {
    await this.avatarSvg.click();
  }

  async clickModalDialogsLink() {
    await this.modalDialogsLink.click();
  }

  async openLargeModalAndVerify() {
    await this.largeModalButton.click();
    await expect(this.largeModalText).toHaveText(this.expectedLargeModalText);
    await this.closeLargeModalButton.click();
  }
}
