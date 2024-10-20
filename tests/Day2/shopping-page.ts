import { expect, type Locator, type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locatorsPath = path.resolve(__dirname, '../fixtures/locators/shop-locators.json');
const rawLocators = fs.readFileSync(locatorsPath, 'utf8');
const locators = JSON.parse(rawLocators);

export class ShoppingPage {
    readonly page: Page;
    readonly siteLink: Locator;
    readonly shopNowLink: Locator;
    readonly addToCartButton: Locator;
    readonly airJordanLink: Locator;
    readonly yeezyLink: Locator;
    readonly modalBackdrop: Locator;
    readonly modalCloseButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.siteLink = page.locator(locators.homepage.siteLink);
        this.shopNowLink = page.locator(locators.homepage.shopNowLink);
        this.addToCartButton = page.locator(locators.productPage.addToCartButton);
        this.airJordanLink = page.locator(locators.productPage.airJordanLink);
        this.yeezyLink = page.locator(locators.productPage.yeezyLink);
        this.modalBackdrop = page.locator(locators.modal.backdrop);
        this.modalCloseButton = page.locator(locators.modal.closeButton);
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async verifySiteLinkVisible() {
        await expect(this.siteLink).toBeVisible();
    }

    async clickShopNow() {
        await this.shopNowLink.click();
    }

    async closeModal() {
        await this.modalBackdrop.click();
        await this.modalCloseButton.click();
    }

    async clickAirJordanLink() {
        await this.airJordanLink.first().click();
    }

    async clickYeezyLink() {
        await this.yeezyLink.click();
    }

    async verifyAddToCartButtonVisible() {
        await expect(this.addToCartButton).toBeVisible();
    }
}