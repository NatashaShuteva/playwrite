import { test, expect } from '@playwright/test';


test.describe('Store API - Get Order by ID', () => {
  const baseURL = 'https://petstore.swagger.io/v2/';
  test.use({ baseURL });

  test('Fetch order by ID: 1', async ({ request }) => {
    const orderId = 1; // Specific order ID to test

    // Send GET request
    const response = await request.get(`${baseURL}store/order/${orderId}`);

    // Log response details
    console.log(`Response status: ${response.status()}`);
    const responseBody = await response.json();
    console.log(`Response body: ${JSON.stringify(responseBody, null, 2)}`);

    // Assert the API response for valid order
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('petId');
    expect(responseBody).toHaveProperty('quantity');
    expect(responseBody).toHaveProperty('shipDate');
    expect(responseBody).toHaveProperty('status');
    expect(responseBody).toHaveProperty('complete');
  });
});
