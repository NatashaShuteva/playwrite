import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// Load JSON data
const dataPath = path.resolve(__dirname, '../../data/user/user_data_get_login.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

test.describe('User API - Login User', () => {
  const baseURL = 'https://petstore.swagger.io/v2/';
  test.use({ baseURL });

  data.users.forEach((user) => {
    test(`Login user: ${user.username}`, async ({ request }) => {
      // Send GET request to login user
      const response = await request.get(`${baseURL}user/login`, {
        params: {
          username: user.username,
          password: user.password
        }
      });

      // Log response details
      console.log(`Response status for ${user.username}: ${response.status()}`);
      const responseBody = await response.json();
      console.log(`Response body for ${user.username}: ${JSON.stringify(responseBody, null, 2)}`);

      // Assert the API response
      if (response.status() === 200) {
        expect(responseBody).toHaveProperty('message');
        expect(response.headers()).toHaveProperty('x-expires-after');
        expect(response.headers()).toHaveProperty('x-rate-limit');
      } else {
        expect(response.status()).toBe(400);
      }
    });
  });
});
