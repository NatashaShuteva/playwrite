import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Widget/select_menu.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Widget/select_menu.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

(rawData);

export class DemoQAPage {
  readonly page: Page;
  readonly homepageUrl: string;

  readonly widgetsHeading: Locator;
  readonly selectMenuLink: Locator;
  readonly withOptGroupSelect: Locator;
  readonly group2Option1: Locator;
  readonly selectedGroup2Option1: Locator;
  readonly selectOne: Locator;
  readonly selectedOption: Locator;
  readonly mrsOption: Locator;
  readonly multiSelect: Locator;
  readonly selectedOptions: Locator;

  readonly expectedGroup2Option1Text: string;
  readonly expectedMrsText: string;
  readonly expectedMultiSelectOptions: string[];

  constructor(page: Page) {
    this.page = page;
    this.homepageUrl = data.homepageUrl;

    this.widgetsHeading = page.locator(locators.homepage.widgetsHeading);
    this.selectMenuLink = page.locator(locators.selectMenuPage.selectMenuLink);
    this.withOptGroupSelect = page.locator(locators.selectMenuPage.withOptGroupSelect);
    this.group2Option1 = page.locator(locators.selectMenuPage.group2Option1);
    this.selectedGroup2Option1 = page.locator(locators.selectMenuPage.selectedGroup2Option1);
    this.selectOne = page.locator(locators.selectMenuPage.selectOne);
    this.selectedOption = page.locator(locators.selectMenuPage.selectedOption3);
    this.mrsOption = page.locator(locators.selectMenuPage.mrsOption);
    this.multiSelect = page.locator(locators.selectMenuPage.multiSelect);
    this.selectedOptions = page.locator(locators.selectMenuPage.selectedOptions);

    this.expectedGroup2Option1Text = data.expectedMessages.group2Option1Text;
    this.expectedMrsText = data.expectedMessages.mrsText;
    this.expectedMultiSelectOptions = data.expectedMessages.multiSelectOptions;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async clickWidgetsHeading() {
    await this.widgetsHeading.click();
  }

  async clickSelectMenuLink() {
    await this.selectMenuLink.click();
  }

  async selectOption1() {
    await this.withOptGroupSelect.filter({ hasText: 'Select Option' }).nth(1).click();
    await this.page.locator(`div.css-1n7v3ny-option`, { hasText: this.expectedGroup2Option1Text }).click({ force: true });
    await expect(this.selectedGroup2Option1).toHaveText(this.expectedGroup2Option1Text);
  }
  

  async selectOne2() {
    await this.selectOne.filter({ hasText: 'Select Title' }).nth(1).click();
    await this.page.locator(`div.css-1n7v3ny-option`, { hasText: this.expectedMrsText }).click({ force: true });
    // Verify the selected option text
    await expect(this.selectedOption).toHaveText(this.expectedMrsText);
  }

  async multiSelectOptions() {
    await this.multiSelect.selectOption(['volvo', 'saab']);
    const selectedOptions = await this.selectedOptions.allTextContents();
    expect(selectedOptions).toEqual(this.expectedMultiSelectOptions);
  }
}
