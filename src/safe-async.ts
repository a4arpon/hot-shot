import type { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import type { ApiResponse } from "./types"

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
