import { test, expect } from '@playwright/test';
// import productsSchema from "../../responsSchemas/allProductsSchema.json"
import * as allure from "allure-js-commons";

const searcEndPoint = '/api/searchProduct';
const searchParam = "men";

test.describe("Searching Functionality", () => {


    // test('Search product', async ({ request }) => {

    //     const startingTime = Date.now();
    //     const res = await request.post('/api/searchProduct', {
    //         params: { search_product: searchParam}
    //     });

    //     //0- headers and status code validation
    //     // expect(res.status()).toBe(200);
    //     // expect(res.headers()['content-type']).toContain("text/html; charset=utf-8");

    //     console.log(await res.json());
    //     // const resBody = await res.json();

    //     //1- Business Validation
    //     // expect(await resBody.products.length).toBe(34);

    //     // const resTime = Date.now() - startingTime;
    //     // //3- Response time Validation
    //     // expect(resTime).toBeLessThan(1000);

    //     //4- Schema Validation 
    //     // expectToMatchSchema(resBody, productsSchema);

    // });

    test('Invalid Search ', async ({ request }) => {

        // Search without search parameter
        const res = await request.post('/api/searchProduct');
        const resBody = await res.json();
        expect(await resBody.responseCode).toBe(400);
        expect(await resBody.message).toContain("search_product parameter is missing");

    });

});

