
import type {Hono} from "hono";
import {router, routerContainer} from "@a4arpon/hotshot";
import {CartController} from "./controller";

export class CartRouter {
    public readonly routes: Hono

    constructor() {
        this.routes = routerContainer({
            routers: [this.defaultRoutes()],
            basePath: '/cart',
        })
    }

    defaultRoutes() {

        const cartController = new CartController()

        return router({
            basePath: '/',
            routes: [{
                path: '/',
                method: "GET",
                controller: cartController.cart
            }]
        })
    }
}
