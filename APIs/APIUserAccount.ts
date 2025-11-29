import { APIRequestContext } from "@playwright/test";

export class APIUserAccount {

    constructor(private request: APIRequestContext) {
        this.request = request; 
    }

    // Services
    getUserAccDetailsEP = "/api/getUserDetailByEmail";


    async getUserAccDetails( email: string) {
        return await this.request.get( this.getUserAccDetailsEP, {
            params: { email: email}
        } );
    }


    
    // Invalid Method for validation only 
    async getUserAccDetailsWithoutParam() {
        return await this.request.get( this.getUserAccDetailsEP); }

    // async getProductById(id) {
    //     return await this.request.get(`/api/productDetails/${id}`);
    // }

    // async searchProducts(keyword) {
    //     return await this.request.post(`/api/searchProduct`, {
    //         form: { search_product: keyword }
    //     });
    // }

    //////////////////// Actions \\\\\\\\\\\\\\\\\\\\

    //////////////////// Validations \\\\\\\\\\\\\\\\\\\\
}
