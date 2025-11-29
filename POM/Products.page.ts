import { expect, Page, Locator } from "@playwright/test";

export class ProductsPage {

    private readonly ContinShopBtn: Locator;
    private readonly addedHeader: Locator;
    readonly allProducts: Locator;
    readonly productsHeading: Locator;
    readonly FeaturedItemsHeading: Locator;
    readonly brandsHeading: Locator;
    readonly breadCrumb: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.ContinShopBtn = this.page.getByRole('button', { name: 'Continue Shopping' });
        this.addedHeader = this.page.locator('h4', { hasText: 'Added!' })

        this.allProducts = this.page.locator(".single-products");
        this.productsHeading = this.page.getByRole('heading', { name: 'All Products' })
        this.FeaturedItemsHeading = this.page.getByRole('heading', { name: 'Features Items' })
        this.brandsHeading = this.page.locator("h2.title");
        this.breadCrumb = this.page.locator(".container .breadcrumbs");
    }

    getProdContainerByName(itemName: string) {
        return this.page.locator(".productinfo", { hasText: itemName });
    }

    getProdOverlayByName(itemName: string) {
        return this.page.locator(".overlay-content", { hasText: itemName });
    }

    getProductOverlayAddBtn(itemName: string) {
        return this.getProdOverlayByName(itemName).locator("a");
    }

    getProductsHeading() { return this.productsHeading; }

    getBrandsHeading() { return this.brandsHeading; }

    getBreadCrum() { return this.breadCrumb; }

    getAllProducts() { return this.allProducts; }

    async verifyBrandPageVisible(brand: string) {
        // Verify Brand in Heading 
        expect(await this.getBrandsHeading().textContent()).toContain(brand);
        // Verify same brand in BreadCrum link 
        expect(await this.getBreadCrum().textContent()).toContain(brand);
    }

    async addItem(itemName: string) {
        await this.getProdContainerByName(itemName).hover();
        await this.getProductOverlayAddBtn(itemName).click();
        await expect(this.addedHeader).toBeVisible();
        await this.ContinShopBtn.click();
    }

    async verifyProductPageandProducts(){
        await expect(this.getProductsHeading()).toBeVisible();
        expect(await this.allProducts.count()).toBeGreaterThan(0);
    }

    async verifyFeatureItems(){ 
        await expect(this.FeaturedItemsHeading).toBeVisible(); 
        expect(await this.allProducts.count()).toBeGreaterThan(0);
    }
} 