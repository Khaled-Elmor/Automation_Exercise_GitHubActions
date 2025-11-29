// import { test, expect } from '@playwright/test';

import { test, expect } from '../../POM/pageFixtures';
import testData from "../../testData/ete1.json"; 
/*
1- Login 
2- Click on View Product for any Product 
3- Verify correct product details page and 
4- Click "Add to Cart" and Click "View Cart" link on pop up Modal  
5- Verify Correct Product and Click "Proceed to Checkout"
6- Verify Correct Checout Page and click "Place Order"
7- Enter Card Details and click "Pay and confirm Order"
8- Verify "Order Placed!" msg 
*/


test.describe("User Flow Test", () => {

  test('View Product, Add it Cart, change quantity, proceed till checkout modal appears ',
    async ({ page, homePage, proDetailPage, cartPage }) => {
      
      await page.goto('/');

      await homePage.verifyFeaturedItems(); 
      const name = await homePage.clickViewProdNumGetName( testData.productIndex );
      
      // Bug quantity can accept negative values 
      await proDetailPage.adjustQuantity("3"); 
      
      await proDetailPage.clickAddtoCartnVerifyAdded(); 

      await proDetailPage.clickviewCartLink(); 

      await cartPage.verifyItemQuantityandName( name as string, testData.productQuntity );
      
      await cartPage.proceedCheckout();
      await cartPage.verifyLoginModalAppears();
      
    });

})
