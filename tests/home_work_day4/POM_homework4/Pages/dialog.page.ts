import { Page, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../POM_homework4/Locators/dialog.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

export class AlertPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://demoqa.com/');
  }

  async goToAlertsFrameWindows() {
    await this.page.locator(locators.alertsFrameWindowsLink).click();
  }

  async clickAlertsTextLink() {
    await this.page.locator(locators.alertsTextLink).click();
  }

  async handleDialog() {
    this.page.once('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
    });
  }

  async clickConfirmButton() {
    await this.page.locator(locators.confirmButton).click();
  }

  getConfirmationTextLocator() {
     return this.page.locator(`text=${locators.confirmationText}`); 
    }

  
    async handleDialog2() { 
    this.page.once('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
     await dialog.dismiss(); 
    });
   }
   
   async clickDeclineButton2() { 
    await this.page.locator(locators.confirmButton).click();
   }

    getdeclineTextLocator2() {
      return this.page.locator(`text=${locators.declineText}`); 
     }
}
