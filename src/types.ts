import type { Context, Hono, MiddlewareHandler } from "hono"

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

export interface RouteDefinition {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  path: string
  handler: (ctx: Context) => Promise<ApiResponse> | ApiResponse
  middlewares?: MiddlewareHandler[]
}

export interface RouterOptions {
  basePath?: string
  middlewares?: MiddlewareHandler[]
  routes: RouteDefinition[]
}

export type RouterContainerOptions = {
  basePath?: string
  routers: Array<Hono>
}
