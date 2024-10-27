import { test, expect } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Interactors/droppable.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Interactors/droppable.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('drag and drop', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickInteractionsHeading();
  await demoQAPage.clickDroppableLink();
  await demoQAPage.dragAndDrop();
});
