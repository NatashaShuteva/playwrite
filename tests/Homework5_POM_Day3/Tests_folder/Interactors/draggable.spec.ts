import { test, expect } from '@playwright/test';
import { DemoQAPage } from '../../Pages/Interactors/draggable.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Interactors/draggable.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('drag to specific coordinates', async ({ page }) => {
  const demoQAPage = new DemoQAPage(page);

  await demoQAPage.navigate();
  await demoQAPage.clickInteractionsHeading();
  await demoQAPage.clickDraggableLink();
  await demoQAPage.dragToCoordinates(240, 0);
});
