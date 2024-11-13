export function nameFixer(moduleName: string, isClassName = true): string {
  const words = moduleName.split("-")
  const fixedName = words
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join("")

  return isClassName
    ? fixedName.charAt(0).toUpperCase() + fixedName.slice(1)
    : fixedName
}

export function generateRouterFile(
  moduleName: string,
  _fileExtension: string,
): string {
  const routerClassName = nameFixer(moduleName, true)
  const controllerClassName = `${nameFixer(moduleName, true)}Controller`
  const controllerMethodName = nameFixer(moduleName, false)

  return `
import type {Hono} from "hono";
import {router, routerContainer, route} from "@a4arpon/hotshot";
import {${controllerClassName}} from "./controller";

export class ${routerClassName}Router {
    public readonly routes: Hono

    constructor() {
        this.routes = routerContainer({
            routers: [this.defaultRoutes()],
            basePath: '/${moduleName.toLowerCase()}',
        })
    }

    defaultRoutes() {

        const ${nameFixer(
          moduleName,
          false,
        )}Controller = new ${controllerClassName}()

        return router({
            basePath: '/',
            routers: [
               route("GET")
                .controller(${nameFixer(moduleName, false)}Controller.${controllerMethodName}),
           ],
        })
    }
}
`
}

export function generateControllerFileJS(
  moduleName: string,
  _fileExtension: string,
): string {
  const controllerClassName = `${nameFixer(moduleName, true)}Controller`
  const controllerFileName = nameFixer(moduleName, false)
  const serviceName = `${nameFixer(moduleName, true)}Services`
  const serviceMethodName = nameFixer(moduleName, false)

  return `
import type {Context} from "hono";
import {${serviceName}} from "./${moduleName}.services";

export class ${controllerClassName} {
    #${nameFixer(moduleName, false)}Services

    constructor() {
        this.#${nameFixer(moduleName, false)}Services = new ${serviceName}()
    }

    ${controllerFileName} = async (ctx) => {
        return this.${nameFixer(
          moduleName,
          false,
        )}Services.${serviceMethodName}()
    }
}
`
}

export function generateServicesFile(moduleName: string): string {
  const servicesClassName = `${nameFixer(moduleName, true)}Services`
  const serviceMethodName = nameFixer(moduleName, false)

  return `
import {response} from "@a4arpon/hotshot";

export class ${servicesClassName} {
    async ${serviceMethodName}() {
        return response("Hi from ${moduleName}!");
    }
}
`
}

export function generateMiddlewareFile(middlewareName: string): string {
  const middlewareClassName = `${nameFixer(middlewareName, true)}Guard`
  return `
import { type UseGuard, HTTPStatus } from "@a4arpon/hotshot";
import {Context, Next} from "hono";

export class ${middlewareClassName} implements UseGuard {
  /** @type {Context, Next} */
  async use(ctx, next) {
    if (ctx.req.path === "/${middlewareName.toLowerCase()}-guard") {
      throw new HTTPException(HTTPStatus.BadRequest, {
        message: "You're hitting on a dummy route",
      });
    }

    console.log("${middlewareClassName} Activated On", ctx.req.path);
    await next();
  }
}`
}

export function generateWorkerFile(workerName: string): string {
  const workerClassName = `${nameFixer(workerName, true)}Queue`

  return `
import { type Job, Worker } from "bullmq"
import { ${nameFixer(workerName, false)}Queue, redis } from "#libs/conn"

/*
*
* Queue Name: ${nameFixer(workerName, false)}Queue
* Important Note: You must create a Bull Queue with the same name as
* the queue name ${nameFixer(workerName, false)}Queue in your
* #libs/conn.ts file. After creating the queue, you can remove this
* comment.
*
*/

export class ${workerClassName}Worker {
  public readonly worker

  constructor() {
    this.worker = new Worker(
      ${workerName}Queue.name,
      async (job) => this.#processing(job),
      {
        autorun: false,
        connection: redis,
      },
    )

    this.worker.on("ready", this.#ready)
    this.worker.on("failed", (job, err) => this.#failed(err, job))
    this.worker.on("completed", (job) => this.#completed(job))
  }

  #failed(err, job) {
    if (job) {
      console.error(${workerName}Queue.name, "Job Failed :", job.id, err)
    } else {
      console.error(${workerName}Queue.name, "Job Not Found :", err)
    }
  }

  #ready = () => {
    console.log(${workerName}Queue.name, "Ready...")
  }

  #completed(job) {
    console.log(${workerName}Queue.name, "Job Completed :", job.id)
  }

  /*
   * ---------------------------------------------------------------------
   * Queue Processing Function
   *
   * This function is called by the queue worker when a job is processed.
   * The job is passed as a parameter.
   * Write your processing logic here.
   * ---------------------------------------------------------------------
   */

  async #processing(job) {
    console.log(job.data)
  }
}
`
}

export function generateCacheDriverContentJS(cacheDriverName: string): string {
  const cacheDriverClassName = `${nameFixer(cacheDriverName, true)}CacheDriver`

  return `
  import { cacheNameGen, cacheResponse } from "#libs/ioredis-json"

export class ${cacheDriverClassName} {
  public readonly cachePartition = "${nameFixer(cacheDriverName, false)}-cache"

  async create(key, payload) {
    return cacheResponse(
      cacheNameGen(this.cachePartition, key),
      null,
      false,
    )
  }

  async get(key) {
    return cacheResponse(
      cacheNameGen(this.cachePartition, key),
      null,
      false,
    )
  }

  async update(key, payload) {
    return cacheResponse(
      cacheNameGen(this.cachePartition, key),
      null,
      false,
    )
  }

  async delete(key) {
    return cacheResponse(
      cacheNameGen(this.cachePartition, key),
      null,
      false,
    )
  }
}
`
}

export function generateOpenApiSpecContent(specName: string): string {
  const openAPISpecClassName = `${nameFixer(specName, true)}OpenApiSpecs`

  return `
  import type { ApiSpecs, UseOpenApi } from "#libs/open-api"
  import { z } from "zod"

  /*
   * ------------------------------------------------------------------------
   * Open API Specs
   *
   * Some Key Points -
   * 1. To use path params, you need to use the path param syntax in the path
   * and the path param name in the pathParams array.
   * Example: path: "/author/{authorSlug}", pathParams: ["authorSlug"]
   * Second brackets {} are used to define the path param syntax.
   *
   * 2. To define a request body, you need to define it as a ZodSchema and
   * pass it to the requestBody property.
   * Example: requestBody: z.object({ title: z.string() })
   *
   * Tips: In this project we are using Drizzle-ORM, so we can easilty inherit
   * the ZodSchema from the drizzle-orm.
   * Doc Link: https://orm.drizzle.team/docs/zod
   * ------------------------------------------------------------------------
   */

  export class ${openAPISpecClassName} implements UseOpenApi {
    public readonly specs: ApiSpecs[]

    constructor() {
      this.specs = [
        {
          method: "GET",
          path: "/${specName}",
          tags: ["${nameFixer(specName, true)}"],
          summery: "Get all items from server",
        },
        {
          method: "GET",
          path: "/${specName}/{${nameFixer(specName, false)}Slug}",
          pathParams: ["${nameFixer(specName, false)}Slug"],
          tags: ["${nameFixer(specName, true)}"],
          summery: "Get single ${nameFixer(specName, true)} from server",
        },
        {
          method: "POST",
          path: "/${specName}",
          tags: ["${nameFixer(specName, true)}"],
          summery: "Add new ${nameFixer(specName, true)}",
          requestBody: z.object({
            title: z.string(),
            tags: z.array(z.string()).nullable(),
          }),
        },
        {
          method: "PATCH",
          path: "/${specName}/{${nameFixer(specName, false)}Slug}",
          pathParams: ["${nameFixer(specName, false)}Slug"],
          queryParams: ["${nameFixer(specName, false)}Status"],
          tags: ["${nameFixer(specName, true)}"],
          summery: "Add a little patch in the data",
        },
        {
          method: "PUT",
          path: "/${specName}/{${nameFixer(specName, false)}Slug}",
          pathParams: ["${nameFixer(specName, false)}Slug"],
          tags: ["${nameFixer(specName, true)}"],
          summery: "Update  ${nameFixer(specName, true)}",
          requestBody: z.object({
            title: z.string(),
          }),
        },
        {
          method: "DELETE",
          path: "/${specName}/{${nameFixer(specName, false)}Slug}",
          pathParams: ["${nameFixer(specName, false)}Slug"],
          tags: ["${nameFixer(specName, true)}"],
          summery: "Delete single ${nameFixer(specName, true)}",
        }
      ]
    }
  }
  `
}