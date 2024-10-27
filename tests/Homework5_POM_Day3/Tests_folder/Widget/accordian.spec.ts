import { test } from '@playwright/test';
import { AccordianPage } from '../../Pages/Widget/accordian.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Widget/accordian.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test for widget sections', async ({ page }) => {
  const accPage = new AccordianPage(page);

  await accPage.navigate();
  await accPage.clickWidgetsHeading();
  await accPage.clickAccordianLink();
  await accPage.verifyAccordianSections();
});
