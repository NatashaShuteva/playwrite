import { test } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Widget/slider.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Widget/slider.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test for slider', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickWidgetsHeading();
  await demoQAPage.clickSliderLink();
  await demoQAPage.setSliderValue('75');
  await demoQAPage.verifySliderValue();
});
