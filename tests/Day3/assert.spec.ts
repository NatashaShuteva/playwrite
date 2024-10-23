import { test, expect, Page } from '@playwright/test';
import assert from 'assert';

test('test assert', async ({ page }) => {
    await page.goto('https://demoqa.com');
    await page.locator('.card-up').first().click();
    await page.getByText('Check Box').click();
    await page.getByLabel('Toggle').click();
    await page.locator("(//button[@class='rct-collapse rct-collapse-btn'])[4]").click();
    await page.locator("(//span[@class='rct-node-icon'])[5]").click();
    //await expect(page.getByText('wordFile')).toBeVisible();
    // Wait for and validate the 'wordFile' text is visible
    await expect(page.getByText('wordFile')).toBeVisible();
    const wordFileText = await page.getByText('wordFile').textContent();
    assert.strictEqual(wordFileText, 'wordFile', 'wordFile text should match');
    await page.locator("(//span[@class='rct-node-icon'])[1]").click();
    //await expect(page.getByText('home', { exact: true })).toBeVisible();
    await expect(page.locator("(//span[@class='text-success'])[1]")).toBeVisible();
    const homeText = await page.locator("(//span[@class='text-success'])[1]").textContent();
    assert.strictEqual(homeText, 'home', 'home text should match');
});


test('test soft assert', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.locator('.card-up').first().click();
    await page.getByText('Check Box').click();
    await page.getByLabel('Toggle').click();
    //await page.locator('li').filter({ hasText: /^Downloads$/ }).getByLabel('Toggle').click();
    await page.locator("(//button[@class='rct-collapse rct-collapse-btn'])[4]").click();
    //await page.locator('label').filter({ hasText: 'Word File.doc' }).getByRole('img').first().click();
    await page.locator("(//span[@class='rct-node-icon'])[5]").click();
    await expect.soft(page.getByText('wordFilen')).toBeVisible();
    await page.locator("(//span[@class='rct-node-icon'])[1]").click();
    await expect(page.getByText('home', { exact: true })).toBeVisible();
  });

  test('test multi options', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.getByRole('heading', { name: 'Widgets' }).click();
    await page.getByText('Select Menu').click();
    await page.locator('#cars').selectOption(['volvo', 'saab']);
  
    // Verify that Volvo and Saab are selected
    const selectedOptions = await page.locator('#cars option:checked').allTextContents();
    expect(selectedOptions).toEqual(['Volvo', 'Saab']);
  });
  
