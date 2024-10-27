import { test } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Alert_Frame_Windows/browser_windows.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Alert_Frame_Windows/browser_windows.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test new window', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickAvatar();
  await demoQAPage.clickAlertsFrameWindowsLink();
  await demoQAPage.clickBrowserWindowsLink();
  await demoQAPage.clickNewWindowButton();
});

test('test new window message', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickCardUp();
  await demoQAPage.clickAlertsFrameWindowsLink();
  await demoQAPage.clickBrowserWindowsLink();
  await demoQAPage.clickNewWindowMessageButton();
});

test('test for new tab', async ({ page }) => {
    const demoQAPage = new DemoQAPage(page);
  
    await demoQAPage.navigate();
    await demoQAPage.clickAvatar();
    await demoQAPage.clickAlertsFrameWindowsLink();
    await demoQAPage.clickBrowserWindowsLink();
    await demoQAPage.clickNewTabButton();
  });