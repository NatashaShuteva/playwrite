import { test } from '@playwright/test';
import { WebTablePage } from '../../Pages/Elements/tables.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Elements/tables.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test add, edit and delete entry from the table', async ({ page }) => {
  const webTablePage = new WebTablePage(page);
  await webTablePage.navigate();
  await webTablePage.openWebTablePage();
  await webTablePage.addEntry(data.userDetails);
  await webTablePage.validateAgeCell(data.userDetails.age);
  await webTablePage.editEntry(data.updatedDetails);
  await webTablePage.validateAgeCell(data.updatedDetails.age);
  await webTablePage.deleteEntry();
});