import { test, expect } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Interactors/resizable.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Interactors/resizable.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('resize min size', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickInteractionsHeading();
  await demoQAPage.clickResizableLink();
  await demoQAPage.verifyDefaultSize();
  await demoQAPage.resizeToMinSize();
});

test('resize to max size', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickInteractionsHeading();
  await demoQAPage.clickResizableLink();
  await demoQAPage.verifyDefaultSize();
  await demoQAPage.resizeToMaxSize();
});
