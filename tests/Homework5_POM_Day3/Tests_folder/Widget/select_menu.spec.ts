import { test } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Widget/select_menu.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Widget/select_menu.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test for select value', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickWidgetsHeading();
  await demoQAPage.clickSelectMenuLink();
  await demoQAPage.selectOption1();
});

test('test for select one', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickWidgetsHeading();
  await demoQAPage.clickSelectMenuLink();
  await demoQAPage.selectOne2();
});

test('test multi options select', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickWidgetsHeading();
  await demoQAPage.clickSelectMenuLink();
  await demoQAPage.multiSelectOptions();
});
