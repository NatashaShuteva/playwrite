import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
 // await page.locator('svg').first().click();
  await page.locator('div.card.mt-4').first().click();
  //await page.locator('li').filter({ hasText: 'Text Box' }).click();
  await page.locator('span.text:has-text("Text Box")').click();
  //await page.getByPlaceholder('Full Name').click();
  await page.locator('#userName').click();
  await page.getByPlaceholder('Full Name').fill('Natahsa');
  await page.getByPlaceholder('name@example.com').click();
  await page.getByPlaceholder('name@example.com').fill('natasha@gmail.com');
  await page.getByPlaceholder('Current Address').click();
  await page.getByPlaceholder('Current Address').fill('adrewss1');
  await page.locator('#permanentAddress').click();
  await page.locator('#permanentAddress').fill('adress2');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Name:Natahsa')).toBeVisible();
  await page.getByText('Email:natasha@gmail.com').click();
  await expect(page.getByText('Email:natasha@gmail.com')).toBeVisible();
  await expect(page.getByText('Current Address :adrewss1')).toBeVisible();
  await page.getByText('Current Address :adrewss1').click();
  await expect(page.getByText('Current Address :adrewss1')).toBeVisible();
 // await page.getByText('Permananet Address :adress2').click();
  await page.locator('p.mb-1#permanentAddress').click();
  await expect(page.getByText('Permananet Address :adress2')).toBeVisible();
});