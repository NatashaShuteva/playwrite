import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// Load JSON data
const dataPath = path.resolve(__dirname, '../../data/user/user_data_get_user.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

test.describe('User API - Get User by Username', () => {
  const baseURL = 'https://petstore.swagger.io/v2/';
  test.use({ baseURL });

  data.usernames.forEach((username) => {
    test(`Fetch user by username: ${username}`, async ({ request }) => {
      // Send GET request
      const response = await request.get(`${baseURL}user/${username}`, {
        headers: {
          'accept': 'application/json'
        }
      });

      // Log response details
      console.log(`Response status: ${response.status()}`);
      const responseBody = await response.json();
      console.log(`Response body: ${JSON.stringify(responseBody, null, 2)}`);

      // Assert the API response
      expect(response.status()).toBe(200);
      expect(responseBody).toEqual({
        id: 5,
        username: 'user5',
        firstName: 'first5',
        lastName: 'last5',
        email: 'user5@example.com',
        password: 'password5',
        phone: '1234567890',
        userStatus: 1
      });
    });
  });
});
