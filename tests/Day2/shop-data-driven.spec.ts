import { test, expect } from '@playwright/test';
import { ShoppingPage } from './shopping-page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../fixtures/data/shop-data.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const jsonData = JSON.parse(rawData);

test('test with page object', async ({ page }) => {
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