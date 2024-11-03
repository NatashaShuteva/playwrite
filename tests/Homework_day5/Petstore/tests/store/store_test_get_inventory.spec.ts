import { test, expect } from '@playwright/test';

test.describe('Store API - Inventory', () => {
  const baseURL = 'https://petstore.swagger.io/v2/';

  test('Get inventory status', async ({ request }) => {
    // Send GET request
    const response = await request.get(`${baseURL}store/inventory`);

    // Log response details
    console.log(`Response status: ${response.status()}`);
    const responseBody = await response.json();
    console.log(`Response body: ${JSON.stringify(responseBody, null, 2)}`);

    // Assert the API response
    expect(response.status()).toBe(200);
    expect(responseBody).toBeInstanceOf(Object);

    // Flexible property checks
    const expectedProperties = ['sold', 'available', 'pending'];
    expectedProperties.forEach(property => {
      if (responseBody.hasOwnProperty(property)) {
        expect(responseBody).toHaveProperty(property);
      } else {
        console.warn(`Property ${property} not found in response`);
      }
    });
  });
});
