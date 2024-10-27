import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../Locators/Elements/upload_and_download.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

const dataPath = path.resolve(__dirname, '../../Data/Elements/upload_and_download.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

export class UploadDownloadPage {
  readonly page: Page;
  readonly avatar: Locator;
  readonly path: Locator;
  readonly svg: Locator;
  readonly uploadDownloadLink: Locator;
  readonly downloadLink: Locator;
  readonly fileInput: Locator;
  readonly uploadedFilePath: Locator;
  readonly homepageUrl: string;
  readonly fileName: string;
  readonly expectedText: string;

  constructor(page: Page) {
    this.page = page;
    this.avatar = page.locator(locators.homepage.avatar);
    this.path = page.locator(locators.homepage.path);
    this.svg = page.locator(locators.homepage.svg);
    this.uploadDownloadLink = page.locator(locators.uploadDownloadPage.uploadDownloadLink);
    this.downloadLink = page.locator(locators.uploadDownloadPage.downloadLink);
    this.fileInput = page.locator(locators.uploadDownloadPage.fileInput);
    this.uploadedFilePath = page.locator(locators.uploadDownloadPage.uploadedFilePath);
    this.homepageUrl = data.homepageUrl;
    this.fileName = data.download.fileName;
    this.expectedText = data.download.expectedText;
  }

  async navigate() {
    await this.page.goto(this.homepageUrl);
  }

  async openUploadDownloadPage() {
    await this.path.first().click();
    await this.uploadDownloadLink.click();
  }

  async downloadFile() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadLink.click();
    const download = await downloadPromise;
    const downloadFolder = path.join(process.env.HOME ?? process.env.USERPROFILE ?? '', 'Downloads');
    const filePath = path.join(downloadFolder, this.fileName);

    // Save the downloaded file
    await download.saveAs(filePath);

    // Verify the file name
    const downloadedFileName = path.basename(filePath);
    expect(downloadedFileName).toBe(this.fileName);
  }

  async uploadFile() {
    await this.fileInput.setInputFiles(this.fileName);
    await expect(this.uploadedFilePath).toHaveText(this.expectedText);
  }
}
