import { test, expect } from '@playwright/test';

test.describe('Store API - Delete Order by ID', () => {
  const baseURL = 'https://petstore.swagger.io/v2/';
  const validOrderId = 9;

  test(`Delete order by ID: ${validOrderId}`, async ({ request }) => {
    // Send DELETE request
    const response = await request.delete(`${baseURL}store/order/${validOrderId}`);

    // Log response details
    console.log(`Response status: ${response.status()}`);
    const responseBody = await response.json();
    console.log(`Response body: ${JSON.stringify(responseBody, null, 2)}`);

    if (response.status() === 404) {
      // Assert the API response for non-existent order
      expect(responseBody).toHaveProperty('message');
      expect(responseBody.message).toContain('Order Not Found');
    } else {
      // Assert the API response for valid order
      expect(response.status()).toBe(200);
      expect(responseBody).toBe(validOrderId.toString());
    }
  });
});
