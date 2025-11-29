import { expect, Page, Locator } from "@playwright/test";

export class HeaderPage {

    // private readonly ContinShopBtn: Locator;
    // private readonly addedHeader: Locator;
    readonly prodNavBtn: Locator;
    readonly cartNavBtn: Locator;
    readonly logoutBtn: Locator;
    readonly loginBtn: Locator;
    readonly userNameItem: Locator;

    constructor(private page: Page) {
        this.page = page;
        // this.ContinShopBtn = this.page.getByRole('button', { name: 'Continue Shopping' });
        // this.addedHeader = this.page.locator('h4', { hasText: 'Added!' })
        // this.loginStatus = this.page.getByRole('link', { name: ' Signup / Login' }); 
        // this.cartEmptyMsg = this.page.getByText('Cart is empty!');
        // this.deleteBtns =  this.page.locator('.cart_quantity_delete'); 
        this.cartNavBtn =  this.page.locator("[href='/view_cart'] .fa");
        this.prodNavBtn = this.page.getByRole('link', { name: ' Products' }); 
        this.logoutBtn =  this.page.locator("[href='/logout']");
        this.loginBtn = this.page.getByRole('link', { name: ' Signup / Login' }); 
        this.userNameItem = this.page.locator(".navbar-nav li").last(); 
    }

    // getProdContainerByName(itemName: string){
    //    return this.page.locator(".productinfo", { hasText: itemName }); }

    // getProdOverlayByName(itemName: string){
    //    return this.page.locator(".overlay-content", { hasText: itemName }); }

    // getProductOverlayAddBtn(itemName: string){ 
    //     return this.getProdOverlayByName(itemName).locator("a"); }

    // getProductsHeading(){ return this.page.getByRole('heading', { name: 'All Products' }); }

    // getloginStatus(){ return this.loginStatus; }

    // async goToCart(){ await this.cartNavBtn.click(); }
    
    async goToCart(){ await this.cartNavBtn.click(); }

    async goToProducts(){ await this.prodNavBtn.click(); }
    
    async isLoggedIn(){ return await this.logoutBtn.count() > 0; }

    async verifySuccessfulLogin(name: string){
        console.log(await this.userNameItem.textContent())
        // expect (await this.userNameItem.textContent()).toContain(name); 
        // expect (await this.logoutBtn.count()).toBeGreaterThan(0); 
    }



}

