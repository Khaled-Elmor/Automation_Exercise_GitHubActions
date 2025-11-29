// import { test, expect } from '@playwright/test';
import { test, expect } from '../../APIs/apiFixtures';
import { expectToMatchSchema } from '../../Utils/utils';
import * as allure from "allure-js-commons";

// const brandsEndPoint = '/api/brandsList';

test.describe("Get All Brands List /brandsList", () => {
    
    test('Positive Tests', async ({ brandListApi }) => {
        const startingTime = Date.now();
        
        const res = await brandListApi.getBrandList();
        const resBody = await res.json();

        //headers and status code validation
        await allure.step("Basic Validations status code, headers, ResTime", async () => {
            expect(res.status()).toBe(200);
            expect(res.headers()['content-type']).toContain("text/html; charset=utf-8");
            //Response time Validation
            const resTime = Date.now() - startingTime; 
            expect(resTime).toBeLessThan(1500);
        });

        await allure.step("Business Validation", async () => {
            expect(resBody).toHaveProperty('brands');
            expect(await resBody.brands.length).toBe(34);
        })

        // await allure.step("Schema Validation", async () => {
        //     //Schema Validation 
        //     expectToMatchSchema(resBody, productsSchema);
        // })
    });


    test('Negative Validations', async ({ brandListApi }) => {

        await allure.step("Invalid URL Validation", async () => {
            // Invalid URL Validation 
            const res1 = await brandListApi.getBrandListURL('/api/brandsLists');
            expect(res1.status()).toBe(404);
        })

        await allure.step("Invalid Methods Validations", async () => {
            //Invalid Methods Validations
            const res2 = await brandListApi.postBrandList();
            expect(res2.status()).toBe(200);
            const res2Body = await res2.json();
            expect(await res2Body.responseCode).toBe(405)
            expect (await res2Body.message).toContain("This request method is not supported");

            const res3 = await brandListApi.putBrandList();
            expect(res3.status()).toBe(200);
            const res3Body = await res3.json();
            expect(await res3Body.responseCode).toBe(405); 
            expect (await res3Body.message).toContain("This request method is not supported");

            const res4 = await brandListApi.deleteBrandList();
            expect(res4.status()).toBe(200);
            const res4Body = await res4.json();
            expect(await res4Body.responseCode).toBe(405); 
            expect (await res4Body.message).toContain("This request method is not supported");

        });
    });

})