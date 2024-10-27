import { test } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Widget/auto_complete.page'; 
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Widget/auto_complete.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test for auto complete', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickAvatar();
  await demoQAPage.clickAutoCompleteLink();
  await demoQAPage.fillAndVerifyAutoComplete('Green', data.expectedMessages.greenLabel);
  await demoQAPage.fillAndVerifyAutoComplete('Red', data.expectedMessages.redLabel);
});
