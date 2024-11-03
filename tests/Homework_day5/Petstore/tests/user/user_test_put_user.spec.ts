import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// Load JSON data
const dataPath = path.resolve(__dirname, '../../data/user/user_data_put_user.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Find user6 data
const user6 = data.users.find(user => user.username === 'user6');

test.describe('Update User6 Data', () => {
  const baseURL = 'https://petstore.swagger.io/v2/';
  test.use({ baseURL });

  test('Update user6 data', async ({ request }) => {
    if (user6) {
      // Send PUT request to update user6
      const response = await request.put(`${baseURL}user/${user6.username}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: user6
      });

      // Log response details
      console.log(`Response status: ${response.status()}`);
      const responseBody = await response.json();
      console.log(`Response body: ${JSON.stringify(responseBody, null, 2)}`);

      // Assert the API response
      expect(response.status()).toBe(200);
      expect(responseBody).toHaveProperty('message');
    } else {
      console.error('User6 not found in the JSON file.');
    }
  });
});
