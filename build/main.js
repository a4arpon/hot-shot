#!/usr/bin/env node
var m=Object.create;var{getPrototypeOf:a,defineProperty:P,getOwnPropertyNames:e}=Object;var $$=Object.prototype.hasOwnProperty;var u$=($,u,b)=>{b=$!=null?m(a($)):{};let T=u||!$||!$.__esModule?P(b,"default",{value:$,enumerable:!0}):b;for(let q of e($))if(!$$.call(T,q))P(T,q,{get:()=>$[q],enumerable:!0});return T};var b$=($,u)=>()=>(u||$((u={exports:{}}).exports,u),u.exports);var D=b$((S$,n)=>{function T$($,u){var b=$;u.slice(0,-1).forEach(function(q){b=b[q]||{}});var T=u[u.length-1];return T in b}function w($){if(typeof $==="number")return!0;if(/^0x[0-9a-f]+$/i.test($))return!0;return/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test($)}function c($,u){return u==="constructor"&&typeof $[u]==="function"||u==="__proto__"}n.exports=function($,u){if(!u)u={};var b={bools:{},strings:{},unknownFn:null};if(typeof u.unknown==="function")b.unknownFn=u.unknown;if(typeof u.boolean==="boolean"&&u.boolean)b.allBools=!0;else[].concat(u.boolean).filter(Boolean).forEach(function(J){b.bools[J]=!0});var T={};function q(J){return T[J].some(function(E){return b.bools[E]})}Object.keys(u.alias||{}).forEach(function(J){T[J]=[].concat(u.alias[J]),T[J].forEach(function(E){T[E]=[J].concat(T[J].filter(function(O){return E!==O}))})}),[].concat(u.string).filter(Boolean).forEach(function(J){if(b.strings[J]=!0,T[J])[].concat(T[J]).forEach(function(E){b.strings[E]=!0})});var G=u.default||{},z={_:[]};function R(J,E){return b.allBools&&/^--[^=]+$/.test(E)||b.strings[J]||b.bools[J]||T[J]}function Y(J,E,O){var U=J;for(var K=0;K<E.length-1;K++){var I=E[K];if(c(U,I))return;if(U[I]===void 0)U[I]={};if(U[I]===Object.prototype||U[I]===Number.prototype||U[I]===String.prototype)U[I]={};if(U[I]===Array.prototype)U[I]=[];U=U[I]}var C=E[E.length-1];if(c(U,C))return;if(U===Object.prototype||U===Number.prototype||U===String.prototype)U={};if(U===Array.prototype)U=[];if(U[C]===void 0||b.bools[C]||typeof U[C]==="boolean")U[C]=O;else if(Array.isArray(U[C]))U[C].push(O);else U[C]=[U[C],O]}function B(J,E,O){if(O&&b.unknownFn&&!R(J,O)){if(b.unknownFn(O)===!1)return}var U=!b.strings[J]&&w(E)?Number(E):E;Y(z,J.split("."),U),(T[J]||[]).forEach(function(K){Y(z,K.split("."),U)})}Object.keys(b.bools).forEach(function(J){B(J,G[J]===void 0?!1:G[J])});var M=[];if($.indexOf("--")!==-1)M=$.slice($.indexOf("--")+1),$=$.slice(0,$.indexOf("--"));for(var Z=0;Z<$.length;Z++){var H=$[Z],W,V;if(/^--.+=/.test(H)){var F=H.match(/^--([^=]+)=([\s\S]*)$/);W=F[1];var x=F[2];if(b.bools[W])x=x!=="false";B(W,x,H)}else if(/^--no-.+/.test(H))W=H.match(/^--no-(.+)/)[1],B(W,!1,H);else if(/^--.+/.test(H))if(W=H.match(/^--(.+)/)[1],V=$[Z+1],V!==void 0&&!/^(-|--)[^-]/.test(V)&&!b.bools[W]&&!b.allBools&&(T[W]?!q(W):!0))B(W,V,H),Z+=1;else if(/^(true|false)$/.test(V))B(W,V==="true",H),Z+=1;else B(W,b.strings[W]?"":!0,H);else if(/^-[^-]+/.test(H)){var X=H.slice(1,-1).split(""),j=!1;for(var _=0;_<X.length;_++){if(V=H.slice(_+2),V==="-"){B(X[_],V,H);continue}if(/[A-Za-z]/.test(X[_])&&V[0]==="="){B(X[_],V.slice(1),H),j=!0;break}if(/[A-Za-z]/.test(X[_])&&/-?\d+(\.\d*)?(e-?\d+)?$/.test(V)){B(X[_],V,H),j=!0;break}if(X[_+1]&&X[_+1].match(/\W/)){B(X[_],H.slice(_+2),H),j=!0;break}else B(X[_],b.strings[X[_]]?"":!0,H)}if(W=H.slice(-1)[0],!j&&W!=="-")if($[Z+1]&&!/^(-|--)[^-]/.test($[Z+1])&&!b.bools[W]&&(T[W]?!q(W):!0))B(W,$[Z+1],H),Z+=1;else if($[Z+1]&&/^(true|false)$/.test($[Z+1]))B(W,$[Z+1]==="true",H),Z+=1;else B(W,b.strings[W]?"":!0,H)}else{if(!b.unknownFn||b.unknownFn(H)!==!1)z._.push(b.strings._||!w(H)?H:Number(H));if(u.stopEarly){z._.push.apply(z._,$.slice(Z+1));break}}}if(Object.keys(G).forEach(function(J){if(!T$(z,J.split(".")))Y(z,J.split("."),G[J]),(T[J]||[]).forEach(function(E){Y(z,E.split("."),G[J])})}),u["--"])z["--"]=M.slice();else M.forEach(function(J){z._.push(J)});return z}});var g=u$(D(),1);import S from"node:fs";import L from"node:path";function Q($,u=!0){let T=$.split("-").map((q,G)=>G===0?q.toLowerCase():q.charAt(0).toUpperCase()+q.slice(1).toLowerCase()).join("");return u?T.charAt(0).toUpperCase()+T.slice(1):T}function s($,u){let b=Q($,!0),T=`${Q($,!0)}Controller`,q=Q($,!1);return`
import type {Hono} from "hono";
import {router, routerContainer, route} from "@a4arpon/hotshot";
import {${T}} from "#mods/${$}/controller.ts";

export class ${b}Router {
    public readonly routes: Hono

    constructor() {
        this.routes = routerContainer({
            routers: [this.defaultRoutes()],
            basePath: '/${$.toLowerCase()}',
        })
    }

    defaultRoutes() {

        const ${Q($,!1)}Controller = new ${T}()

        return router({
            basePath: '/',
            routes: [
               route("GET")
                .controller(${Q($,!1)}Controller.${q}),
           ],
        })
    }
}
`}function p($,u){let b=`${Q($,!0)}Controller`,T=Q($,!1),q=`${Q($,!0)}Services`,G=Q($,!1);return`
import type {Context} from "hono";
import {${q}} from "#mods/${$}/${$}.services.ts";

export class ${b} {
    private readonly ${Q($,!1)}Services: ${q}

    constructor() {
        this.${Q($,!1)}Services = new ${q}()
    }

    ${T} = async (ctx: Context) => {
        return this.${Q($,!1)}Services.${G}()
    }
}
`}function h($){let u=`${Q($,!0)}Services`,b=Q($,!1);return`
import {response} from "@a4arpon/hotshot";

export class ${u} {
    async ${b}() {
        return response("Hi from ${$}!");
    }
}
`}function v($){let u=`${Q($,!0)}Guard`;return`
import { type UseGuard, HTTPStatus } from "@a4arpon/hotshot";
import type {Context, Next} from "hono";

export class ${u} implements UseGuard {
  async use(ctx: Context, next: Next) {
    if (ctx.req.path === "/${$.toLowerCase()}-guard") {
      throw new HTTPException(HTTPStatus.BadRequest, {
        message: "You're hitting on a dummy route",
      });
    }

    console.log("${u} Activated On", ctx.req.path);
    await next();
  }
}`}function t($){let u=`${Q($,!0)}Queue`;return`
import { type Job, Worker } from "bullmq"
import { ${Q($,!1)}Queue, redis } from "#libs/conn.ts"

/*
*
* Queue Name: ${Q($,!1)}Queue
* Important Note: You must create a Bull Queue with the same name as
* the queue name ${Q($,!1)}Queue in your
* #libs/conn.ts file. After creating the queue, you can remove this
* comment.
*
*/

export class ${u}Worker {
  public readonly worker: Worker

  constructor() {
    this.worker = new Worker(
      ${$}Queue.name,
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
      console.error(${$}Queue.name, "Job Failed :", job.id, err)
    } else {
      console.error(${$}Queue.name, "Job Not Found :", err)
    }
  }

  private ready = () => {
    console.log(${$}Queue.name, "Ready...")
  }

  private completed(job: Job) {
    console.log(${$}Queue.name, "Job Completed :", job.id)
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
`}function o($){return`
  import { cacheNameGen, cacheResponse } from "#libs/ioredis-json.ts"

export class ${`${Q($,!0)}CacheDriver`} {
  public readonly cachePartition = "${Q($,!1)}-cache"

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
`}function l($){return`
  import type { ApiSpecs, UseOpenApi } from "#libs/open-api.ts"
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

  export class ${`${Q($,!0)}OpenApiSpecs`} implements UseOpenApi {
    public readonly specs: ApiSpecs[]

    constructor() {
      this.specs = [
        {
          method: "GET",
          path: "/${$}",
          tags: ["${Q($,!0)}"],
          summery: "Get all items from server",
        },
        {
          method: "GET",
          path: "/${$}/{${Q($,!1)}Slug}",
          pathParams: ["${Q($,!1)}Slug"],
          tags: ["${Q($,!0)}"],
          summery: "Get single ${Q($,!0)} from server",
        },
        {
          method: "POST",
          path: "/${$}",
          tags: ["${Q($,!0)}"],
          summery: "Add new ${Q($,!0)}",
          requestBody: z.object({
            title: z.string(),
            tags: z.array(z.string()).nullable(),
          }),
        },
        {
          method: "PATCH",
          path: "/${$}/{${Q($,!1)}Slug}",
          pathParams: ["${Q($,!1)}Slug"],
          queryParams: ["${Q($,!1)}Status"],
          tags: ["${Q($,!0)}"],
          summery: "Add a little patch in the data",
        },
        {
          method: "PUT",
          path: "/${$}/{${Q($,!1)}Slug}",
          pathParams: ["${Q($,!1)}Slug"],
          tags: ["${Q($,!0)}"],
          summery: "Update  ${Q($,!0)}",
          requestBody: z.object({
            title: z.string(),
          }),
        },
        {
          method: "DELETE",
          path: "/${$}/{${Q($,!1)}Slug}",
          pathParams: ["${Q($,!1)}Slug"],
          tags: ["${Q($,!0)}"],
          summery: "Delete single ${Q($,!0)}",
        }
      ]
    }
  }
  `}async function f($){console.log("**Step 1: Checking Project Type...**");let u=await z$();if(console.log(`Project Type: ${u}`),console.log("**Step 2: Checking for 'src' Directory...**"),!await Q$())console.error("Error: 'src' directory not found."),process.exit(1);console.log("Found 'src' directory."),console.log("**Step 3: Checking/Creating 'mods' Directory...**");let T=L.join(process.cwd(),"src","mods");await q$(T),console.log("'mods' directory is available.");let q=`${$}-mod`,G=L.join(T,q);S.mkdirSync(G,{recursive:!0});let z=u==="ts"?".ts":".js",R=s($,z),Y=p($,z),B=h($);S.writeFileSync(L.join(G,`routes${z}`),R),S.writeFileSync(L.join(G,`controller${z}`),Y),S.writeFileSync(L.join(G,`${$}.services${z}`),B),await G$($,G),console.log(`Created: ${L.relative(process.cwd(),L.join(G,`routes${z}`))}`),console.log(`Created: ${L.relative(process.cwd(),L.join(G,`controller${z}`))}`),console.log(`Created: ${L.relative(process.cwd(),L.join(G,`${$}.services${z}`))}`)}async function z$(){let $=L.join(process.cwd(),"hotshot.config.json");if(console.log($),!S.existsSync($))throw new Error("hotshot.config.json not found.");let u=await S.promises.readFile($,"utf8");return JSON.parse(u).projectType}async function Q$(){return S.existsSync(L.join(process.cwd(),"src"))}async function q$($){if(!S.existsSync($))S.mkdirSync($,{recursive:!0}),console.log(`Created 'mods' directory at: ${$}`)}async function G$($,u){let b=L.join(process.cwd(),"hotshot.config.json"),T=await S.promises.readFile(b,"utf8"),q=JSON.parse(T),G={type:"router",name:$,path:`.${u.replace(process.cwd(),"")}`,contains:["router","controller","services"],services:[`${$}.services`]};if(!q.contains)q.contains={mods:[]};if(!q.contains.mods)q.contains.mods=[];q.contains.mods.push(G);let z=JSON.stringify(q,null,2);S.writeFileSync(b,z)}async function y($,u){console.log(`Module Name: ${$}`),console.log(`Service Name: ${u}`);let b=L.join(process.cwd(),"hotshot.config.json"),T=await S.promises.readFile(b,"utf8"),q=JSON.parse(T),G=q.contains?.mods?.find((M)=>M.name===$);if(!G){console.error(`Error: Module '${$}' not found in config.`);return}if(G.services.includes(`${u}.services`)){console.error(`Error: Service '${u}' already exists in module '${$}'.`);return}let z=h(u),R=`${u}.services${q.projectType==="ts"?".ts":".js"}`,Y=L.join(G.path,R);S.writeFileSync(Y,z),console.log(`Created new service file: ${Y}`),G.services.push(R.replace(`.${q.projectType}`,""));let B=JSON.stringify(q,null,2);S.writeFileSync(b,B),console.log("Updated config file with new service.")}async function d($){console.log(`UseGuard Name: ${$}`);let u=L.join(process.cwd(),"hotshot.config.json"),b=await S.promises.readFile(u,"utf8"),T=JSON.parse(b),q=v($),G=`${$}.guard${T.projectType==="ts"?".ts":".js"}`,z=L.join("./src","use-guards"),R=L.join(z,G);if(!S.existsSync(z))S.mkdirSync(z,{recursive:!0}),console.log(`Created directory: ${z}`);if(T.contains?.useGuards?.find((B)=>B.name===$)){console.error(`Error: UseGuard '${$}' already exists in config.`);return}if(S.writeFileSync(R,q),console.log(`Created new useGuard file: ${R}`),!T.contains.useGuards)T.contains.useGuards=[];T.contains.useGuards.push({name:$,path:`./src/use-guards/${G.replace(`.${T.projectType}`,"")}`});let Y=JSON.stringify(T,null,2);S.writeFileSync(u,Y),console.log("Updated config file with new middleware.")}async function r($){console.log(`Worker Name: ${$}`);let u=L.join(process.cwd(),"hotshot.config.json"),b=await S.promises.readFile(u,"utf8"),T=JSON.parse(b),q=t($),G=`${$}.worker${T.projectType==="ts"?".ts":".js"}`,z=L.join("./src","queues"),R=L.join(z,G);if(!S.existsSync(z))S.mkdirSync(z,{recursive:!0}),console.log(`Created directory: ${z}`);if(T.contains?.queues?.find((B)=>B.name===$)){console.error(`Error: Worker '${$}' already exists in config.`);return}if(S.writeFileSync(R,q),console.log(`Created new worker file: ${R}`),!T.contains.queues)T.contains.queues=[];T.contains.queues.push({core:"Redis",engine:"BullMQ",name:$,path:`./src/queues/${G.replace(`.${T.projectType}`,"")}`});let Y=JSON.stringify(T,null,2);S.writeFileSync(u,Y),console.log("Updated config file with new worker.")}async function i($){console.log(`Cache Driver Name: ${$}`);let u=L.join(process.cwd(),"hotshot.config.json"),b=await S.promises.readFile(u,"utf8"),T=JSON.parse(b),q=o($),G=`${$}.cache${T.projectType==="ts"?".ts":".js"}`,z=L.join("./src","cache-drivers"),R=L.join(z,G);if(!S.existsSync(z))S.mkdirSync(z,{recursive:!0}),console.log(`Created directory: ${z}`);if(T.contains?.cacheDrivers?.find((B)=>B.name===$)){console.error(`Error: Cache Driver '${$}' already exists in config.`);return}if(S.writeFileSync(R,q),console.log(`Created new cache driver file: ${R}`),!T.contains.cacheDrivers)T.contains.cacheDrivers=[];T.contains.cacheDrivers.push({core:"Redis",name:$,path:`./src/cache-drivers/${G.replace(`.${T.projectType}`,"")}`});let Y=JSON.stringify(T,null,2);S.writeFileSync(u,Y),console.log("Updated config file with new cache driver.")}async function N($){console.log(`OpenApi Spec Name: ${$}`);let u=L.join(process.cwd(),"hotshot.config.json"),b=await S.promises.readFile(u,"utf8"),T=JSON.parse(b),q=l($),G=`${$}.openapi${T.projectType==="ts"?".ts":".js"}`,z=L.join("./src","open-api"),R=L.join(z,G);if(!S.existsSync(z))S.mkdirSync(z,{recursive:!0}),console.log(`Created directory: ${z}`);if(T.contains?.openApiSpecs?.find((B)=>B.name===$)){console.error(`Error: OpenApi Spec '${$}' already exists in config.`);return}if(S.writeFileSync(R,q),console.log(`Created new OpenApi Spec file: ${R}`),!T.contains.openApiSpecs)T.contains.openApiSpecs=[];T.contains.openApiSpecs.push({name:$,path:`./src/open-api/${G.replace(`.${T.projectType}`,"")}`});let Y=JSON.stringify(T,null,2);S.writeFileSync(u,Y),console.log("Updated config file with new OpenApi Spec.")}var A=g.default(process.argv.slice(2)),k=A._[0];switch(k){case"reload":console.log("Reloading with project type");break;case"g":{let $=A._[1],u=A._.slice(2);switch($){case"mod":{if(u.length===0)console.error("Error: Please specify a module name for 'g mod' command."),process.exit(1);let b=u[0];console.log(`Module name for generation: ${b}`),await f(b);break}case"service":{if(u.length===0)console.error("Error: Please specify a service name for 'g service' command."),process.exit(1);let b=u[0];if(!A.mod)console.error("Error: Please specify a module name using '--mod' for 'g service' command."),process.exit(1);await y(A.mod,b);break}case"guard":{if(u.length===0)console.error("Error: Please specify a guard name for 'g guard' command."),process.exit(1);let b=u[0];await d(b);break}case"queue":{if(u.length===0)console.error("Error: Please specify a queue name for 'g queue' command."),process.exit(1);let b=u[0];await r(b);break}case"cache":{if(u.length===0)console.error("Error: Please specify a cache driver name for 'g cache' command."),process.exit(1);let b=u[0];await i(b);break}case"openapi":{if(u.length===0)console.error("Error: Please specify an OpenApi Spec name for 'g openapi' command."),process.exit(1);let b=u[0];await N(b);break}default:console.log(`Unknown generate command: ${$}. Usage:
          hotshot g mod <module_name> | hotshot g service <service_name> --mod=<module_name> | hotshot g guard <guard_name> | hotshot g queue <queue_name> | hotshot g cache <cache_driver_name> | hotshot g openapi <openapi_spec_name>`);break}break}default:console.log(`Unknown command: ${k}. Usage:
            hotshot reload --js or --ts
            hotshot g mod <module_name> | hotshot g service <service_name> --mod=<module_name>`);break}
