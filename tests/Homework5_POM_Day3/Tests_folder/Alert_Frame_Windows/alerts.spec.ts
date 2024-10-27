import { test } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Alert_Frame_Windows/alerts.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Alert_Frame_Windows/alerts.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test alert box', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickAvatar();
  await demoQAPage.clickAlertsFrameWindowsLink();
  await demoQAPage.clickAlertsLink();
  await demoQAPage.handleAlertAndVerify();
});
