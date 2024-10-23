import { test, expect } from '@playwright/test';

test('test for widget sections', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Widgets' }).click();
  //await page.getByText('Accordian').click();
  await page.locator("//span[@class='text' and text()='Accordian']").click();
  await expect(page.getByText('Lorem Ipsum is simply dummy')).toBeVisible();
  await page.getByText('Where does it come from?').click();
  await expect(page.getByText('Contrary to popular belief,')).toBeVisible();
  await page.getByText('Why do we use it?').click();
  await expect(page.getByText('It is a long established fact')).toBeVisible();
});