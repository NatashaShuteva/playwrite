import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// Load JSON data
const dataPath = path.resolve(__dirname, '../../data/user/user_data_post_create_with_array.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

test.describe('Create Users with Array', () => {
  const baseURL = 'https://petstore.swagger.io/v2/';
  test.use({ baseURL });

  test('Create users using an array', async ({ request }) => {
    // Send POST request
    const response = await request.post(`${baseURL}user/createWithArray`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: data.users
    });

    // Log response details
    console.log(`Response status: ${response.status()}`);
    const responseBody = await response.json();
    console.log(`Response body: ${JSON.stringify(responseBody, null, 2)}`);

    // Assert the API response
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('message');
  });
});
