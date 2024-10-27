import { test } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Widget/tool_tips.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Widget/tool_tips.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test for tool tip', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickWidgetsHeading();
  await demoQAPage.clickToolTipsLink();
  await demoQAPage.hoverAndVerify();
});
