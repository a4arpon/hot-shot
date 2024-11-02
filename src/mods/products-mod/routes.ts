import type { Hono } from "hono";
import { router, routerContainer } from "@a4arpon/hotshot";
import { ProductsController } from "./controller";

export class ProductsRouter {
  public readonly routes: Hono;

  constructor() {
    this.routes = routerContainer({
      routers: [this.defaultRoutes()],
      basePath: "/products",
    });
  }

  defaultRoutes() {
    const productsController = new ProductsController();

    return router({
      basePath: "/",
      routes: [{
        path: "/",
        method: "GET",
        controller: productsController.products,
      }],
    });
  }
}
