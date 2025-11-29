import { APIRequestContext  } from "@playwright/test";


export class APIProductList {

    constructor(private request: APIRequestContext) {
        this.request = request; 
    }

    // Services
    getProductListEP = "/api/productsList";

    //////////////////// Actions \\\\\\\\\\\\\\\\\\\\

    async getProductList () {
        return await this.request.get( this.getProductListEP );
    }

    // to validate invalid URL only 
    async getProductListURL( url: string ) {
        return await this.request.get(url); }

    // Invalid methods 
    async postProductList() {
        return await this.request.post( this.getProductListEP ); }
    
    // Invalid methods 
    async putProductList() {
        return await this.request.put( this.getProductListEP );}
    
    // Invalid methods 
    async deleteProductList( ) {
        return await this.request.delete( this.getProductListEP ); }


}
