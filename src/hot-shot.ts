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

import { Hono } from "hono"
import type { StatusCode } from "hono/utils/http-status"
import { safeAsync } from "./safe-async"
import type {
  ApiResponse,
  RouterContainerOptions,
  RouterOptions,
} from "./types"

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
 * Creates a new router.
 *
 * @param routes - An array of route definitions.
 * @param basePath - The base path for the router.
 * @param routeGuard - The route guard for the router.
 * @returns A Hono object.
 */
export function router({
  basePath = "/",
  middlewares = [],
  routes,
}: RouterOptions): Hono {
  const honoInstance = new Hono().basePath(basePath ?? "/")

  if (middlewares.length > 0) {
    for (let i = 0; i < middlewares?.length; i++) {
      honoInstance.use(middlewares[i])
    }
  }

  for (const route of routes) {
    const { method, path, handler, middlewares: routeMiddlewares = [] } = route

    switch (method) {
      case "GET":
        honoInstance.get(path, ...routeMiddlewares, safeAsync(handler))
        break
      case "POST":
        honoInstance.post(path, ...routeMiddlewares, safeAsync(handler))
        break
      case "PUT":
        honoInstance.put(path, ...routeMiddlewares, safeAsync(handler))
        break
      case "DELETE":
        honoInstance.delete(path, ...routeMiddlewares, safeAsync(handler))
        break
      case "PATCH":
        honoInstance.patch(path, ...routeMiddlewares, safeAsync(handler))
        break
      default:
        throw new Error(`Unsupported method: ${method}`)
    }
  }

  return honoInstance
}

export const routerContainer = ({
  basePath,
  routers,
}: RouterContainerOptions): Hono => {
  const containerInstance = new Hono().basePath(basePath ?? "")

  for (let i = 0; i < routers?.length; i++) {
    containerInstance.route("/", routers[i])
  }

  return containerInstance
}
