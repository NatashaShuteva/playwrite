import { test } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Interactors/sortable.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Interactors/sortable.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test sortable', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickInteractionsHeading();
  await demoQAPage.clickSortableLink();
  await demoQAPage.verifyListTabIsVisible();
  await demoQAPage.dragAndDropListItems();
  await demoQAPage.verifyNewOrder();
});
