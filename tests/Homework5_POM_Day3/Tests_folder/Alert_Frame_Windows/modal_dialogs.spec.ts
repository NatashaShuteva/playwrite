import { test } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Alert_Frame_Windows/modal_dialogs.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Alert_Frame_Windows/modal_dialogs.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test for modal dialog', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickAvatarSvg();
  await demoQAPage.clickModalDialogsLink();
  await demoQAPage.openLargeModalAndVerify();
});
