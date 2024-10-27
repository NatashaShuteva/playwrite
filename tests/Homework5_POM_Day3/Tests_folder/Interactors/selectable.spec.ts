import { test } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Interactors/selectable.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Interactors/selectable.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test selectable items', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickWidgetsHeading();
  await demoQAPage.clickInteractionsLink();
  await demoQAPage.clickSelectableLink();
  await demoQAPage.clickGridTab();
  await demoQAPage.selectItems();
  await demoQAPage.verifySelectedItems();
});
