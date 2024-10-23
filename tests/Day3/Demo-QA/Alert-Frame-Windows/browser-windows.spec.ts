import { test, expect } from '@playwright/test';


test('test new window', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.locator('div:nth-child(2) > div > .avatar > svg').click();
    await page.getByText('Alerts, Frame & Windows').click();
    await page.getByText('Browser Windows').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'New Window', exact: true }).click();
    const page1 = await page1Promise;
    await expect(page1.getByRole('heading', { name: 'This is a sample page' })).toBeVisible();
    page1.close();
  });

  test('test new window message', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.locator('div:nth-child(2) > div > .card-up').click();
    await page.getByText('Alerts, Frame & Windows').click();
   // await page.getByText('Alerts, Frame & Windows').dblclick();
    await page.getByText('Browser Windows').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'New Window Message' }).click();
    const page1 = await page1Promise;
    await expect(page1.getByText('Knowledge increases by')).toBeVisible();
    page1.close();
  });

  test('test for new tab', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.locator('div:nth-child(2) > div > .avatar').click();
    await page.getByText('Alerts, Frame & Windows').click();
    await page.getByText('Browser Windows').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'New Tab' }).click();
    const page1 = await page1Promise;
    await expect(page1.getByRole('heading', { name: 'This is a sample page' })).toBeVisible();
  });
  