import { test } from '@playwright/test';
import { LinksPage } from '../../Pages/Elements/links.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Elements/links.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test open link in new page', async ({ page }) => {
  const linksPage = new LinksPage(page);
  await linksPage.navigate();
  await linksPage.openLinksPage();
  await linksPage.clickDynamicLink();
});

test('test link will send Ip call', async ({ page }) => {
  const linksPage = new LinksPage(page);
  await linksPage.navigate();
  await linksPage.openLinksPage();
  await linksPage.clickMovedLink();
  await linksPage.validateMovedText();
});
