import { test, expect } from '@playwright/test';
//import { describe } from 'node:test';

test.describe("Test suite for Automation tests", ()=> {

test('test', async ({ page }) => {
  //await page.goto('https://www.saucedemo.com/');
  await page.goto('/');
  await page.locator('[data-test="login-credentials"]').click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText('Products');
});

/*
test('test fail', async ({ page }) => {
    //await page.goto('https://www.saucedemo.com/');
    await page.goto('/');
    await page.locator('[data-test="login-credentials"]').click();
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await expect(page.locator('[data-test="title"]')).toContainText('Productsn');
  });

  */

  test('test: Vist web site and verify the title', async ({ page }) => {
    await page.goto('https://ananas.mk/');
    await page.getByRole('button', { name: 'Се согласувам' }).click();
    await expect(page.getByLabel('Ananas Logo')).toBeVisible();
  });

});