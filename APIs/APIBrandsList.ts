import { APIRequestContext  } from "@playwright/test";

export class APIBrandsList {

    constructor(private request: APIRequestContext) {
        this.request = request; 
    }

    // Services
    getBrandsListEP = "/api/brandsList";

    //////////////////// Actions \\\\\\\\\\\\\\\\\\\\

    async getBrandList() {
        return await this.request.get( this.getBrandsListEP );
    }

    // to validate invalid URL only 
    async getBrandListURL( url: string ) {
        return await this.request.get(url); }

    // Invalid methods 
    async postBrandList() {
        return await this.request.post( this.getBrandsListEP ); }
    
    // Invalid methods 
    async putBrandList() {
        return await this.request.put( this.getBrandsListEP );}
    
    // Invalid methods 
    async deleteBrandList( ) {
        return await this.request.delete( this.getBrandsListEP ); }


}
