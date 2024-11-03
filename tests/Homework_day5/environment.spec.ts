import { test } from '@playwright/test';


test('Working with environments', async ({  }) => {
    console.log(process.env.URL);
    console.log(process.env.USER);
    console.log(process.env.DEMOQA_URL);
    console.log(process.env.SAUCELABS_URL);
    console.log(process.env.API_URL);

});