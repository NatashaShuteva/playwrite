import { test, expect } from '@playwright/test';
import { ShoppingPage } from '../Day2/shopping-page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../fixtures/data/shop-data.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const jsonData = JSON.parse(rawData);

test('test with page object 1', async ({ page }) => {
    const shoppingPage = new ShoppingPage(page);
    await shoppingPage.goto(jsonData.baseUrl);
    await shoppingPage.verifySiteLinkVisible();
    await shoppingPage.clickShopNow();
    await shoppingPage.closeModal(); 
    await shoppingPage.clickAirJordanLink();
    await shoppingPage.verifyAddToCartButtonVisible();
    await shoppingPage.goto(jsonData.baseUrl);
    await shoppingPage.clickShopNow();
    await shoppingPage.clickYeezyLink();
    await shoppingPage.verifyAddToCartButtonVisible()
});

test.skip('test with page object 2', async ({ page }) => {
    const shoppingPage = new ShoppingPage(page);
    await shoppingPage.goto(jsonData.baseUrl);
    await shoppingPage.verifySiteLinkVisible();
    await shoppingPage.clickShopNow();
    await shoppingPage.closeModal(); 
    await shoppingPage.clickAirJordanLink();
    await shoppingPage.verifyAddToCartButtonVisible();
});

test.fixme('test with page object 3', async ({ page }) => {
    const shoppingPage = new ShoppingPage(page);
    await shoppingPage.goto(jsonData.baseUrl);
    await shoppingPage.verifySiteLinkVisible();
    await shoppingPage.clickShopNow();
    await shoppingPage.closeModal(); 
    await shoppingPage.clickYeezyLink();
    await shoppingPage.verifyAddToCartButtonVisible()
});