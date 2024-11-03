import { Page, Locator } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../../login_form_POM/Locators/login.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
//const locators = JSON.parse(rawLocators);
const locators = JSON.parse(rawLocators).locators;

export class ShoppingPage {
  readonly page: Page;
  readonly addFirstItemToShopCard: Locator;
  readonly cartBadge: Locator;
 

  constructor(page: Page) {
    this.page = page;
    this.addFirstItemToShopCard = page.locator(locators.addFirstItemToShopCard);
    this.cartBadge = page.locator(locators.cartBadge);
  }

  async addItemToCart() {
    await this.addFirstItemToShopCard.click(); 
  }

  async verifyCartItemCount(expectedCount: number) {
     const itemCount = await this.cartBadge.innerText();
      console.log(`Cart item count: ${itemCount}`); 
      // Log the item count for debugging await expect(this.cartBadge).toHaveText(expectedCount.toString()); 
      }

}
