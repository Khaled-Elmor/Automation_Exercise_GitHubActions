import { APIRequestContext, APIResponse } from "@playwright/test";
import Ajv from "ajv";

export class ApiClient {
  protected ajv = new Ajv();

  constructor(protected request: APIRequestContext) {}

  // ============================
  //   CORE HTTP HELPERS
  // ============================

  async get<T = any>(url: string, options?: object): Promise<T> {
    const res = await this.send("GET", url, options);
    return this.parseJson<T>(res);
  }

  async post<T = any>(url: string, body?: object, options?: object): Promise<T> {
    const res = await this.send("POST", url, {
      data: body,
      ...options,
    });
    return this.parseJson<T>(res);
  }

  async put<T = any>(url: string, body?: object, options?: object): Promise<T> {
    const res = await this.send("PUT", url, {
      data: body,
      ...options,
    });
    return this.parseJson<T>(res);
  }

  async delete<T = any>(url: string, options?: object): Promise<T> {
    const res = await this.send("DELETE", url, options);
    return this.parseJson<T>(res);
  }

  // ============================
  //   LOW LEVEL SENDER
  // ============================

  private async send(method: string, url: string, options?: any): Promise<APIResponse> {
    console.log(`\n👉 API Request: ${method} ${url}`);
    if (options) console.log("Payload/Options:", options);

    const res = await this.request.fetch(url, {
      method,
      ...options,
      failOnStatusCode: false, // we handle it manually
    });

    console.log(`👈 Response ${res.status()}`);

    if (res.status() >= 400) {
      console.error(`❌ API Error: ${method} ${url}`);
    }

    return res;
  }

  // ============================
  //   JSON + ERROR HANDLING
  // ============================

  private async parseJson<T>(res: APIResponse): Promise<T> {
    const text = await res.text();

    try {
      return JSON.parse(text) as T;
    } catch (err) {
      console.error("❌ Failed to parse JSON:", text);
      throw err;
    }
  }

  // ============================
  //   SCHEMA VALIDATION
  // ============================

  validateSchema(schema: object, data: any) {
    const validate = this.ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      console.error("❌ Schema Validation Error:", validate.errors);
      throw new Error("Schema validation failed");
    }

    console.log("✓ Schema Validated");
  }
}
