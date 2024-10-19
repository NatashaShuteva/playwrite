import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../fixtures/data/single-user.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const jsonData = JSON.parse(rawData);

test('test', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill(jsonData.username);
    await page.locator('[data-test="password"]').fill(jsonData.password);
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    await expect(page.locator('[data-test="title"]')).toContainText(jsonData.title);
});

    