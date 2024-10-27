import { test, expect } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Book_Store/login_book_store.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Book_Store/login_book_store.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test to login', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickBookStoreAppHeading();
  await demoQAPage.clickLoginLink();
  await demoQAPage.login();
  await demoQAPage.verifyLogin();
  await demoQAPage.verifyLogintext();
  await demoQAPage.logout();
});
