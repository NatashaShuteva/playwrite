import { test, expect } from '@playwright/test';
const fs = require('fs');
const path = require('path');

test('test download file', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('path').first().click();
  await page.getByText('Upload and Download').click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download' }).click();
  const download = await downloadPromise;
  // Get the path of the downloaded file
  const downloadPath = await download.path();

const fileName = 'sampleFile.jpg'; // Name of your file
const downloadFolder = path.join(process.env.HOME || process.env.USERPROFILE, 'Downloads');
const filePath = path.join(downloadFolder, fileName);

// Wait for the file to be fully downloaded
await download.saveAs(filePath);

// Check if the file is downloaded to the Downloads folder
expect(fs.existsSync(filePath)).toBeTruthy();
});


test('test upload file', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('svg').first().click();
  await page.getByText('Upload and Download').click();
  await page.getByLabel('Select a file').click();
  await page.getByLabel('Select a file').setInputFiles('Day1 Playwrite.docx');
  await expect(page.getByText('C:\\fakepath\\Day1 Playwrite.')).toBeVisible();
});