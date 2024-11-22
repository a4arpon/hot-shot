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
  const controllerClassName = `${nameFixer(moduleName, true)}Services`
  const controllerMethodName = nameFixer(moduleName, false)

  return `
import type {Hono} from "hono";
import {router, routerContainer} from "@a4arpon/hotshot";
import {${controllerClassName}} from "./${moduleName}.services";

export class ${routerClassName}Router {
    public readonly routes: Hono
    private readonly ${nameFixer(moduleName, false)}Services: ${controllerClassName}

    constructor() {
        this.${nameFixer(moduleName, false)}Services = new ${controllerClassName}()

        /*
        * ----------------------------------------------------------------
        * | Routes Container > It's a group of routers for ${routerClassName}
        * ------------------------------------------------------------------
        */
        this.routes = routerContainer({
            routers: [this.default()],
        })
    }

    default() {
        return router({
            basePath: '/${moduleName.toLowerCase()}',
            routes: [
              {
                method: "GET",
                path:"/",
                handler: this.${nameFixer(moduleName, false)}Services.${controllerMethodName}
              }
           ],
        })
    }
}
`
}

export function generateControllerFile(
  moduleName: string,
  _fileExtension: string,
): string {
  const controllerClassName = `${nameFixer(moduleName, true)}Services`
  const controllerFileName = nameFixer(moduleName, false)

  return `
import { response } from "@a4arpon/hotshot"
import type { Context } from "hono"

export class ${controllerClassName} {

    async ${controllerFileName}(ctx: Context) {
      return response("Hi from ${moduleName}!");
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
import type {Context, Next} from "hono";
import { HTTPException } from "hono/http-exception"

export class ${middlewareClassName} implements UseGuard {
  async use(ctx: Context, next: Next) {
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

  console.log(`
  ------------------------------------------------------------------------
  Queue Name: ${nameFixer(workerName, false)}Queue
  Important Note: You must create a Bull Queue with the same name as
  the queue name ${nameFixer(workerName, false)}Queue in your
  #libs/conn file.
  ------------------------------------------------------------------------
  `)

  return `
import { type Job, Worker } from "bullmq"
import { ${nameFixer(workerName, false)}Queue, redis } from "#libs/conn"

export class ${workerClassName}Worker {
  public readonly worker: Worker

  constructor() {
    this.worker = new Worker(
      ${workerName}Queue.name,
      async (job: Job) => this.processing(job),
      {
        autorun: false,
        connection: redis,
      },
    )

    this.worker.on("ready", this.ready)
    this.worker.on("failed", (job, err) => this.failed(err, job))
    this.worker.on("completed", (job) => this.completed(job))
  }

  private failed(err: Error, job?: Job) {
    if (job) {
      console.error(${workerName}Queue.name, "Job Failed :", job.id, err)
    } else {
      console.error(${workerName}Queue.name, "Job Not Found :", err)
    }
  }

  private ready = () => {
    console.log(${workerName}Queue.name, "Ready...")
  }

  private completed(job: Job) {
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

  private async processing(job: Job) {
    console.log(job.data)
  }
}
`
}

export function generateCacheDriverContent(cacheDriverName: string): string {
  const cacheDriverClassName = `${nameFixer(cacheDriverName, true)}CacheDriver`

  return `
  import { cacheNameGen, cacheResponse } from "#libs/ioredis-json"

export class ${cacheDriverClassName} {
  public readonly cachePartition = "${nameFixer(cacheDriverName, false)}-cache"

  async create<T>(key: string, payload: T) {
    return cacheResponse(
      cacheNameGen(this.cachePartition, key),
      null,
      false,
    )
  }

  async get(key: string) {
    return cacheResponse(
      cacheNameGen(this.cachePartition, key),
      null,
      false,
    )
  }

  async update<T>(key: string, payload: T) {
    return cacheResponse(
      cacheNameGen(this.cachePartition, key),
      null,
      false,
    )
  }

  async delete(key: string) {
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

  console.log(`
    ------------------------------------------------------------------------
    Open API Specs
    \n
    Some Key Points -
    1. To use path params, you need to use the path param syntax in the path
    and the path param name in the pathParams array.
    Example: path: "/author/{authorSlug}", pathParams: ["authorSlug"]
    Second brackets {} are used to define the path param syntax.
    \n
    2. To define a request body, you need to define it as a ZodSchema and
    pass it to the requestBody property.
    Example: requestBody: z.object({ title: z.string() })\n

    Tips: In this project we are using Drizzle-ORM, so we can easily inherit
    the ZodSchema from the drizzle-orm.
    Doc Link: https://orm.drizzle.team/docs/zod\n
    ------------------------------------------------------------------------
    `)

  return `
  import type { ApiSpecs, UseOpenApi } from "#libs/open-api"

  export class ${openAPISpecClassName} implements UseOpenApi {
    public readonly specs: ApiSpecs[]

    private readonly routeGroup = "${specName}"

    constructor() {
      this.specs = [
        {
          group: this.routeGroup,
          method: "GET",
          secure: false,
          path: "/${specName}",
          summary: "Get Request",
          description: "No description...",
        }
      ]
    }
  }
  `
}
