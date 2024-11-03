import { test, expect } from '@playwright/test';
import { queryDatabase, getPropertyListFromResult } from './db-conecttion';

let dbResult: any[];
let categoryList: string[];  // List to store property values
let originalCategoryName: string;

test.beforeAll(async () => {
  const query = "SELECT * FROM categories"; // Replace with your actual query
  dbResult = await queryDatabase(query);
  //console.log('Database query result:', dbResult);

  // Get the list of 'name' properties from the result set
  categoryList = getPropertyListFromResult(dbResult, 'CategoryName');
  console.log('List of categories:', categoryList);
});

// Read a category with CategoryID=1
test('Read a category with ID 1', async () => {
  const categoryId = 1; // Example category ID to read
  const result = await queryDatabase(`SELECT * FROM categories WHERE CategoryID = ${categoryId}`);

  expect(result.length).toBe(1);
  expect(result[0].CategoryID).toBe(categoryId);

  // Store the original category name for later use
  originalCategoryName = result[0].CategoryName;
  console.log('Original Category Name:', originalCategoryName);
});

// Select query for CategoryID=3
test('Select query for CategoryID=3', async () => {
  const categoryId = 3; // Category ID to read
  const result = await queryDatabase(`SELECT * FROM categories WHERE CategoryID = ${categoryId}`);

  console.log(`Result for CategoryID=3:`, result);

  // Assert that the category was found
  expect(result.length).toBe(1);
  expect(result[0].CategoryID).toBe(categoryId);
  console.log('Category Data for ID 3:', result[0]);
});

// Select query for CategoryName=Seafood
test("Select query for CategoryName='Seafood'", async () => {
  const categoryName = 'Seafood'; // Category name to read
  const result = await queryDatabase(`SELECT * FROM categories WHERE CategoryName = '${categoryName}'`);

  console.log(`Result for CategoryName='Seafood':`, result);

  // Assert that the category was found
  expect(result.length).toBeGreaterThan(0); // There could be more than one row with the same category name
  expect(result[0].CategoryName).toBe(categoryName);
  console.log('Category Data for Name Seafood:', result[0]);
});



