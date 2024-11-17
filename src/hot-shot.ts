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
 *
 * @param message - The message to be displayed to the user.
 * @param data - The data to be returned to the user.
 * @param extra - Additional information to be included in the response.
 * @param success - Whether the request was successful or not.
 * @returns An object containing the response data.
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

/**
 * Exception Response Middleware Function 🔥
 *
 * @param ctx - The context object for the current request.
 * @param e - The error object to be handled.
 * @returns A response object containing the error message and status code.
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

/**
 * Safe Async 🔥 : Promise Wrapper
 *
 * @param func - The function to be wrapped.
 * @returns A function that handles the promise resolution.
 */

export const safeAsync = (
  func: (ctx: Context) => Promise<ApiResponse> | ApiResponse,
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

export type MiddlewareType = new () => UseGuard

export type RouteDefinition = {
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH"
  path: string
  controller: (ctx: Context) => Promise<ApiResponse> | ApiResponse
  useGuards?: MiddlewareType[]
  permissions?: RoutePermissions
}

export type RoutePermissions = string[]

export interface RouteBuilder {
  useGuards(...guards: MiddlewareType[]): RouteBuilder
  controller(handler: (ctx: Context) => Promise<ApiResponse>): RouteDefinition
  permissions(...perms: RoutePermissions): RouteBuilder
}

/**
 * Creates a new route definition.
 *
 * @param {string} method - The HTTP method for the route.
 * @param {string} path - The path for the route.
 * @method {(ctx: Context) => Promise<ApiResponse>} controller - The controller function for the route. Default: () => response("Not Implemented")
 * @method useGuards - The middleware guards for the route. Default: []
 * @returns A RouteBuilder object.
 */
export function route(
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH",
  path?: string,
): Omit<RouteBuilder, "method" | "path"> {
  const routeDefinition: RouteDefinition = {
    method,
    path: path ?? "/",
    controller: () => response("Not Implemented"),
    useGuards: [],
    permissions: [],
  }

  return {
    useGuards(...guards: MiddlewareType[]) {
      routeDefinition.useGuards?.push(...guards)
      return this
    },
    controller(handler: (ctx: Context) => Promise<ApiResponse>) {
      routeDefinition.controller = handler
      return routeDefinition
    },
    permissions(...perms: string[]) {
      routeDefinition.permissions?.push(...perms)
      return this
    },
  }
}

/**
 * Creates a new router.
 *
 * @param routes - An array of route definitions.
 * @param basePath - The base path for the router.
 * @param routeGuard - The route guard for the router.
 * @returns A Hono object.
 */
export function router({
  routes,
  routeGuards,
  basePath = null,
}: {
  routes: RouteDefinition[]
  basePath?: string | null
  routeGuards?: MiddlewareType[]
}): Hono {
  const controllerRoutes = new Hono().basePath(basePath ?? "")

  if (routeGuards) {
    for (const routeGuard of routeGuards) {
      controllerRoutes.use(middlewareFactory(routeGuard))
    }
  }

  for (const routeDefinition of routes) {
    const {
      method,
      path,
      controller,
      useGuards: useGuardsList = [],
      permissions: permissionsList = [],
    } = routeDefinition

    const middlewares = useGuardsList.map((middleware: MiddlewareType) =>
      middlewareFactory(middleware),
    )

    if (permissionsList.length > 0) {
      middlewares.push(new PermissionController(permissionsList).use)
    }

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
      default:
        throw new Error(`Unsupported method: ${method}`)
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
export type RouterConstructor = new () => {
  routes: Hono
}

/**
 * Creates a new router factory.
 *
 * @param routers - An array of router constructors.
 * @returns A Hono object.
 */
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

export type RouterContainerOptions = {
  basePath?: string
  routers: Array<Hono>
}

/**
 * Creates a new router container.
 *
 * @param basePath - The base path for the router container.
 * @param routers - An array of Hono objects.
 * @returns A Hono object.
 */
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

/**
 * Creates a new middleware factory.
 *
 * @param Middleware - The middleware class.
 * @returns A middleware handler function.
 */
export function middlewareFactory(
  Middleware: new () => UseGuard,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
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

class PermissionController {
  constructor(private requiredPermissions: RoutePermissions) {}

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  use = createMiddleware(async (ctx: any, next: Next) => {
    try {
      const myPermissions = ctx.permissions ?? []

      const hasRequiredPermissions = this.requiredPermissions.every((perm) =>
        myPermissions.includes(perm),
      )

      if (!hasRequiredPermissions) {
        throw new HTTPException(HTTPStatus.Forbidden, {
          message: "You are not authorized to access this resource",
        })
      }

      await next()
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
