import { test } from '@playwright/test';
import { RadioButtonPage } from '../../Pages/Elements/radiobutton.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Elements/radiobutton.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('verify radio button interactions', async ({ page }) => {
  const radioButtonPage = new RadioButtonPage(page);
  await radioButtonPage.navigate();
  await radioButtonPage.openRadioButtonPage();
  await radioButtonPage.selectImpressiveOption();
  await radioButtonPage.validateImpressiveText(); // No need to pass the text, it's fetched from the data file
});
