// @ts-check
import {test, expect} from "@playwright/test"

const baseURL = 'https://petstore.swagger.io/v2/';

test ("Create a new pet", async({request}) => {

  const petId = 6199;
  const name = "some name";
    const response = await request.post(`${baseURL}pet`, {
        data: {
            "id": petId,
            "category": {
              "id": 2107,
              "name": name
            },
            "name": "playwright Tommy",
            "photoUrls": [
              "string"
            ],
            "tags": [
              {
                "id": 1708,
                "name": "black"
              }
            ],
            "status": "available"

        }
    });

    // assert that the api is working as expected
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // saving created pet info
    const petDetail = await response.json();
    //console.log(petDetail);

    await expect(petDetail.category.name).toBe(name);

    const petName = petDetail.category.name;
});