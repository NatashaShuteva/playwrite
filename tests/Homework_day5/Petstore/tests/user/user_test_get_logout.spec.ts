import { test, expect } from '@playwright/test';

test.describe('User API - Logout User', () => {
  const baseURL = 'https://petstore.swagger.io/v2/';
  test.use({ baseURL });

  test('Logout current logged-in user', async ({ request }) => {
    // Send GET request to logout user
    const response = await request.get(`${baseURL}user/logout`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Log response details
    console.log(`Response status: ${response.status()}`);
    const responseBody = await response.json();
    console.log(`Response body: ${JSON.stringify(responseBody, null, 2)}`);

    // Assert the API response
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('code', 200);
    expect(responseBody).toHaveProperty('type', 'unknown');
    expect(responseBody).toHaveProperty('message', 'ok');
  });
});
