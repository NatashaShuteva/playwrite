import { test } from '@playwright/test';
import { BrokenLinksPage } from '../../Pages/Elements/brokenlinks.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Elements/brokenlinks.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test for broken links', async ({ page }) => {
  const brokenLinksPage = new BrokenLinksPage(page);
  await brokenLinksPage.navigate();
  await brokenLinksPage.openBrokenLinksPage();
  await brokenLinksPage.checkImageVisibility();
  await brokenLinksPage.clickBrokenLink();
  await brokenLinksPage.validateStatusCodesHeading();
});
