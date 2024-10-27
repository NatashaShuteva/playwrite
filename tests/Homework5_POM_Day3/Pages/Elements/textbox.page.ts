import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
const locatorsPath = path.resolve(__dirname, '../../Locators/Elements/textbox.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

export class TextBoxPage {
  readonly page: Page;
  readonly card: Locator;
  readonly textBoxCard: Locator;
  readonly userNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddressInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.card = page.locator(locators.homepage.card);
    this.textBoxCard = page.locator(locators.homepage.textBoxCard);
    this.userNameInput = page.locator(locators.textBoxPage.userNameInput);
    this.emailInput = page.locator(locators.textBoxPage.emailInput);
    this.currentAddressInput = page.locator(locators.textBoxPage.currentAddressInput);
    this.permanentAddressInput = page.locator(locators.textBoxPage.permanentAddressInput);
    this.submitButton = page.locator(locators.textBoxPage.submitButton);
  }

  async navigate() {
    await this.page.goto('https://demoqa.com/');
    await this.page.locator('div.card.mt-4').first().click();
  }

  async openTextBox() {
    //await this.card.click();
    await this.textBoxCard.click();
  }

  async fillForm(data: { name: string; email: string; currentAddress: string; permanentAddress: string }) {
    await this.userNameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.currentAddressInput.fill(data.currentAddress);
    await this.permanentAddressInput.fill(data.permanentAddress);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async verifyFormResults(data: { name: string; email: string; currentAddress: string; permanentAddress: string }) {
    await expect(this.page.getByText(data.name)).toHaveText(data.name);
    await expect(this.page.getByText(data.email)).toHaveText(data.email);
    await expect(this.page.getByText(data.currentAddress)).toHaveText(data.currentAddress);
    await expect(this.page.getByText(data.permanentAddress)).toHaveText(data.permanentAddress);
  }
}
