import type { MiddlewareHandler } from "hono"

export type ApiResponse = {
  success: boolean
  message: string
  meta?: object
  data: string | number | boolean | object | [] | undefined | null
}

/*
|
|--------------------------------------------------------------------------
| Router & Route Types 🔥
|--------------------------------------------------------------------------
|
*/

export type ControllerHandler<T> = [new () => T, keyof T]

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export interface RouteDefinition<T = any> {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  path: string
  handler: ControllerHandler<T>
  middlewares?: MiddlewareHandler[]
}


export interface RouterOptions<T> {
  basePath?: string
  middlewares?: MiddlewareHandler[]
  routes: RouteDefinition<T>[]
}
