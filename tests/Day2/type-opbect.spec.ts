import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { SaucedemoPage } from './saucedemo-page';

const dataPath = path.resolve(__dirname, '../fixtures/data/single-user.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const jsonData = JSON.parse(rawData);

test('test with page object ', async ({ page }) => {
   const saucedemoPage = new SaucedemoPage(page);
   await saucedemoPage.goto();
   await saucedemoPage.typeUsername(jsonData.username);
   await saucedemoPage.typePassword(jsonData.password);
   await saucedemoPage.clickLogin();
   console.log(`Title from JSON: ${jsonData.title}`);
   await saucedemoPage.verifySuccessLogin(jsonData.title);
});