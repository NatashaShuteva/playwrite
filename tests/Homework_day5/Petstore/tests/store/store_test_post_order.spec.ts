import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// Load JSON data
const dataPath = path.resolve(__dirname, '../../data/store/store_data_post_order.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

test.describe('Store API - Place Order', () => {
  const baseURL = 'https://petstore.swagger.io/v2/';
  test.use({ baseURL });

  data.orders.forEach((orderData) => {
    test(`Place a new order for pet with ID: ${orderData.petId}`, async ({ request }) => {
      // Send POST request
      const response = await request.post(`${baseURL}store/order`, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: orderData
      });

      // Log response details
      console.log(`Response status: ${response.status()}`);
      const responseBody = await response.json();
      console.log(`Response body: ${JSON.stringify(responseBody, null, 2)}`);

      // Assert the API response
      expect(response.status()).toBe(200);
      expect(responseBody).toHaveProperty('id');
      expect(responseBody).toHaveProperty('petId');
      expect(responseBody).toHaveProperty('quantity');
      expect(responseBody).toHaveProperty('shipDate');
      expect(responseBody).toHaveProperty('status');
      expect(responseBody).toHaveProperty('complete');
    });
  });
});
