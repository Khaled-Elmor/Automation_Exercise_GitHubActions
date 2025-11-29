import { test as base } from '@playwright/test'  
import { ProductsPage } from './Products.page';
import { CartPage } from './Cart.page';
import { HeaderPage } from './Header.page';
import { LeftSide } from './LeftSide.page';
import { LoginPage } from './Login.page';
import { HomePage } from './Home.page';
import { ProDetailsPage } from './ProdDetails.page';


type Myfixtures = { //3 
    prodPage: ProductsPage, 
    cartPage: CartPage, 
    header: HeaderPage, 
    leftSide: LeftSide, 
    loginPage: LoginPage, 
    homePage: HomePage, 
    proDetailPage: ProDetailsPage, 
}

export const test = base.extend<Myfixtures>({ 
    prodPage: async ({ page }, use) => {
        await use(new ProductsPage(page))
    }, 
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page))
    },
    header: async ({ page }, use) => {
        await use(new HeaderPage(page))
    }, 
    leftSide: async ({ page }, use) => {
        await use(new LeftSide(page))
    }, 
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    }, 
    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
    }, 
    proDetailPage: async ({ page }, use) => {
        await use(new ProDetailsPage(page))
    }, 

})

export const expect = test.expect; 