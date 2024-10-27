import { test } from '@playwright/test';
import { ButtonsPage } from '../../Pages/Elements/buttons.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Elements/buttons.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test double click', async ({ page }) => {
  const buttonsPage = new ButtonsPage(page);
  await buttonsPage.navigate();
  await buttonsPage.openButtonsPage();
  await buttonsPage.performDoubleClick();
  await buttonsPage.validateDoubleClick();
});

test('test right click', async ({ page }) => {
  const buttonsPage = new ButtonsPage(page);
  await buttonsPage.navigate();
  await buttonsPage.openButtonsPage();
  await buttonsPage.performRightClick();
  await buttonsPage.validateRightClick();
});

test('test dynamic click', async ({ page }) => {
  const buttonsPage = new ButtonsPage(page);
  await buttonsPage.navigate();
  await buttonsPage.openButtonsPage();
  await buttonsPage.performDynamicClick();
  await buttonsPage.validateDynamicClick();
});
