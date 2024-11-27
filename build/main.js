#!/usr/bin/env node
var rt = Object.create
var { getPrototypeOf: ut, defineProperty: I, getOwnPropertyNames: $t } = Object
var ct = Object.prototype.hasOwnProperty
var pt = (t, s, n) => {
  n = t != null ? rt(ut(t)) : {}
  let o =
    s || !t || !t.__esModule ? I(n, "default", { value: t, enumerable: !0 }) : n
  for (let r of $t(t))
    if (!ct.call(o, r)) I(o, r, { get: () => t[r], enumerable: !0 })
  return o
}
var ht = (t, s) => () => (s || t((s = { exports: {} }).exports, s), s.exports)
var A = ht((xt, X) => {
  function bt(t, s) {
    var n = t
    s.slice(0, -1).forEach(function (r) {
      n = n[r] || {}
    })
    var o = s[s.length - 1]
    return o in n
  }
  function j(t) {
    if (typeof t === "number") return !0
    if (/^0x[0-9a-f]+$/i.test(t)) return !0
    return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(t)
  }
  function V(t, s) {
    return (
      (s === "constructor" && typeof t[s] === "function") || s === "__proto__"
    )
  }
  X.exports = function (t, s) {
    if (!s) s = {}
    var n = { bools: {}, strings: {}, unknownFn: null }
    if (typeof s.unknown === "function") n.unknownFn = s.unknown
    if (typeof s.boolean === "boolean" && s.boolean) n.allBools = !0
    else
      []
        .concat(s.boolean)
        .filter(Boolean)
        .forEach(function (p) {
          n.bools[p] = !0
        })
    var o = {}
    function r(p) {
      return o[p].some(function (G) {
        return n.bools[G]
      })
    }
    Object.keys(s.alias || {}).forEach(function (p) {
      ;(o[p] = [].concat(s.alias[p])),
        o[p].forEach(function (G) {
          o[G] = [p].concat(
            o[p].filter(function (J) {
              return G !== J
            }),
          )
        })
    }),
      []
        .concat(s.string)
        .filter(Boolean)
        .forEach(function (p) {
          if (((n.strings[p] = !0), o[p]))
            [].concat(o[p]).forEach(function (G) {
              n.strings[G] = !0
            })
        })
    var c = s.default || {},
      u = { _: [] }
    function x(p, G) {
      return (
        (n.allBools && /^--[^=]+$/.test(G)) ||
        n.strings[p] ||
        n.bools[p] ||
        o[p]
      )
    }
    function q(p, G, J) {
      var i = p
      for (var W = 0; W < G.length - 1; W++) {
        var U = G[W]
        if (V(i, U)) return
        if (i[U] === void 0) i[U] = {}
        if (
          i[U] === Object.prototype ||
          i[U] === Number.prototype ||
          i[U] === String.prototype
        )
          i[U] = {}
        if (i[U] === Array.prototype) i[U] = []
        i = i[U]
      }
      var L = G[G.length - 1]
      if (V(i, L)) return
      if (
        i === Object.prototype ||
        i === Number.prototype ||
        i === String.prototype
      )
        i = {}
      if (i === Array.prototype) i = []
      if (i[L] === void 0 || n.bools[L] || typeof i[L] === "boolean") i[L] = J
      else if (Array.isArray(i[L])) i[L].push(J)
      else i[L] = [i[L], J]
    }
    function T(p, G, J) {
      if (J && n.unknownFn && !x(p, J)) {
        if (n.unknownFn(J) === !1) return
      }
      var i = !n.strings[p] && j(G) ? Number(G) : G
      q(u, p.split("."), i),
        (o[p] || []).forEach(function (W) {
          q(u, W.split("."), i)
        })
    }
    Object.keys(n.bools).forEach(function (p) {
      T(p, c[p] === void 0 ? !1 : c[p])
    })
    var E = []
    if (t.indexOf("--") !== -1)
      (E = t.slice(t.indexOf("--") + 1)), (t = t.slice(0, t.indexOf("--")))
    for (var l = 0; l < t.length; l++) {
      var b = t[l],
        z,
        R
      if (/^--.+=/.test(b)) {
        var _ = b.match(/^--([^=]+)=([\s\S]*)$/)
        z = _[1]
        var Z = _[2]
        if (n.bools[z]) Z = Z !== "false"
        T(z, Z, b)
      } else if (/^--no-.+/.test(b)) (z = b.match(/^--no-(.+)/)[1]), T(z, !1, b)
      else if (/^--.+/.test(b))
        if (
          ((z = b.match(/^--(.+)/)[1]),
          (R = t[l + 1]),
          R !== void 0 &&
            !/^(-|--)[^-]/.test(R) &&
            !n.bools[z] &&
            !n.allBools &&
            (o[z] ? !r(z) : !0))
        )
          T(z, R, b), (l += 1)
        else if (/^(true|false)$/.test(R)) T(z, R === "true", b), (l += 1)
        else T(z, n.strings[z] ? "" : !0, b)
      else if (/^-[^-]+/.test(b)) {
        var C = b.slice(1, -1).split(""),
          Y = !1
        for (var H = 0; H < C.length; H++) {
          if (((R = b.slice(H + 2)), R === "-")) {
            T(C[H], R, b)
            continue
          }
          if (/[A-Za-z]/.test(C[H]) && R[0] === "=") {
            T(C[H], R.slice(1), b), (Y = !0)
            break
          }
          if (/[A-Za-z]/.test(C[H]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(R)) {
            T(C[H], R, b), (Y = !0)
            break
          }
          if (C[H + 1] && C[H + 1].match(/\W/)) {
            T(C[H], b.slice(H + 2), b), (Y = !0)
            break
          } else T(C[H], n.strings[C[H]] ? "" : !0, b)
        }
        if (((z = b.slice(-1)[0]), !Y && z !== "-"))
          if (
            t[l + 1] &&
            !/^(-|--)[^-]/.test(t[l + 1]) &&
            !n.bools[z] &&
            (o[z] ? !r(z) : !0)
          )
            T(z, t[l + 1], b), (l += 1)
          else if (t[l + 1] && /^(true|false)$/.test(t[l + 1]))
            T(z, t[l + 1] === "true", b), (l += 1)
          else T(z, n.strings[z] ? "" : !0, b)
      } else {
        if (!n.unknownFn || n.unknownFn(b) !== !1)
          u._.push(n.strings._ || !j(b) ? b : Number(b))
        if (s.stopEarly) {
          u._.push.apply(u._, t.slice(l + 1))
          break
        }
      }
    }
    if (
      (Object.keys(c).forEach(function (p) {
        if (!bt(u, p.split(".")))
          q(u, p.split("."), c[p]),
            (o[p] || []).forEach(function (G) {
              q(u, G.split("."), c[p])
            })
      }),
      s["--"])
    )
      u["--"] = E.slice()
    else
      E.forEach(function (p) {
        u._.push(p)
      })
    return u
  }
})
var nt = pt(A(), 1)
import h from "node:fs"
import S from "node:path"
function $(t, s = !0) {
  let o = t
    .split("-")
    .map((r, c) =>
      c === 0
        ? r.toLowerCase()
        : r.charAt(0).toUpperCase() + r.slice(1).toLowerCase(),
    )
    .join("")
  return s ? o.charAt(0).toUpperCase() + o.slice(1) : o
}
function O(t, s) {
  let n = $(t, !0),
    o = `${$(t, !0)}Controller`,
    r = $(t, !1)
  return `
import {Hono} from "hono";
import {router, routerContainer, route} from "@a4arpon/hotshot";
import {${o}} from "./controller";

export class ${n}Router {
    /** @type{Hono} */
    routes

    constructor() {
        this.routes = routerContainer({
            routers: [this.defaultRoutes()],
            basePath: '/${t.toLowerCase()}',
        })
    }

    defaultRoutes() {

        const ${$(t, !1)}Controller = new ${o}()

        return router({
            basePath: '/',
            routers: [
               route("GET")
                .controller(${$(t, !1)}Controller.${r}),
           ],
        })
    }
}
`
}
function M(t, s) {
  let n = `${$(t, !0)}Controller`,
    o = $(t, !1),
    r = `${$(t, !0)}Services`,
    c = $(t, !1)
  return `
import {Context} from "hono";
import {ApiResponse} from "@a4arpon/hotshot";
import {${r}} from "./${t}.services";

export class ${n} {
    /**
    * @type {${r}}
    */
    #${$(t, !1)}Services

    constructor() {
        this.#${$(t, !1)}Services = new ${r}()
    }

    /**
     * @param {Context} ctx
     * @returns {Promise<ApiResponse>}
    */
    ${o} = async (ctx) => {
        return this.#${$(t, !1)}Services.${c}()
    }
}
`
}
function K(t) {
  let s = `${$(t, !0)}Guard`
  return `
import { UseGuard, HTTPStatus } from "@a4arpon/hotshot";
import {Context, Next} from "hono";
import { HTTPException } from "hono/http-exception"

/**
* @implements {UseGuard}
*/
export class ${s} {
  /**
  * @param {Context} ctx
  * @param {Next} next
  */
  async use(ctx, next) {
    if (ctx.req.path === "/${t.toLowerCase()}-guard") {
      throw new HTTPException(HTTPStatus.BadRequest, {
        message: "You're hitting on a dummy route",
      });
    }

    console.log("${s} Activated On", ctx.req.path);
    await next();
  }
}`
}
function P(t) {
  let s = `${$(t, !0)}Queue`
  return `
import { Worker } from "bullmq"
import { ${$(t, !1)}Queue, redis } from "#libs/conn"

/*
*
* Queue Name: ${$(t, !1)}Queue
* Important Note: You must create a Bull Queue with the same name as
* the queue name ${$(t, !1)}Queue in your
* #libs/conn.ts file. After creating the queue, you can remove this
* comment.
*
*/

export class ${s}Worker {

  /**
   * @type {Worker}
   */
  worker

  constructor() {
    this.worker = new Worker(
      ${t}Queue.name,
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
      console.error(${t}Queue.name, "Job Failed :", job.id, err)
    } else {
      console.error(${t}Queue.name, "Job Not Found :", err)
    }
  }

  #ready = () => {
    console.log(${t}Queue.name, "Ready...")
  }

  #completed(job) {
    console.log(${t}Queue.name, "Job Completed :", job.id)
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
function F(t) {
  return `
  import { cacheNameGen, cacheResponse } from "#libs/ioredis-json"

export class ${`${$(t, !0)}CacheDriver`} {
  /**
   * @type {string}
   */
  cachePartition = "${$(t, !1)}-cache"

  /**
   * @param {string} key
   * @param {any} payload
   * @returns {Promise<any>}
   */
  async create(key, payload) {
    return cacheResponse(
      cacheNameGen(this.cachePartition, key),
      null,
      false,
    )
  }

  /**
   * @param {string} key
   * @returns {Promise<any>}
  */
  async get(key) {
    return cacheResponse(
      cacheNameGen(this.cachePartition, key),
      null,
      false,
    )
  }

  /**
  * @param {string} key
  * @param {any} payload
  * @returns {Promise<any>}
  */
  async update(key, payload) {
    return cacheResponse(
      cacheNameGen(this.cachePartition, key),
      null,
      false,
    )
  }

  /**
   * @param {string} key
   * @returns {Promise<any>}
  */
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
function w(t) {
  return `
  import { ApiSpecs, UseOpenApi } from "#libs/open-api"
  import { z } from "zod"

  /**
   * @implements {UseOpenApi}
   */
  export class ${`${$(t, !0)}OpenApiSpecs`} {

    /**
     * @type {ApiSpecs[]}
     */
    specs

    constructor() {
      this.specs = [
        {
          method: "GET",
          path: "/${t}",
          tags: ["${$(t, !0)}"],
          summery: "Get all items from server",
        },
        {
          method: "GET",
          path: "/${t}/{${$(t, !1)}Slug}",
          pathParams: ["${$(t, !1)}Slug"],
          tags: ["${$(t, !0)}"],
          summery: "Get single ${$(t, !0)} from server",
        },
        {
          method: "POST",
          path: "/${t}",
          tags: ["${$(t, !0)}"],
          summery: "Add new ${$(t, !0)}",
          requestBody: z.object({
            title: z.string(),
            tags: z.array(z.string()).nullable(),
          }),
        },
        {
          method: "PATCH",
          path: "/${t}/{${$(t, !1)}Slug}",
          pathParams: ["${$(t, !1)}Slug"],
          queryParams: ["${$(t, !1)}Status"],
          tags: ["${$(t, !0)}"],
          summery: "Add a little patch in the data",
        },
        {
          method: "PUT",
          path: "/${t}/{${$(t, !1)}Slug}",
          pathParams: ["${$(t, !1)}Slug"],
          tags: ["${$(t, !0)}"],
          summery: "Update  ${$(t, !0)}",
          requestBody: z.object({
            title: z.string(),
          }),
        },
        {
          method: "DELETE",
          path: "/${t}/{${$(t, !1)}Slug}",
          pathParams: ["${$(t, !1)}Slug"],
          tags: ["${$(t, !0)}"],
          summery: "Delete single ${$(t, !0)}",
        }
      ]
    }
  }

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
  `
}
function Q(t, s = !0) {
  let o = t
    .split("-")
    .map((r, c) =>
      c === 0
        ? r.toLowerCase()
        : r.charAt(0).toUpperCase() + r.slice(1).toLowerCase(),
    )
    .join("")
  return s ? o.charAt(0).toUpperCase() + o.slice(1) : o
}
function f(t, s) {
  let n = Q(t, !0),
    o = `${Q(t, !0)}Services`,
    r = Q(t, !1)
  return `
import type {Hono} from "hono";
import {router, routerContainer} from "@a4arpon/hotshot";
import {${o}} from "./${t}.services";

export class ${n}Router {
    public readonly routes: Hono
    private readonly ${Q(t, !1)}Services: ${o}

    constructor() {
        this.${Q(t, !1)}Services = new ${o}()

        /*
        * ----------------------------------------------------------------
        * | Routes Container > It's a group of routers for ${n}
        * ------------------------------------------------------------------
        */
        this.routes = routerContainer({
            routers: [this.default()],
        })
    }

    default() {
        return router({
            basePath: '/${t.toLowerCase()}',
            routes: [
              {
                method: "GET",
                path:"/",
                handler: this.${Q(t, !1)}Services.${r}
              }
           ],
        })
    }
}
`
}
function y(t, s) {
  let n = `${Q(t, !0)}Services`,
    o = Q(t, !1)
  return `
import { response } from "@a4arpon/hotshot"
import type { Context } from "hono"

export class ${n} {

    async ${o}(ctx: Context) {
      return response("Hi from ${t}!");
    }
}
`
}
function v(t) {
  let s = `${Q(t, !0)}Services`,
    n = Q(t, !1)
  return `
import {response} from "@a4arpon/hotshot";

export class ${s} {
    async ${n}() {
        return response("Hi from ${t}!");
    }
}
`
}
function D(t) {
  let s = `${Q(t, !0)}Guard`
  return `
import { type UseGuard, HTTPStatus } from "@a4arpon/hotshot";
import type {Context, Next} from "hono";
import { HTTPException } from "hono/http-exception"

export class ${s} implements UseGuard {
  async use(ctx: Context, next: Next) {
    if (ctx.req.path === "/${t.toLowerCase()}-guard") {
      throw new HTTPException(HTTPStatus.BadRequest, {
        message: "You're hitting on a dummy route",
      });
    }

    console.log("${s} Activated On", ctx.req.path);
    await next();
  }
}`
}
function d(t) {
  let s = `${Q(t, !0)}Queue`
  return (
    console.log(`
  ------------------------------------------------------------------------
  Queue Name: ${Q(t, !1)}Queue
  Important Note: You must create a Bull Queue with the same name as
  the queue name ${Q(t, !1)}Queue in your
  #libs/conn file.
  ------------------------------------------------------------------------
  `),
    `
import { type Job, Worker } from "bullmq"
import { ${Q(t, !1)}Queue, redis } from "#libs/conn"

export class ${s}Worker {
  public readonly worker: Worker

  constructor() {
    this.worker = new Worker(
      ${t}Queue.name,
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
      console.error(${t}Queue.name, "Job Failed :", job.id, err)
    } else {
      console.error(${t}Queue.name, "Job Not Found :", err)
    }
  }

  private ready = () => {
    console.log(${t}Queue.name, "Ready...")
  }

  private completed(job: Job) {
    console.log(${t}Queue.name, "Job Completed :", job.id)
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
  )
}
function e(t) {
  return `
  import { cacheNameGen, cacheResponse } from "#libs/ioredis-json"

export class ${`${Q(t, !0)}CacheDriver`} {
  public readonly cachePartition = "${Q(t, !1)}-cache"

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
function a(t) {
  let s = `${Q(t, !0)}OpenApiSpecs`
  return (
    console.log(`
    ------------------------------------------------------------------------
    Open API Specs
    

    Some Key Points -
    1. To use path params, you need to use the path param syntax in the path
    and the path param name in the pathParams array.
    Example: path: "/author/{authorSlug}", pathParams: ["authorSlug"]
    Second brackets {} are used to define the path param syntax.
    

    2. To define a request body, you need to define it as a ZodSchema and
    pass it to the requestBody property.
    Example: requestBody: z.object({ title: z.string() })


    Tips: In this project we are using Drizzle-ORM, so we can easily inherit
    the ZodSchema from the drizzle-orm.
    Doc Link: https://orm.drizzle.team/docs/zod

    ------------------------------------------------------------------------
    `),
    `
  import type { ApiSpecs, UseOpenApi } from "#libs/open-api"

  export class ${s} implements UseOpenApi {
    public readonly specs: ApiSpecs[]

    private readonly routeGroup = "${t}"

    constructor() {
      this.specs = [
        {
          group: this.routeGroup,
          method: "GET",
          secure: false,
          path: "/${t}",
          summary: "Get Request",
          description: "No description...",
        }
      ]
    }
  }
  `
  )
}
async function k(t) {
  console.log("**Step 1: Checking Project Type...**")
  let s = await it()
  if (
    (console.log(`Project Type: ${s}`),
    console.log("**Step 2: Checking for 'src' Directory...**"),
    !(await St()))
  )
    console.error("Error: 'src' directory not found."), process.exit(1)
  console.log("Found 'src' directory."),
    console.log("**Step 3: Checking/Creating 'mods' Directory...**")
  let o = S.join(process.cwd(), "src", "mods")
  await zt(o), console.log("'mods' directory is available.")
  let r = `${t}-mod`,
    c = S.join(o, r)
  h.mkdirSync(c, { recursive: !0 })
  let u = s === "ts" ? ".ts" : ".js"
  if ((await Tt()).contains?.mods?.find((E) => E.name === t)) {
    console.error(`Error: Module '${t}' already exists in config.`)
    return
  }
  let q = u === ".ts" ? f(t, u) : O(t, u),
    T = u === ".ts" ? y(t, u) : M(t, u)
  h.writeFileSync(S.join(c, `routes${u}`), q),
    h.writeFileSync(S.join(c, `${t}.services${u}`), T),
    await Gt(t, c),
    console.log(
      `Created: ${S.relative(process.cwd(), S.join(c, `routes${u}`))}`,
    ),
    console.log(
      `Created: ${S.relative(process.cwd(), S.join(c, `${t}.services${u}`))}`,
    )
}
async function it() {
  let t = S.join(process.cwd(), "hotshot.config.json")
  if ((console.log(t), !h.existsSync(t)))
    throw new Error("hotshot.config.json not found.")
  let s = await h.promises.readFile(t, "utf8")
  return JSON.parse(s).projectType
}
async function Tt() {
  let t = S.join(process.cwd(), "hotshot.config.json")
  if (!h.existsSync(t)) throw new Error("hotshot.config.json not found.")
  let s = await h.promises.readFile(t, "utf8")
  return JSON.parse(s)
}
async function St() {
  return h.existsSync(S.join(process.cwd(), "src"))
}
async function zt(t) {
  if (!h.existsSync(t))
    h.mkdirSync(t, { recursive: !0 }),
      console.log(`Created 'mods' directory at: ${t}`)
}
async function Gt(t, s) {
  let n = S.join(process.cwd(), "hotshot.config.json"),
    o = await h.promises.readFile(n, "utf8"),
    r = JSON.parse(o),
    c = {
      type: "router",
      name: t,
      path: `.${s.replace(process.cwd(), "")}`,
      contains: ["router", "services"],
      services: [`${t}.services`],
    }
  if (!r.contains) r.contains = { mods: [] }
  if (!r.contains.mods) r.contains.mods = []
  r.contains.mods.push(c)
  let u = JSON.stringify(r, null, 2)
  h.writeFileSync(n, u)
}
async function m(t, s) {
  console.log(`Module Name: ${t}`), console.log(`Service Name: ${s}`)
  let n = S.join(process.cwd(), "hotshot.config.json"),
    o = await h.promises.readFile(n, "utf8"),
    r = JSON.parse(o),
    c = r.contains?.mods?.find((E) => E.name === t)
  if (!c) {
    console.error(`Error: Module '${t}' not found in config.`)
    return
  }
  if (c.services.includes(`${s}.services`)) {
    console.error(`Error: Service '${s}' already exists in module '${t}'.`)
    return
  }
  let u = v(s),
    x = `${s}.services${r.projectType === "ts" ? ".ts" : ".js"}`,
    q = S.join(c.path, x)
  h.writeFileSync(q, u),
    console.log(`Created new service file: ${q}`),
    c.services.push(x.replace(`.${r.projectType}`, ""))
  let T = JSON.stringify(r, null, 2)
  h.writeFileSync(n, T), console.log("Updated config file with new service.")
}
async function g(t) {
  console.log(`UseGuard Name: ${t}`)
  let s = S.join(process.cwd(), "hotshot.config.json"),
    n = await h.promises.readFile(s, "utf8"),
    o = JSON.parse(n),
    r = o.projectType === "ts" ? D(t) : K(t),
    c = `${t}.guard${o.projectType === "ts" ? ".ts" : ".js"}`,
    u = S.join("./src", "use-guards"),
    x = S.join(u, c)
  if (!h.existsSync(u))
    h.mkdirSync(u, { recursive: !0 }), console.log(`Created directory: ${u}`)
  if (o.contains?.useGuards?.find((T) => T.name === t)) {
    console.error(`Error: UseGuard '${t}' already exists in config.`)
    return
  }
  if (
    (h.writeFileSync(x, r),
    console.log(`Created new useGuard file: ${x}`),
    !o.contains.useGuards)
  )
    o.contains.useGuards = []
  o.contains.useGuards.push({
    name: t,
    path: `./src/use-guards/${c.replace(`.${o.projectType}`, "")}`,
  })
  let q = JSON.stringify(o, null, 2)
  h.writeFileSync(s, q), console.log("Updated config file with new middleware.")
}
async function N(t) {
  console.log(`Worker Name: ${t}`)
  let s = S.join(process.cwd(), "hotshot.config.json"),
    n = await h.promises.readFile(s, "utf8"),
    o = JSON.parse(n),
    r = o.projectType === "ts" ? d(t) : P(t),
    c = `${t}.worker${o.projectType === "ts" ? ".ts" : ".js"}`,
    u = S.join("./src", "queues"),
    x = S.join(u, c)
  if (!h.existsSync(u))
    h.mkdirSync(u, { recursive: !0 }), console.log(`Created directory: ${u}`)
  if (o.contains?.queues?.find((T) => T.name === t)) {
    console.error(`Error: Worker '${t}' already exists in config.`)
    return
  }
  if (
    (h.writeFileSync(x, r),
    console.log(`Created new worker file: ${x}`),
    !o.contains.queues)
  )
    o.contains.queues = []
  o.contains.queues.push({
    core: "Redis",
    engine: "BullMQ",
    name: t,
    path: `./src/queues/${c.replace(`.${o.projectType}`, "")}`,
  })
  let q = JSON.stringify(o, null, 2)
  h.writeFileSync(s, q), console.log("Updated config file with new worker.")
}
async function tt(t) {
  console.log(`Cache Driver Name: ${t}`)
  let s = S.join(process.cwd(), "hotshot.config.json"),
    n = await h.promises.readFile(s, "utf8"),
    o = JSON.parse(n),
    r = o.projectType === "ts" ? e(t) : F(t),
    c = `${t}.cache${o.projectType === "ts" ? ".ts" : ".js"}`,
    u = S.join("./src", "cache-drivers"),
    x = S.join(u, c)
  if (!h.existsSync(u))
    h.mkdirSync(u, { recursive: !0 }), console.log(`Created directory: ${u}`)
  if (o.contains?.cacheDrivers?.find((T) => T.name === t)) {
    console.error(`Error: Cache Driver '${t}' already exists in config.`)
    return
  }
  if (
    (h.writeFileSync(x, r),
    console.log(`Created new cache driver file: ${x}`),
    !o.contains.cacheDrivers)
  )
    o.contains.cacheDrivers = []
  o.contains.cacheDrivers.push({
    core: "Redis",
    name: t,
    path: `./src/cache-drivers/${c.replace(`.${o.projectType}`, "")}`,
  })
  let q = JSON.stringify(o, null, 2)
  h.writeFileSync(s, q),
    console.log("Updated config file with new cache driver.")
}
async function st(t) {
  console.log(`OpenApi Spec Name: ${t}`)
  let s = S.join(process.cwd(), "hotshot.config.json"),
    n = await h.promises.readFile(s, "utf8"),
    o = JSON.parse(n),
    r = o.projectType === "ts" ? a(t) : w(t),
    c = `${t}.openapi${o.projectType === "ts" ? ".ts" : ".js"}`,
    u = S.join("./src", "open-api"),
    x = S.join(u, c)
  if (!h.existsSync(u))
    h.mkdirSync(u, { recursive: !0 }), console.log(`Created directory: ${u}`)
  if (o.contains?.openApiSpecs?.find((T) => T.name === t)) {
    console.error(`Error: OpenApi Spec '${t}' already exists in config.`)
    return
  }
  if (
    (h.writeFileSync(x, r),
    console.log(`Created new OpenApi Spec file: ${x}`),
    !o.contains.openApiSpecs)
  )
    o.contains.openApiSpecs = []
  o.contains.openApiSpecs.push({
    name: t,
    path: `./src/open-api/${c.replace(`.${o.projectType}`, "")}`,
  })
  let q = JSON.stringify(o, null, 2)
  h.writeFileSync(s, q),
    console.log("Updated config file with new OpenApi Spec.")
}
var B = nt.default(process.argv.slice(2)),
  ot = B._[0]
switch (ot) {
  case "reload":
    console.log("Reloading with project type")
    break
  case "g": {
    let t = B._[1],
      s = B._.slice(2)
    switch (t) {
      case "mod": {
        if (s.length === 0)
          console.error(
            "Error: Please specify a module name for 'g mod' command.",
          ),
            process.exit(1)
        let n = s[0]
        console.log(`Module name for generation: ${n}`), await k(n)
        break
      }
      case "service": {
        if (s.length === 0)
          console.error(
            "Error: Please specify a service name for 'g service' command.",
          ),
            process.exit(1)
        let n = s[0]
        if (!B.mod)
          console.error(
            "Error: Please specify a module name using '--mod' for 'g service' command.",
          ),
            process.exit(1)
        await m(B.mod, n)
        break
      }
      case "guard": {
        if (s.length === 0)
          console.error(
            "Error: Please specify a guard name for 'g guard' command.",
          ),
            process.exit(1)
        let n = s[0]
        await g(n)
        break
      }
      case "queue": {
        if (s.length === 0)
          console.error(
            "Error: Please specify a queue name for 'g queue' command.",
          ),
            process.exit(1)
        let n = s[0]
        await N(n)
        break
      }
      case "cache": {
        if (s.length === 0)
          console.error(
            "Error: Please specify a cache driver name for 'g cache' command.",
          ),
            process.exit(1)
        let n = s[0]
        await tt(n)
        break
      }
      case "openapi": {
        if (s.length === 0)
          console.error(
            "Error: Please specify an OpenApi Spec name for 'g openapi' command.",
          ),
            process.exit(1)
        let n = s[0]
        await st(n)
        break
      }
      default:
        console.log(`Unknown generate command: ${t}. Usage:
          hotshot g mod <module_name> | hotshot g service <service_name> --mod=<module_name> | hotshot g guard <guard_name> | hotshot g queue <queue_name> | hotshot g cache <cache_driver_name> | hotshot g openapi <openapi_spec_name>`)
        break
    }
    break
  }
  default:
    console.log(`Unknown command: ${ot}. Usage:
            hotshot reload --js or --ts
            hotshot g mod <module_name> | hotshot g service <service_name> --mod=<module_name>`)
    break
}
