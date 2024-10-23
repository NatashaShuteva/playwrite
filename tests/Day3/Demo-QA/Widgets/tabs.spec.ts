import { test, expect } from '@playwright/test';

test('test for tabs', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Widgets' }).click();
  await page.getByText('Tabs').click();
  await expect(page.getByRole('tab', { name: 'What' })).toBeVisible();
  await expect(page.getByText('Lorem Ipsum is simply dummy')).toBeVisible();
  await page.getByRole('tab', { name: 'Origin' }).click();
  await expect(page.getByRole('tab', { name: 'Origin' })).toBeVisible();
  await expect(page.getByText('Contrary to popular belief,')).toBeVisible();
  await page.getByRole('tab', { name: 'Use' }).click();
  await expect(page.getByRole('tab', { name: 'Use' })).toBeVisible();
  await expect(page.getByText('It is a long established fact')).toBeVisible();
  await page.getByText('WhatOriginUseMore').click();
});