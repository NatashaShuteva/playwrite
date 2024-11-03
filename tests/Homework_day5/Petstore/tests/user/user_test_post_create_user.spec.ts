import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// Load JSON data
const dataPath = path.resolve(__dirname, '../../data/user/user_data_post_create_user.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

test.describe('Create User', () => {
  const baseURL = 'https://petstore.swagger.io/v2/';
  test.use({ baseURL });

  data.users.forEach((user) => {
    test(`Create user: ${user.username}`, async ({ request }) => {
      // Send POST request
      const response = await request.post(`${baseURL}user`, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: user
      });

      // Log response details
      console.log(`Response status for ${user.username}: ${response.status()}`);
      const responseBody = await response.json();
      console.log(`Response body for ${user.username}: ${JSON.stringify(responseBody, null, 2)}`);

      // Assert the API response
      expect(response.status()).toBe(200);
      expect(responseBody).toHaveProperty('message');
    });
  });
});
