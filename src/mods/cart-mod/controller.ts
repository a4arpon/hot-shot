
import type {Context} from "hono";
import {CartServices} from "./cart.services";

export class CartController {
    private readonly cartServices: CartServices

    constructor() {
        this.cartServices = new CartServices()
    }

    cart = async (ctx: Context) => {
        return this.cartServices.cart()
    }
}
