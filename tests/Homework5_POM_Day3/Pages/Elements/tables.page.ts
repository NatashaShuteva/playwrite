import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Elements/tables.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Elements/tables.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class WebTablePage {
  readonly page: Page;
  readonly card: Locator;
  readonly webTableLink: Locator;
  readonly addButton: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly ageField: Locator;
  readonly salaryField: Locator;
  readonly departmentField: Locator;
  readonly submitButton: Locator;
  readonly ageCell: Locator;
  readonly editButton: Locator;
  readonly deleteButton: Locator;
  readonly updatedAgeCell: Locator;
  readonly homepageUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.card = page.locator(locators.homepage.card);
    this.webTableLink = page.locator(locators.webTablePage.webTableLink);
    this.addButton = page.locator(locators.webTablePage.addButton);
    this.firstNameField = page.locator(locators.webTablePage.firstNameField);
    this.lastNameField = page.locator(locators.webTablePage.lastNameField);
    this.emailField = page.locator(locators.webTablePage.emailField);
    this.ageField = page.locator(locators.webTablePage.ageField);
    this.salaryField = page.locator(locators.webTablePage.salaryField);
    this.departmentField = page.locator(locators.webTablePage.departmentField);
    this.submitButton = page.locator(locators.webTablePage.submitButton);
    this.ageCell = page.locator(locators.webTablePage.ageCell);
    this.editButton = page.locator(locators.webTablePage.editButton);
    this.deleteButton = page.locator(locators.webTablePage.deleteButton);
    this.updatedAgeCell = page.locator(locators.webTablePage.updatedAgeCell);
    this.homepageUrl = data.homepageUrl;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async openWebTablePage() {
    await this.card.first().click();
    await this.webTableLink.click();
  }

  async addEntry(details: { firstName: string; lastName: string; email: string; age: string; salary: string; department: string }) {
    await this.addButton.click();
    await this.firstNameField.fill(details.firstName);
    await this.lastNameField.fill(details.lastName);
    await this.emailField.fill(details.email);
    await this.ageField.fill(details.age);
    await this.salaryField.fill(details.salary);
    await this.departmentField.fill(details.department);
    await this.submitButton.click();
  }

  async editEntry(updatedDetails: { age: string }) {
    await this.editButton.click();
    await this.ageField.fill(updatedDetails.age);
    await this.submitButton.click();
  }

  async deleteEntry() {
    await this.deleteButton.click();
  }

  async validateAgeCell(expectedAge: string) {
    await expect(this.page.getByRole('gridcell', { name: expectedAge })).toHaveText(expectedAge);
  }
  
}
