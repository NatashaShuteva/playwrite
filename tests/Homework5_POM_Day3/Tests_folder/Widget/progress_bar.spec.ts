import { test } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Widget/progress_bar.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Widget/progress_bar.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test for progress bar', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickWidgetsHeading();
  await demoQAPage.clickProgressBarLink();
  await demoQAPage.startProgressBar();
  await demoQAPage.waitForProgressBarToComplete();
  await demoQAPage.verifyProgressBar();
  await demoQAPage.verifyResetButton();
});
