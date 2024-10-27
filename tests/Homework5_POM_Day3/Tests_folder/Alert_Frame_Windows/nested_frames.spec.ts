import { test } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Alert_Frame_Windows/nested_frames.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Alert_Frame_Windows/nested_frames.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test for nested frames', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickAvatarSvg();
  await demoQAPage.clickAlertsFrameWindowsLink();
  await demoQAPage.clickNestedFramesLink();
  await demoQAPage.verifyNestedFramesText();
});
