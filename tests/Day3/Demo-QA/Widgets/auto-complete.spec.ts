import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('div:nth-child(4) > div > .avatar').click();
  await page.getByText('Auto Complete').click();
  await page.locator('.auto-complete__value-container').first().click();
  await page.locator('#autoCompleteMultipleInput').fill('Green');
  await page.locator('#react-select-2-option-0').click();
  await expect(page.locator("//div[@class='css-12jo7m5 auto-complete__multi-value__label' and text()='Green']")).toBeVisible();
  //await expect(page.getByText('Green')).toBeVisible();
  await page.locator('div').filter({ hasText: /^Green$/ }).nth(2).click();
  await page.locator('#autoCompleteMultipleInput').fill('Red');
  await page.locator('#react-select-2-option-0').click();
  await expect(page.locator("//div[@class='css-12jo7m5 auto-complete__multi-value__label' and text()='Red']")).toBeVisible();
});