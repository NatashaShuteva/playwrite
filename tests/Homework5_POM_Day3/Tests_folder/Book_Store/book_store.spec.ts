import { test, expect } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Book_Store/book_store.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Book_Store/book_store.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('verify book search', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickBookStoreAppHeading();
  await demoQAPage.verifyInitialEntry();
  await demoQAPage.searchBook();
  await demoQAPage.verifySearchResult();
});
