import { response } from "@a4arpon/hotshot";

export class ProductsServices {
  async products() {
    return response("Hi from products!");
  }
}
