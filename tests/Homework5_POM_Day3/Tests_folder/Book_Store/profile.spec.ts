import { test, expect } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Book_Store/profile.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Book_Store/profile.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test for profile page', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickBookStoreAppHeading();
  await demoQAPage.clickProfileLink();
  await demoQAPage.verifyNotLoggedText();
});
