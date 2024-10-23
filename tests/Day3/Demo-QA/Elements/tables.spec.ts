import { test, expect } from '@playwright/test';

test('test add, edit and delete entry from the table', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('path').first().click();
  await page.getByText('Web Tables').click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill('Natasha');
  await page.getByPlaceholder('Last Name').click();
  //await page.getByPlaceholder('Last Name').fill('Shuteva');
  await page.locator('input#lastName').fill('Shuteva');
  await page.getByPlaceholder('name@example.com').click();
  await page.getByPlaceholder('name@example.com').fill('suteva@gmail.com');
  await page.getByPlaceholder('Age').click();
  await page.getByPlaceholder('Age').fill('41');
  await page.getByPlaceholder('Salary').click();
  await page.getByPlaceholder('Salary').fill('40000');
  await page.getByPlaceholder('Department').click();
  await page.getByPlaceholder('Department').fill('QA');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('gridcell', { name: '41' }).click();
  await expect(page.getByRole('gridcell', { name: '41' })).toBeVisible();
  await page.locator('#edit-record-4').getByRole('img').click();
  await page.getByPlaceholder('Age').click();
  await page.getByPlaceholder('Age').fill('34');
  //await page.getByRole('button', { name: 'Submit' }).click();
  await page.locator('button#submit.btn.btn-primary').click();
  await expect(page.getByRole('gridcell', { name: '34' })).toBeVisible();
  await page.locator('#delete-record-4 path').click();
});


