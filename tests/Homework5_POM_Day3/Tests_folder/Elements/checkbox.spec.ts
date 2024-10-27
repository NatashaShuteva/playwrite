import { test } from '@playwright/test';
import { CheckBoxPage } from '../../Pages/Elements/checkbox.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Elements/checkbox.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('verify checkbox interactions', async ({ page }) => {
  const checkBoxPage = new CheckBoxPage(page);
  await checkBoxPage.navigate();
  await checkBoxPage.openCheckBox();
  await checkBoxPage.toggleNodes();
  await checkBoxPage.validateWordFileText(data.expectedText.wordFile);
  await checkBoxPage.validateHomeText(data.expectedText.home);
});
