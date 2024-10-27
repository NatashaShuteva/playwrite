import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Forms/Registration_form.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Forms/registration_form.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class RegistrationFormPage {
    readonly page: Page;
    readonly card: Locator;
    readonly practiceFormLink: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly femaleRadio: Locator;
    readonly mobileNumberInput: Locator;
    readonly dateOfBirthInput: Locator;
    readonly monthDropdown: Locator;
    readonly yearDropdown: Locator;
    readonly daySelect: Locator;
    readonly subjectsContainer: Locator;
    readonly subjectsInput: Locator;
    readonly sportsCheckbox: Locator;
    readonly selectPictureButton: Locator;
    readonly currentAddressInput: Locator;
    readonly stateDropdown: Locator;
    readonly ncrOption: Locator;
    readonly cityDropdown: Locator;
    readonly delhiOption: Locator;
    readonly submitButton: Locator;
    readonly submissionMessage: Locator;
    readonly adplusAnchor: Locator;
    readonly homepageUrl: string;
    readonly studentDetails: any;
    readonly submissionMessageText: string;
  
    constructor(page: Page) {
      this.page = page;
      this.card = page.locator(locators.homepage.card);
      this.practiceFormLink = page.locator(locators.registrationFormPage.practiceFormLink);
      this.firstNameInput = page.locator(locators.registrationFormPage.firstNameInput);
      this.lastNameInput = page.locator(locators.registrationFormPage.lastNameInput);
      this.emailInput = page.locator(locators.registrationFormPage.emailInput);
      this.femaleRadio = page.locator(locators.registrationFormPage.femaleRadio);
      this.mobileNumberInput = page.locator(locators.registrationFormPage.mobileNumberInput);
      this.dateOfBirthInput = page.locator(locators.registrationFormPage.dateOfBirthInput);
      this.monthDropdown = page.locator(locators.registrationFormPage.monthDropdown);
      this.yearDropdown = page.locator(locators.registrationFormPage.yearDropdown);
      this.daySelect = page.locator(locators.registrationFormPage.daySelect);
      this.subjectsContainer = page.locator(locators.registrationFormPage.subjectsContainer);
      this.subjectsInput = page.locator(locators.registrationFormPage.subjectsInput);
      this.sportsCheckbox = page.locator(locators.registrationFormPage.sportsCheckbox);
      this.selectPictureButton = page.locator(locators.registrationFormPage.selectPictureButton);
      this.currentAddressInput = page.locator(locators.registrationFormPage.currentAddressInput);
      this.stateDropdown = page.locator(locators.registrationFormPage.stateDropdown);
      this.ncrOption = page.locator(locators.registrationFormPage.ncrOption);
      this.cityDropdown = page.locator(locators.registrationFormPage.cityDropdown);
      this.delhiOption = page.locator(locators.registrationFormPage.delhiOption);
      this.submitButton = page.locator(locators.registrationFormPage.submitButton);
      this.submissionMessage = page.locator(locators.registrationFormPage.submissionMessage);
      this.adplusAnchor = page.locator(locators.registrationFormPage.adplusAnchor);
      this.homepageUrl = data.homepageUrl;
      this.studentDetails = data.studentDetails;
      this.submissionMessageText = data.submissionMessage;
    }
  
    async navigate() {
      await this.page.goto(this.homepageUrl);
    }
  
    async openPracticeForm() {
      await this.card.click();
      await this.practiceFormLink.click();
    }
  
    async fillForm() {
      await this.firstNameInput.fill(this.studentDetails.firstName);
      await this.lastNameInput.fill(this.studentDetails.lastName);
      await this.emailInput.fill(this.studentDetails.email);
      await this.femaleRadio.click();
      await this.mobileNumberInput.fill(this.studentDetails.mobileNumber);
      await this.dateOfBirthInput.click();
      //await this.page.click(`//option[@value='${this.studentDetails.dateOfBirth.month}']`);
      await this.monthDropdown.click();
      await this.page.waitForTimeout(500); // wait for options to render
      //await this.page.locator(`option[value='${this.studentDetails.dateOfBirth.month}']`).click();
      //await this.page.locator("//option[contains(text(), 'February')]").click();
      await this.page.locator(`//select[contains(@class, 'react-datepicker__month-select')]//option[contains(text(), 'February')]`).click();
      await this.yearDropdown.click();
      await this.page.click(`//option[@value='${this.studentDetails.dateOfBirth.year}']`);
      await this.daySelect.click();
      await this.subjectsContainer.click();
      await this.subjectsInput.fill(this.studentDetails.subjects);
      await this.sportsCheckbox.click();
      await this.selectPictureButton.setInputFiles(this.studentDetails.picture);
      await this.currentAddressInput.fill(this.studentDetails.address);
      await this.stateDropdown.click();
      await this.ncrOption.click();
      await this.cityDropdown.click();
      await this.delhiOption.click();
    }
  async submitForm() {
    await this.submitButton.click();
    await expect(this.submissionMessage).toHaveText(this.submissionMessageText);
  }

  async clickAdPlusAnchor() {
    const page1Promise = this.page.waitForEvent('popup');
    await this.adplusAnchor.click();
    const page1 = await page1Promise;
  }
}
