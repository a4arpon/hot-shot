import type { Context } from "hono";
import { ProductsServices } from "./products.services";

export class ProductsController {
  private readonly productsServices: ProductsServices;

  constructor() {
    this.productsServices = new ProductsServices();
  }

  products = async (ctx: Context) => {
    return this.productsServices.products();
  };
}
