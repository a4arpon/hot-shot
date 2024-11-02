/*
|--------------------------------------------------------------------------
| 🔥 Hot Shot 🔥 | Build Fast, Ship Faster. Write Once, Run Everywhere.
|--------------------------------------------------------------------------
|
| Do not modify this file, all configurations are done by @a4arpon/hotshot cli
|
| See https://jsr.io/@a4arpon/hotshot/doc
|
| Hot Shot can be run by any type of JavaScript runtime, including Node.js,
| Deno, and Bun.
|
| Hot Shot is built on top of Hono, a web framework for multi JS runtimes.
|
| Exports List:
|   - response : Response Function
|   - middleWareExceptionResponse : Middleware Exception Response
|   - safeAsync : Promise Wrapper
|   - router : Router Function 🔥
|   - routerFactory : Router Factory Function 🔥
|   - routerContainer : Router Container Function 🔥
*/

import { type Context, Hono, type MiddlewareHandler, type Next } from "hono"
import { createMiddleware } from "hono/factory"
import { HTTPException } from "hono/http-exception"
import type { StatusCode } from "hono/utils/http-status"

/*
|
|--------------------------------------------------------------------------
| Response Related Functions & Types 🔥
|--------------------------------------------------------------------------
|
*/
export type ApiResponse = {
  success: boolean
  message: string
  meta?: object
  data: string | number | boolean | object | [] | undefined | null
}

/**********************************
 * HTTP Status Codes 🔥
 * ********************************/
export const HTTPStatus = {
  OK: 200 as StatusCode, // OK (Successful)
  MovedPermanently: 301 as StatusCode, // Moved Permanently (Redirection)
  BadRequest: 400 as StatusCode, // Bad Request (Client Error)
  Unauthorized: 401 as StatusCode, // Unauthorized (Client Error)
  Forbidden: 403 as StatusCode, // Forbidden (Client Error)
  NotFound: 404 as StatusCode, // Not Found (Client Error)
  Conflict: 409 as StatusCode, // Conflict (Client Error)
  InternalServerError: 500 as StatusCode, // Internal Server Error (Server Error)
  ServiceUnavailable: 503 as StatusCode, // Service Unavailable (Server Error)
}

/**********************************
 * Response Function 🔥
 * ********************************/
export function response(
  message: string,
  data?: string | object | [] | boolean | number | null,
  extra?: object,
  success = true,
): ApiResponse {
  return {
    success: success || false,
    message,
    meta: extra,
    data: data || null,
  }
}

/*
  Exception Response Middleware Function 🔥
*/
export function middleWareExceptionResponse(
  ctx: Context,
  e: unknown,
): Response {
  if (e instanceof Error) {
    ctx.status(HTTPStatus.Unauthorized)
    return ctx.json(response(e.message, null, {}, false))
  }

  ctx.status(HTTPStatus.InternalServerError)
  return ctx.json(response("Internal server error", null, {}, false))
}

/*
|
|--------------------------------------------------------------------------
| Safe Async 🔥 : Promise Wrapper
|--------------------------------------------------------------------------
|
*/

export const safeAsync = (
  func: (ctx: Context) => Promise<ApiResponse>,
): ((ctx: Context) => Promise<Response>) => {
  return async (ctx: Context) => {
    try {
      const response = await func(ctx)
      ctx.status(200)
      return ctx.json(response)
    } catch (error) {
      if (error instanceof HTTPException) {
        ctx.status(error.status)
        return ctx.json({
          success: false,
          message: error.message,
          data: null,
          meta: { status: error.status },
        })
      }

      console.error("Internal Server Error. Log : ", error)
      ctx.status(500)
      return ctx.json({
        success: false,
        message: "Request is not processed by the server.",
        data: null,
        meta: { status: 500 },
      })
    }
  }
}

/*
|
|--------------------------------------------------------------------------
| Router & Route Types 🔥
|--------------------------------------------------------------------------
|
*/

type MiddlewareType = new () => UseGuard

type RouteDefinition = {
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH"
  path: string
  controller: (ctx: Context) => Promise<ApiResponse>
  middlewares?: MiddlewareType[]
}

export function router({
  routes,
  routeGuard,
  basePath = null,
}: {
  routes: RouteDefinition[]
  basePath?: string | null
  routeGuard?: MiddlewareType
}): Hono {
  const controllerRoutes = new Hono().basePath(basePath ?? "")

  if (routeGuard) {
    controllerRoutes.use(middlewareFactory(routeGuard))
  }
  for (const {
    method,
    path,
    controller,
    middlewares: rawMiddlewares = [],
  } of routes) {
    const middlewares = rawMiddlewares.map((middleware: MiddlewareType) =>
      middlewareFactory(middleware),
    )
    switch (method) {
      case "POST":
        controllerRoutes.post(path, ...middlewares, safeAsync(controller))
        break
      case "GET":
        controllerRoutes.get(path, ...middlewares, safeAsync(controller))
        break
      case "PUT":
        controllerRoutes.put(path, ...middlewares, safeAsync(controller))
        break
      case "DELETE":
        controllerRoutes.delete(path, ...middlewares, safeAsync(controller))
        break
      case "PATCH":
        controllerRoutes.patch(path, ...middlewares, safeAsync(controller))
        break
    }
  }
  return controllerRoutes
}

/*
|
|--------------------------------------------------------------------------
| Route Factory 🔥
|
| Router Factory function contains all the application routes
| and it's used to create a single instance of Hono.
|--------------------------------------------------------------------------
|
*/
type RouterConstructor = new () => {
  routes: Hono
}

export function routerFactory(routers: Array<RouterConstructor>): Hono {
  const factoryInstance = new Hono()

  for (const RouterClass of routers) {
    const routerInstance = new RouterClass()

    if (routerInstance.routes === undefined) {
      throw new Error("Router must have a 'routes' method")
    }

    factoryInstance.route("/", routerInstance.routes)
  }

  return factoryInstance
}

/*
|
|--------------------------------------------------------------------------
| Router Container 🔥
|
| Router Container function creates a group of provided routers
|--------------------------------------------------------------------------
|
*/

type RouterContainerOptions = {
  basePath?: string
  routers: Array<Hono>
}

export function routerContainer({
  basePath,
  routers,
}: RouterContainerOptions): Hono {
  const containerInstance = new Hono().basePath(basePath ?? "")

  for (const router of routers) {
    containerInstance.route("/", router)
  }

  return containerInstance
}

/*
|
|--------------------------------------------------------------------------
| Use Guard 🔥
|
| Use Guard function is used to add a middleware to a router
|--------------------------------------------------------------------------
|
*/

export type UseGuard = {
  use: (ctx: Context, next: Next) => Promise<void>
}

export function middlewareFactory(
  Middleware: new () => UseGuard,
): MiddlewareHandler<any, string, {}> {
  return createMiddleware(async (ctx: Context, next: Next) => {
    try {
      await new Middleware().use(ctx, next)
    } catch (error) {
      if (error instanceof HTTPException) {
        ctx.status(error.status)
        return ctx.json(response(error.message, null, {}, false))
      }
      if (error instanceof Error) {
        ctx.status(HTTPStatus.Unauthorized)
        return ctx.json(response(error.message, null, {}, false))
      }
      ctx.status(HTTPStatus.BadRequest)
      return ctx.json(response("Bad Request", null, {}, false))
    }
  })
}
