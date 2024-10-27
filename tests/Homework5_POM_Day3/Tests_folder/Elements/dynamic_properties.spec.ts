import { test } from '@playwright/test';
import { DynamicPropertiesPage } from '../../Pages/Elements/dynamic_properties.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Elements/dynamic_properties.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('Dynamic Properties Test', async ({ page }) => {
  const dynamicPropertiesPage = new DynamicPropertiesPage(page);
  await dynamicPropertiesPage.navigate();
  await dynamicPropertiesPage.openDynamicPropertiesPage();
  await dynamicPropertiesPage.verifyInitialColor();
  await dynamicPropertiesPage.waitForColorChange();
});
