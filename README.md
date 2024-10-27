# Hot Shot

A simple easy to go solution for creating a REST API with every JavaScript
Runtime. Built top of [Hono](https://github.com/honojs/hono) and
[Deno](https://deno.land).

## Features

- 🔥 Simple and Easy to use
- 🔥 Built on top of [Hono](https://github.com/honojs/hono) and
  [Deno](https://deno.land)
- 🔥 Supports every JavaScript Runtime
- 🔥 Supports every HTTP Method
- 🔥 Supports every HTTP Status Code
- 🔥 Supports every Content Type
- 🔥 Supports every Middleware
- 🔥 Have better error handling
- 🔥 Have better response handling
- 🔥 Best for beginners
- 🔥 Deno focused
- 🔥 Built for low overhead

## Installation

```bash
# Using Deno
deno add jsr:@a4arpon/hotshot

# Using NPM
npx jsr add @a4arpon/hotshot

# Using Bun
bunx jsr add @a4arpon/hotshot
```

## Usage

### Example

#### Router Module

The router module is used to define the routes of the API. It takes an object as
an argument with the following properties:

- `basePath`: The base path for the API. It is used to prefix all routes with a
  common path. For example, if the base path is `/api`, all routes will have the
  prefix `/api`.
- `routes`: An array of route objects, each containing the following properties:
  - `method`: The HTTP method to use for the route. It can be one of the
    following values:
    - `GET`
    - `POST`
    - `PUT`
    - `DELETE`
    - `PATCH`
  - `path`: The path of the route, which can include parameters.
  - `controller`: The controller function for the route.

**Inner Works** : In the router module the controller is executing in the async
function and the response is returning in the same function. But if any error
occurs in the controller function, the error is catched and the response is
returned with the error message.

```ts
import { router } from "@a4arpon/hotshot"
import { userController } from "./controllers/user.ts"

function appRoutes() {
  return router(
    {
      basePath: "/api",
      routes: [
        {
          method: "GET",
          path: "/",
          controller: userController,
        },
      ],
    },
  )
}
```

#### Controller Module

In the userController function, we first check if the user exists in the
database. If the user does not exist, we throw a new HTTPException with the
appropriate status code and message. If the user exists, we return a response
with the user data. The response function takes a message, data, and extra meta
data as arguments.

```ts
import { response } from "@a4arpon/hotshot"

export const userController = (ctx: Context) => {
  const user = null

  if (!user) {
    throw new HTTPException(HTTPStatus.NotFound, {
      message: "User not found",
    })
  }

  return response("User Found", user, {
    cached: true, // Extra meta data information for the request.
  })
}
```

### Router Function

The `router` function is used to define the routes of the API. It takes an
object as an argument with the following properties:

- `routes`: An array of route objects, each containing the following properties:
  - `method`: The HTTP method to use for the route. It can be one of the
    following values:
    - `GET`
    - `POST`
    - `PUT`
    - `DELETE`
    - `PATCH`
  - `path`: The path of the route, which can include parameters.
  - `controller`: The controller function for the route. It takes a `Context`
    object as an argument and returns a `Promise` that resolves to a `Response`
    object.
  - `middlewares`: An array of middleware functions to be applied to the route.
    Each middleware function takes a `Context` object as an argument and returns
    a `Promise` that resolves to a `Response` object.
- `basePath`: The base path for the API. It is used to prefix all routes with a
  common path. For example, if the base path is `/api`, all routes will have the
  prefix `/api`.
- `routeGuard`: A middleware function that is applied to all routes. It takes a
  `Context` object as an argument and returns a `Promise` that resolves to a
  `Response` object.

```ts
import { router } from "@a4arpon/hotshot"

const app = router({
  routes: [
    {
      method: "GET",
      path: "/",
      controller: async () => {
        return response("Hello World")
      },
    },
  ],
})
```

### HTTPStatus

The `HTTPStatus` object contains all the HTTP status codes that can be used in
the `response` function. It is an object with the following properties:

- `OK`: The status code for a successful response.
- `MovedPermanently`: The status code for a redirection response.
- `BadRequest`: The status code for a client error response.
- `Unauthorized`: The status code for a client error response.
- `Forbidden`: The status code for a client error response.
- `NotFound`: The status code for a client error response.
- `Conflict`: The status code for a client error response.
- `InternalServerError`: The status code for a server error response.
- `ServiceUnavailable`: The status code for a server error response.

### safeAsync Function

The `safeAsync` function is used to handle errors in the controller functions.
It takes a function as an argument and executes it in a try-catch block. If an
error occurs, it returns a response with the appropriate status code and
message.

**The router function uses this function to handle errors in the controller
functions.**


## Developer Information

### Mr Wayne

**Github** : [a4arpon](https://github.com/a4arpon)

**Twitter** : [@a4arpon](https://twitter.com/a4arpon)

**LinkedIn** : [@a4arpon](https://www.linkedin.com/in/a4arpon/)

**Instagram** : [@a4arpon](https://www.instagram.com/a4arpon/)

**Facebook** : [@a4arpon](https://www.facebook.com/a4arpon/)# hot-shot
