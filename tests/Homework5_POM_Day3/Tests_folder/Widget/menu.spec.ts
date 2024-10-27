import { test } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Widget/menu.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Widget/menu.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test select item from menu', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickWidgetsHeading();
  await demoQAPage.clickMenuLink();
  await demoQAPage.selectItemFromMenu();
});
