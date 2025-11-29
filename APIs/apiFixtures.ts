import { test as base } from "@playwright/test";
import { APIUserAccount } from "./APIUserAccount";
import { APIProductList } from "./APIProductList";
import { APIBrandsList } from "./APIBrandsList";

type Myfixtures = { 
    userAccApi: APIUserAccount, 
    prodListApi: APIProductList, 
    brandListApi: APIBrandsList, 
    // header: HeaderPage, 
}


export const test = base.extend<Myfixtures>({

  userAccApi: async ({ request }, use) => {
    const client = new APIUserAccount(request);
    await use(client);
  },

  prodListApi: async ({ request }, use) => {
    const client = new APIProductList(request);
    await use(client);
  },

  brandListApi: async ({ request }, use) => {
    const client = new APIBrandsList(request);
    await use(client);
  },


});

export const expect = test.expect;
